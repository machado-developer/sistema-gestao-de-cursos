import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AlunoProfileClient } from './AlunoProfileClient'
import { serializePrisma } from '@/lib/utils'

interface AlunoProfilePageProps {
    params: Promise<{
        id: string
    }>
}

export const dynamic = 'force-dynamic'

async function getAlunoData(id: string) {
    const aluno = await prisma.aluno.findUnique({
        where: { id },
        include: {
            matriculas: {
                include: {
                    turma: {
                        include: {
                            curso: true
                        }
                    }
                }
            },
            documentos: true
        }
    })

    if (!aluno) return null

    return serializePrisma(aluno)
}

export default async function AlunoProfilePage({ params }: AlunoProfilePageProps) {
    const { id } = await params
    const aluno = await getAlunoData(id)

    if (!aluno) {
        notFound()
    }

    return (
        <div className="pb-20">
            <AlunoProfileClient aluno={aluno as any} />
        </div>
    )
}
