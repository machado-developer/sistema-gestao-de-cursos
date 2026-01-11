import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { AlunosTableClient } from './AlunosTableClient'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

async function getAlunos(
    query?: string,
    status?: string,
    estadoPagamento?: string,
    cursoId?: string,
    turmaId?: string,
    dataInscricaoInicio?: string,
    dataInscricaoFim?: string,
    page: number = 1,
    limit: number = 10
) {
    const whereClause: any = {}

    // Text search
    if (query) {
        whereClause.OR = [
            { nome_completo: { contains: query } },
            { email: { contains: query } },
            { bi_documento: { contains: query } },
        ]
    }

    // Build matriculas filter
    const matriculasFilter: any = {}

    if (estadoPagamento) {
        matriculasFilter.estado_pagamento = estadoPagamento
    }

    if (cursoId) {
        matriculasFilter.turma = {
            cursoId: cursoId
        }
    }

    if (turmaId) {
        matriculasFilter.turmaId = turmaId
    }

    if (dataInscricaoInicio || dataInscricaoFim) {
        matriculasFilter.createdAt = {}
        if (dataInscricaoInicio) {
            matriculasFilter.createdAt.gte = new Date(dataInscricaoInicio)
        }
        if (dataInscricaoFim) {
            const endDate = new Date(dataInscricaoFim)
            endDate.setHours(23, 59, 59, 999)
            matriculasFilter.createdAt.lte = endDate
        }
    }

    // If status filter is applied, we might need a different approach 
    // because count needs to reflect the final result
    const baseWhere = { ...whereClause }
    if (Object.keys(matriculasFilter).length > 0) {
        baseWhere.matriculas = {
            some: matriculasFilter
        }
    }

    // Since status filter (ativo/sem_matricula) depends on the presence of ANY matricula,
    // we should handle it in the whereClause directly for better performance/pagination
    if (status === 'ativo') {
        baseWhere.matriculas = {
            some: {}
        }
    } else if (status === 'sem_matricula') {
        baseWhere.matriculas = {
            none: {}
        }
    }

    const [total, data] = await Promise.all([
        prisma.aluno.count({ where: baseWhere }),
        prisma.aluno.findMany({
            where: baseWhere,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                matriculas: {
                    include: {
                        turma: {
                            include: {
                                curso: true
                            }
                        }
                    }
                }
            }
        })
    ])

    return {
        alunos: serializePrisma(data),
        total,
        page,
        lastPage: Math.ceil(total / limit)
    }
}

async function getCursos() {
    return await prisma.curso.findMany({
        orderBy: { nome: 'asc' },
        select: { id: true, nome: true }
    })
}

async function getTurmas() {
    return await prisma.turma.findMany({
        orderBy: { codigo_turma: 'asc' },
        select: { id: true, codigo_turma: true },
        where: {
            status: 'Em Curso'
        }
    })
}

// Helper to get translations server-side
async function getTranslations(lang: string) {
    const translations = await import(`@/lib/i18n/${lang}.json`)
    return translations.default
}

import { Suspense } from 'react'

export default async function AlunosPage({
    searchParams
}: {
    searchParams: Promise<{
        q?: string
        status?: string
        estado_pagamento?: string
        curso_id?: string
        turma_id?: string
        data_inicio?: string
        data_fim?: string
        lang?: string,
        page?: string
    }>
}) {
    const rawSearchParams = await searchParams
    const query = rawSearchParams.q
    const page = Number(rawSearchParams.page) || 1
    const status = rawSearchParams.status
    const estadoPagamento = rawSearchParams.estado_pagamento
    const cursoId = rawSearchParams.curso_id
    const turmaId = rawSearchParams.turma_id
    const dataInicio = rawSearchParams.data_inicio
    const dataFim = rawSearchParams.data_fim
    const lang = rawSearchParams.lang || 'pt'
    const limit = 10

    const [alunosData, cursos, turmas, t] = await Promise.all([
        getAlunos(query, status, estadoPagamento, cursoId, turmaId, dataInicio, dataFim, page, limit),
        getCursos(),
        getTurmas(),
        getTranslations(lang)
    ])

    const title = t.pages.students.title
    const subtitle = `${t.common.total}: ${alunosData.total} ${t.pages.students.subtitle}`

    const pagination = {
        currentPage: page,
        totalPages: alunosData.lastPage,
        totalItems: alunosData.total
    }

    return (
        <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando alunos...</div>}>
            <AlunosTableClient
                alunos={alunosData.alunos}
                pagination={pagination}
                cursos={cursos}
                turmas={turmas}
                title={title}
                subtitle={subtitle}
            />
        </Suspense>
    )
}
