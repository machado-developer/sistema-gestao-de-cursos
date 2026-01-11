import { prisma } from '@/lib/prisma'
import { TurmaForm } from '@/components/forms/TurmaForm'
import { notFound } from 'next/navigation'
import { serializePrisma } from '@/lib/utils'

export default async function EditarTurmaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const turma = await prisma.turma.findUnique({
        where: { id }
    })

    if (!turma) {
        notFound()
    }

    const initialData = serializePrisma(turma)

    return (
        <div className="p-6">
            <TurmaForm initialData={initialData} />
        </div>
    )
}
