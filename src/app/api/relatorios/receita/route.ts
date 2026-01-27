import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const cursoId = searchParams.get('cursoId')
        const turmaId = searchParams.get('turmaId')

        // Receita por curso
        if (cursoId) {
            const matriculas = await prisma.matricula.findMany({
                where: {
                    turma: {
                        cursoId
                    }
                },
                include: {
                    aluno: true,
                    turma: {
                        include: {
                            curso: true
                        }
                    }
                }
            })

            const totalReceita = matriculas.reduce(
                (acc: number, m: any) => acc + Number(m.valor_pago),
                0
            )
            const totalBolseiros = matriculas.filter((m: { aluno: { bolseiro: any } }) => m.aluno.bolseiro).length
            const totalPagantes = matriculas.length - totalBolseiros

            return NextResponse.json({
                cursoId,
                totalMatriculas: matriculas.length,
                totalBolseiros,
                totalPagantes,
                totalReceita,
                receitaMedia: totalPagantes > 0 ? totalReceita / totalPagantes : 0
            })
        }

        // Receita por turma
        if (turmaId) {
            const matriculas = await prisma.matricula.findMany({
                where: { turmaId },
                include: {
                    aluno: true,
                    turma: {
                        include: {
                            curso: true
                        }
                    }
                }
            })

            const totalReceita = matriculas.reduce(
                (acc: number, m: any) => acc + Number(m.valor_pago),
                0
            )
            const totalBolseiros = matriculas.filter((m: { aluno: { bolseiro: any } }) => m.aluno.bolseiro).length
            const totalPagantes = matriculas.length - totalBolseiros

            return NextResponse.json({
                turmaId,
                totalMatriculas: matriculas.length,
                totalBolseiros,
                totalPagantes,
                totalReceita,
                receitaMedia: totalPagantes > 0 ? totalReceita / totalPagantes : 0
            })
        }

        // Receita geral
        const matriculas = await prisma.matricula.findMany({
            include: {
                aluno: true,
                turma: {
                    include: {
                        curso: true
                    }
                }
            }
        })

        const totalReceita = matriculas.reduce(
            (acc: number, m: any) => acc + Number(m.valor_pago),
            0
        )
        const totalBolseiros = matriculas.filter((m: { aluno: { bolseiro: any } }) => m.aluno.bolseiro).length
        const totalPagantes = matriculas.length - totalBolseiros

        // Group by curso
        const porCurso = matriculas.reduce((acc: any, m: any) => {
            const cursoNome = m.turma.curso.nome
            if (!acc[cursoNome]) {
                acc[cursoNome] = {
                    totalMatriculas: 0,
                    totalBolseiros: 0,
                    totalPagantes: 0,
                    totalReceita: 0
                }
            }
            acc[cursoNome].totalMatriculas++
            if (m.aluno.bolseiro) {
                acc[cursoNome].totalBolseiros++
            } else {
                acc[cursoNome].totalPagantes++
            }
            acc[cursoNome].totalReceita += Number(m.valor_pago)
            return acc
        }, {})

        return NextResponse.json({
            totalMatriculas: matriculas.length,
            totalBolseiros,
            totalPagantes,
            totalReceita,
            receitaMedia: totalPagantes > 0 ? totalReceita / totalPagantes : 0,
            porCurso
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
