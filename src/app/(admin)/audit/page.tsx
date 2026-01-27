import { prisma } from '@/lib/prisma'
import { AuditTableClient } from './AuditTableClient'
import { serializePrisma } from '@/lib/utils'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function AuditPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; page?: string }>
}) {
    const rawSearchParams = await searchParams
    const query = rawSearchParams.q
    const page = Number(rawSearchParams.page) || 1
    const limit = 15

    const auditData = await getAuditLogs(query, page, limit)

    return (
        <div className="pb-20 animate-in fade-in duration-700">
            <Suspense fallback={<div className="p-8 text-center text-zinc-500 font-bold uppercase tracking-widest text-xs">Carregando auditoria...</div>}>
                <AuditTableClient
                    logs={serializePrisma(auditData.data)}
                    pagination={{
                        currentPage: auditData.meta.page,
                        totalPages: auditData.meta.lastPage,
                        totalItems: auditData.meta.total
                    }}
                />
            </Suspense>
        </div>
    )
}

async function getAuditLogs(query?: string, page: number = 1, limit: number = 15) {
    const whereClause: any = {}

    if (query) {
        whereClause.OR = [
            { acao: { contains: query } },
            { usuario: { contains: query } },
            { entidade: { contains: query } }
        ]
    }

    const [count, data] = await Promise.all([
        (prisma as any).auditLog.count({ where: whereClause }),
        (prisma as any).auditLog.findMany({
            where: whereClause,
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { createdAt: 'desc' }
        })
    ])

    return {
        data,
        meta: {
            total: count,
            page: page,
            lastPage: Math.ceil(count / limit)
        }
    }
}
