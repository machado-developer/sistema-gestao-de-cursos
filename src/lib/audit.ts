import { PrismaClient } from '@/generated/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prismaRaw = new PrismaClient()

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

        await prismaRaw.auditLog.create({
            data: {
                userId: session?.user?.id || null,
                usuario: session?.user?.email || session?.user?.name || 'Sistema',
                acao,
                entidade,
                detalhes: detalhes ? (typeof detalhes === 'string' ? detalhes : JSON.stringify(detalhes)) : null
            }
        })
    } catch (error) {
        console.error('Manual Audit Log Error:', error)
    }
}
