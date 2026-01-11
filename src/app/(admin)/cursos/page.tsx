import { prisma } from '@/lib/prisma'
import { CursosTableClient } from './CursosTableClient'
import { serializePrisma } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Pagination logic
async function getTranslations(lang: string) {
    const translations = await import(`@/lib/i18n/${lang}.json`)
    return translations.default
}

import { Suspense } from 'react'

export default async function CursosPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; carga_horaria?: string; lang?: string; page?: string }>
}) {
    const rawSearchParams = await searchParams
    const query = rawSearchParams.q
    const cargaHoraria = rawSearchParams.carga_horaria
    const lang = rawSearchParams.lang || 'pt'

    const page = Number(rawSearchParams.page) || 1
    const limit = 10

    const [cursosData, t] = await Promise.all([
        getCursos(query, cargaHoraria, page, limit),
        getTranslations(lang)
    ])

    const title = t.pages.courses.title
    const subtitle = t.pages.courses.subtitle

    return (
        <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando cursos...</div>}>
            <CursosTableClient
                cursos={serializePrisma(cursosData.data)}
                title={title}
                subtitle={subtitle}
                pagination={{
                    currentPage: cursosData.meta.page,
                    totalPages: cursosData.meta.lastPage,
                    totalItems: cursosData.meta.total
                }}
            />
        </Suspense>
    )
}

async function getCursos(query?: string, cargaHoraria?: string, page: number = 1, limit: number = 10) {
    const whereClause: any = {}

    if (query) {
        whereClause.OR = [
            { nome: { contains: query } },
            { descricao: { contains: query } }
        ]
    }

    if (cargaHoraria) {
        if (cargaHoraria === '0-50') {
            whereClause.carga_horaria = { gte: 0, lte: 50 }
        } else if (cargaHoraria === '50-100') {
            whereClause.carga_horaria = { gte: 50, lte: 100 }
        } else if (cargaHoraria === '100+') {
            whereClause.carga_horaria = { gte: 100 }
        }
    }

    const [count, data] = await Promise.all([
        prisma.curso.count({ where: whereClause }),
        prisma.curso.findMany({
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
