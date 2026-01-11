import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { InstrutorProfileClient } from './InstrutorProfileClient'
import { serializePrisma } from '@/lib/utils'

interface InstrutorProfilePageProps {
    params: {
        id: string
    }
}

export const dynamic = 'force-dynamic'

async function getInstrutorData(id: string) {
    const instrutor = await prisma.instrutor.findUnique({
        where: { id },
        include: {
            turmas: {
                include: {
                    curso: true,
                    matriculas: true
                }
            }
        }
    })

    if (!instrutor) return null

    return serializePrisma(instrutor)
}

export default async function InstrutorProfilePage({ params }: InstrutorProfilePageProps) {
    // In Next.js 15, params is a promise
    const resolvedParams = await params
    const instrutor = await getInstrutorData(resolvedParams.id)

    if (!instrutor) {
        notFound()
    }

    return (
        <div className="pb-20">
            <InstrutorProfileClient instrutor={instrutor as any} />
        </div>
    )
}
