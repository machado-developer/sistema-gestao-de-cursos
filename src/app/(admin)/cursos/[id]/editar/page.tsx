import { prisma } from '@/lib/prisma'
import { CursoForm } from '@/components/forms/CursoForm'
import { notFound } from 'next/navigation'
import { serializePrisma } from '@/lib/utils'

export default async function EditarCursoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const curso = await prisma.curso.findUnique({
        where: { id }
    })

    if (!curso) {
        notFound()
    }

    const initialData = serializePrisma(curso)

    return (
        <div className="p-6">
            <CursoForm initialData={initialData} />
        </div>
    )
}
