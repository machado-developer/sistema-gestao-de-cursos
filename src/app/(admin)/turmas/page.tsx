import { prisma } from '@/lib/prisma'
import { TurmasTableClient } from './TurmasTableClient'
import { serializePrisma } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Pagination logic
async function getTranslations(lang: string) {
    const translations = await import(`@/lib/i18n/${lang}.json`)
    return translations.default
}

import { Suspense } from 'react'

export default async function TurmasPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; status?: string; data_inicio?: string; lang?: string; page?: string }>
}) {
    const rawSearchParams = await searchParams
    const query = rawSearchParams.q
    const status = rawSearchParams.status
    const dataInicio = rawSearchParams.data_inicio
    const lang = rawSearchParams.lang || 'pt'

    const page = Number(rawSearchParams.page) || 1
    const limit = 10

    const [turmasData, t] = await Promise.all([
        getTurmas(query, status, dataInicio, page, limit),
        getTranslations(lang)
    ])

    const title = t.pages.classes.title
    const subtitle = `${t.common.total}: ${turmasData.meta.total} ${t.pages.classes.subtitle}`

    return (
        <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando turmas...</div>}>
            <TurmasTableClient
                turmas={serializePrisma(turmasData.data)}
                title={title}
                subtitle={subtitle}
                pagination={{
                    currentPage: turmasData.meta.page,
                    totalPages: turmasData.meta.lastPage,
                    totalItems: turmasData.meta.total
                }}
            />
        </Suspense>
    )
}

async function getTurmas(query?: string, status?: string, dataInicio?: string, page: number = 1, limit: number = 10) {
    const whereClause: any = {}

    if (query) {
        whereClause.OR = [
            { codigo_turma: { contains: query } },
            { curso: { nome: { contains: query } } }
        ]
    }

    if (status) {
        whereClause.status = status
    }

    if (dataInicio) {
        whereClause.data_inicio = {
            gte: new Date(dataInicio)
        }
    }

    const [count, data] = await Promise.all([
        prisma.turma.count({ where: whereClause }),
        prisma.turma.findMany({
            where: whereClause,
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { createdAt: 'desc' },
            include: { curso: true, instrutor: true, matriculas: true }
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
