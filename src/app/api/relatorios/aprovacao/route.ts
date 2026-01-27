import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const cursoId = searchParams.get('cursoId')
        const turmaId = searchParams.get('turmaId')

        let where: any = {}

        if (turmaId) {
            where.turmaId = turmaId
        } else if (cursoId) {
            where.turma = { cursoId }
        }

        const matriculas = await prisma.matricula.findMany({
            where,
            include: {
                aluno: true,
                turma: {
                    include: {
                        curso: true
                    }
                }
            }
        })

        const total = matriculas.length
        const aprovados = matriculas.filter((m: { status_academico: string }) => m.status_academico === 'Aprovado').length
        const reprovados = matriculas.filter((m: { status_academico: string }) => m.status_academico === 'Reprovado').length
        const cursando = matriculas.filter((m: { status_academico: string }) => m.status_academico === 'Cursando').length

        const taxaAprovacao = total > 0 ? (aprovados / total) * 100 : 0

        // Breakdown by curso if no specific filters
        let porCurso: any = {}
        if (!cursoId && !turmaId) {
            porCurso = matriculas.reduce((acc: any, m: { turma: { curso: { nome: any } }; status_academico: string }) => {
                const cursoNome = m.turma.curso.nome
                if (!acc[cursoNome]) {
                    acc[cursoNome] = {
                        total: 0,
                        aprovados: 0,
                        reprovados: 0,
                        cursando: 0,
                        taxaAprovacao: 0
                    }
                }
                acc[cursoNome].total++
                if (m.status_academico === 'Aprovado') acc[cursoNome].aprovados++
                if (m.status_academico === 'Reprovado') acc[cursoNome].reprovados++
                if (m.status_academico === 'Cursando') acc[cursoNome].cursando++
                return acc
            }, {})

            // Calculate taxa for each curso
            Object.keys(porCurso).forEach((curso) => {
                const data = porCurso[curso]
                data.taxaAprovacao = data.total > 0 ? (data.aprovados / data.total) * 100 : 0
            })
        }

        return NextResponse.json({
            total,
            aprovados,
            reprovados,
            cursando,
            taxaAprovacao: Math.round(taxaAprovacao * 100) / 100,
            porCurso: Object.keys(porCurso).length > 0 ? porCurso : undefined
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
