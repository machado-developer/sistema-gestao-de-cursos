import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { HistoricoClient } from './HistoricoClient'

export default async function HistoricoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const aluno = await prisma.aluno.findUnique({
        where: { id },
        include: {
            matriculas: {
                include: {
                    turma: {
                        include: {
                            curso: true,
                            instrutor: true
                        }
                    },
                    avaliacoes: {
                        include: {
                            aula: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    certificate: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
            presencas: {
                include: {
                    aula: {
                        include: {
                            turma: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!aluno) notFound()

    return <HistoricoClient aluno={serializePrisma(aluno)} />
}
