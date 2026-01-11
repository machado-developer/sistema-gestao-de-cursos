import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { avaliacaoService } from '@/services/avaliacaoService'
import { presencaService } from '@/services/presencaService'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: alunoId } = await params

        const aluno = await prisma.aluno.findUnique({
            where: { id: alunoId },
            include: {
                matriculas: {
                    include: {
                        turma: {
                            include: {
                                curso: true
                            }
                        },
                        avaliacoes: {
                            include: {
                                instrutor: true,
                                aula: true
                            },
                            orderBy: {
                                createdAt: 'asc'
                            }
                        }
                    }
                }
            }
        })

        if (!aluno) {
            return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 })
        }

        const historico = []

        for (const matricula of aluno.matriculas) {
            const media = await avaliacaoService.calcularMedia(matricula.id)
            const frequencia = await presencaService.calcularFrequencia(matricula.id)

            historico.push({
                matriculaId: matricula.id,
                curso: matricula.turma.curso.nome,
                turma: matricula.turma.codigo_turma,
                dataInicio: matricula.turma.data_inicio,
                dataFim: matricula.turma.data_fim,
                statusTurma: matricula.turma.status,
                statusAcademico: matricula.status_academico,
                mediaFinal: media,
                percentualFrequencia: frequencia,
                avaliacoes: matricula.avaliacoes.map((av) => ({
                    id: av.id,
                    tipo: av.tipo,
                    nota: av.nota,
                    peso: av.peso,
                    instrutor: av.instrutor?.nome,
                    aula: av.aula?.tema,
                    data: av.createdAt,
                    observacao: av.observacao
                })),
                estadoPagamento: matricula.estado_pagamento,
                valorTotal: Number(matricula.valor_total),
                valorPago: Number(matricula.valor_pago)
            })
        }

        return NextResponse.json({
            aluno: {
                id: aluno.id,
                nome: aluno.nome_completo,
                bi: aluno.bi_documento,
                email: aluno.email,
                bolseiro: aluno.bolseiro
            },
            historico
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
