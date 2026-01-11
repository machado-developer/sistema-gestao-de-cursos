import { prisma } from '@/lib/prisma'
import { AlunoForm } from '@/components/forms/AlunoForm'
import { notFound } from 'next/navigation'
import { serializePrisma } from '@/lib/utils'

export default async function EditarAlunoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const aluno = await prisma.aluno.findUnique({
        where: { id }
    })

    if (!aluno) {
        notFound()
    }

    // Serialize to handle Dates and Decimals if any (though Aluno model seems simple strings usually, but data_nascimento might be problematic if date object)
    // Actually, prisma returns Date objects for DateTime fields. Client components need strings usually if passing to initialData props that expect standard JSON.
    // However, AlunoForm uses strings for dates in the schema, but proper serialization is safer.
    const initialData = serializePrisma(aluno)

    return (
        <div className="p-6">
            <AlunoForm initialData={initialData} />
        </div>
    )
}
