import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { TurmaAcademicClient } from './TurmaAcademicClient'

export default async function TurmaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const turma = await prisma.turma.findUnique({
        where: { id },
        include: {
            curso: true,
            instrutor: true,
            matriculas: {
                include: {
                    aluno: true,
                    avaliacoes: true
                },
                orderBy: {
                    aluno: {
                        nome_completo: 'asc'
                    }
                }
            },
            aulas: {
                orderBy: {
                    data: 'desc'
                }
            }
        }
    })

    if (!turma) notFound()

    return <TurmaAcademicClient turma={serializePrisma(turma)} aulas={serializePrisma(turma.aulas)} />
}
