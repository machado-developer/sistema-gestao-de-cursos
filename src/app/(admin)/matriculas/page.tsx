import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { MatriculasClient } from './MatriculasClient'
import { serializePrisma } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getMatriculas(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const [count, data] = await Promise.all([
        prisma.matricula.count(),
        prisma.matricula.findMany({
            take: limit,
            skip: skip,
            orderBy: { createdAt: 'desc' },
            include: {
                aluno: true,
                turma: {
                    include: { curso: true, instrutor: true }
                },
                pagamentos: true
            }
        })
    ])

    return {
        data: serializePrisma(data),
        meta: {
            total: count,
            page: page,
            lastPage: Math.ceil(count / limit)
        }
    }
}

import { Suspense } from 'react'

export default async function MatriculasPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const rawSearchParams = await searchParams
    const page = Number(rawSearchParams.page) || 1
    const limit = 10

    const matriculasData = await getMatriculas(page, limit)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Matrículas</h1>
                    <p className="text-zinc-400">Controle académico e financeiro individual</p>
                </div>
                <Link href="/matriculas/novo">
                    <Button className="gap-2">
                        <Plus size={18} /> Nova Matrícula
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-app-muted">Carregando matrículas...</div>}>
                <MatriculasClient
                    initialMatriculas={matriculasData.data}
                    pagination={{
                        currentPage: matriculasData.meta.page,
                        totalPages: matriculasData.meta.lastPage,
                        totalItems: matriculasData.meta.total
                    }}
                />
            </Suspense>
        </div>
    )
}
