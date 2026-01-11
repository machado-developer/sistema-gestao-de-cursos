import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function createAuditLog({
    acao,
    entidade,
    detalhes
}: {
    acao: string
    entidade: string
    detalhes?: any
}) {
    try {
        const session: any = await getServerSession(authOptions)

        await (prisma as any).auditLog.create({
            data: {
                userId: session?.user?.id || null,
                usuario: session?.user?.email || session?.user?.name || 'Sistema',
                acao,
                entidade,
                detalhes: detalhes ? JSON.stringify(detalhes) : null
            }
        })
    } catch (error) {
        console.error('Audit Log Error:', error)
    }
}
