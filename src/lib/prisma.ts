import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient,
    extendedPrisma?: any
}

const prismaClient = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient

export const prisma = globalForPrisma.extendedPrisma || prismaClient.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                // Mutating operations to track
                const mutatedOps = [
                    'create', 'update', 'upsert', 'delete',
                    'createMany', 'updateMany', 'deleteMany',
                    'executeRaw', 'queryRaw'
                ]

                const result = await query(args)

                if (mutatedOps.includes(operation) && model !== 'AuditLog') {
                    // Log asynchronously to not block the response
                    (async () => {
                        try {
                            const { getServerSession } = await import('next-auth')
                            const { authOptions } = await import('@/lib/auth')
                            const session: any = await getServerSession(authOptions).catch(() => null)

                            const detailsObj = JSON.parse(JSON.stringify({ args }))
                            // Redigir campos sensíveis
                            const sensitiveFields = ['password', 'senha', 'token', 'secret']
                            const sanitize = (obj: any) => {
                                if (!obj || typeof obj !== 'object') return
                                for (const key in obj) {
                                    if (sensitiveFields.includes(key.toLowerCase())) {
                                        obj[key] = '[REDACTED]'
                                    } else if (typeof obj[key] === 'object') {
                                        sanitize(obj[key])
                                    }
                                }
                            }
                            sanitize(detailsObj)

                            const detailsStr = JSON.stringify(detailsObj)
                            const truncatedDetails = detailsStr.length > 50000
                                ? detailsStr.substring(0, 50000) + "... [truncated due to size]"
                                : detailsStr

                            await prismaClient.auditLog.create({
                                data: {
                                    userId: session?.user?.id || null,
                                    usuario: session?.user?.email || session?.user?.name || 'Sistema',
                                    acao: `${operation.toUpperCase()}_${model?.toUpperCase() || 'RAW'}`,
                                    entidade: model || 'DATABASE',
                                    detalhes: truncatedDetails
                                }
                            })
                        } catch (error) {
                            console.error('Audit Log Error in Extension:', error)
                        }
                    })()
                }

                return result
            }
        }
    }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.extendedPrisma = prisma
