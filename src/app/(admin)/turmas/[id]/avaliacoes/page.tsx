import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { AvaliacoesClient } from './AvaliacoesClient'

export default async function AvaliacoesPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id: turmaId } = await params

    const turma = await prisma.turma.findUnique({
        where: { id: turmaId },
        include: {
            curso: true,
            matriculas: {
                include: {
                    aluno: true,
                    avaliacoes: {
                        include: {
                            instrutor: true,
                            aula: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
                orderBy: {
                    aluno: {
                        nome_completo: 'asc'
                    }
                }
            }
        }
    })

    if (!turma) notFound()

    return <AvaliacoesClient turma={serializePrisma(turma)} />
}
