import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { PresencasClient } from './PresencasClient'

export default async function PresencasPage({
    params
}: {
    params: Promise<{ id: string; aulaId: string }>
}) {
    const { id: turmaId, aulaId } = await params

    const aula = await prisma.aula.findUnique({
        where: { id: aulaId },
        include: {
            turma: {
                include: {
                    curso: true,
                    matriculas: {
                        include: {
                            aluno: true
                        },
                        orderBy: {
                            aluno: {
                                nome_completo: 'asc'
                            }
                        }
                    }
                }
            },
            presencas: {
                include: {
                    aluno: true
                }
            }
        }
    })

    if (!aula || aula.turmaId !== turmaId) notFound()

    return <PresencasClient aula={serializePrisma(aula)} />
}
