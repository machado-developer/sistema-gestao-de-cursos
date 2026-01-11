import { prisma } from '@/lib/prisma'
import { InstrutoresTableClient } from './InstrutoresTableClient'
import { serializePrisma } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Pagination logic
async function getTranslations(lang: string) {
    const translations = await import(`@/lib/i18n/${lang}.json`)
    return translations.default
}

import { Suspense } from 'react'

export default async function InstrutoresPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; lang?: string; page?: string }>
}) {
    const rawSearchParams = await searchParams
    const query = rawSearchParams.q
    const lang = rawSearchParams.lang || 'pt'

    const page = Number(rawSearchParams.page) || 1
    const limit = 10

    const [instrutoresData, t] = await Promise.all([
        getInstrutores(query, page, limit),
        getTranslations(lang)
    ])

    const title = t.pages.instructors.title
    const subtitle = `${t.common.total}: ${instrutoresData.meta.total} ${t.pages.instructors.subtitle}`

    return (
        <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando instrutores...</div>}>
            <InstrutoresTableClient
                instrutores={serializePrisma(instrutoresData.data)}
                title={title}
                subtitle={subtitle}
                pagination={{
                    currentPage: instrutoresData.meta.page,
                    totalPages: instrutoresData.meta.lastPage,
                    totalItems: instrutoresData.meta.total
                }}
            />
        </Suspense>
    )
}

async function getInstrutores(query?: string, page: number = 1, limit: number = 10) {
    const whereClause: any = {}

    if (query) {
        whereClause.OR = [
            { nome: { contains: query } },
            { email: { contains: query } }
        ]
    }

    const [count, data] = await Promise.all([
        prisma.instrutor.count({ where: whereClause }),
        prisma.instrutor.findMany({
            where: whereClause,
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { createdAt: 'desc' },
            include: { turmas: true }
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
