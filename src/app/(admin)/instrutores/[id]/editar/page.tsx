import { prisma } from '@/lib/prisma'
import { InstrutorForm } from '@/components/forms/InstrutorForm'
import { notFound } from 'next/navigation'
import { serializePrisma } from '@/lib/utils'

export default async function EditarInstrutorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const instrutor = await prisma.instrutor.findUnique({
        where: { id }
    })

    if (!instrutor) {
        notFound()
    }

    const initialData = serializePrisma(instrutor)

    return (
        <div className="p-6">
            <InstrutorForm initialData={initialData} />
        </div>
    )
}
