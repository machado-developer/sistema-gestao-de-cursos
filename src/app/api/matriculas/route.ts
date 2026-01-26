import { NextRequest, NextResponse } from 'next/server'
import { matriculaService } from '@/services/matriculaService'
import { turmaService } from '@/services/turmaService'
import { matriculaSchema } from '@/lib/schemas'
import { withAudit } from '@/lib/withAudit'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function POSTHandler(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user?.email ? await prisma.user.findUnique({ where: { email: session.user.email } }) : null

        const body = await request.json()

        // Zod Validation
        const validation = matriculaSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: 'Dados inválidos',
                message: 'Verifique se preencheu todos os campos corretamente.',
                details: validation.error.format()
            }, { status: 400 })
        }

        const { alunoId, turmaId, valor_total, desconto } = validation.data

        // Business Rule: Check for vacancies
        const vagas = await turmaService.getVagasDisponiveis(turmaId)
        if (vagas.disponiveis <= 0) {
            return NextResponse.json({
                error: 'Turma lotada',
                message: `Esta turma já atingiu o limite máximo de ${vagas.total} alunos.`
            }, { status: 422 })
        }

        const matricula = await matriculaService.create({
            aluno: { connect: { id: alunoId } },
            turma: { connect: { id: turmaId } },
            valor_total: valor_total - (desconto || 0),
            valor_pago: 0,
            estado_pagamento: 'Pendente',
            status_academico: 'Cursando'
        }, user?.id)

        return NextResponse.json(matricula)
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({
                error: 'Duplicidade',
                message: 'Este aluno já se encontra matriculado nesta turma.'
            }, { status: 409 })
        }
        return NextResponse.json({
            error: 'Erro no servidor',
            message: error.message || 'Falha ao processar matrícula'
        }, { status: 500 })
    }
}

export const POST = withAudit(POSTHandler, { acao: 'CRIAR', entidade: 'MATRICULA' })

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user?.email ? await prisma.user.findUnique({ where: { email: session.user.email } }) : null

        const isAdmin = user?.role === 'ADMIN'
        const matriculas = await matriculaService.findAll(user?.id, isAdmin)

        // Enrich with academic data
        const enriched = matriculas.map((m: any) => ({
            ...m,
            totalAvaliacoes: m.avaliacoes?.length || 0,
            media_final: m.media_final || 0,
            percentual_frequencia: m.percentual_frequencia || 0
        }))

        return NextResponse.json(enriched)
    } catch (error: any) {
        return NextResponse.json({ error: 'Erro ao listar matrículas' }, { status: 500 })
    }
}

