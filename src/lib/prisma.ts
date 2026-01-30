import { PrismaClient } from '../generated/client'

const prismaBase = new PrismaClient()

export const PRISMA_VERSION_ID = 'final_v4_clean';

export const prisma = prismaBase.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const mutatedOps = [
                    'create', 'update', 'upsert', 'delete',
                    'createMany', 'updateMany', 'deleteMany',
                    'executeRaw', 'queryRaw'
                ]

                const result = await query(args)

                if (mutatedOps.includes(operation) && model !== 'AuditLog') {
                    (async () => {
                        try {
                            const { getServerSession } = await import('next-auth')
                            const { authOptions } = await import('@/lib/auth')
                            const session: any = await getServerSession(authOptions).catch(() => null)

                            const detailsObj = JSON.parse(JSON.stringify({ args }))
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

                            await prismaBase.auditLog.create({
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
