import { prisma } from '@/lib/prisma'
import { DashboardClient } from './DashboardClient'
import { serializePrisma } from '@/lib/utils'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

async function getDashboardData() {
  const [
    totalAlunos,
    turmasAtivas,
    totalPayments,
    totalCertificados,
    recentMatriculas
  ] = await Promise.all([
    prisma.aluno.count(),
    prisma.turma.count({ where: { status: 'Em Andamento' } }),
    prisma.pagamento.aggregate({ _sum: { valor: true } }),
    prisma.matricula.count({
      where: {
        status_academico: 'Aprovado',
        estado_pagamento: 'Pago'
      }
    }),
    prisma.matricula.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        aluno: true,
        turma: {
          include: { curso: true }
        }
      }
    })
  ])

  return serializePrisma({
    totalAlunos,
    turmasAtivas,
    totalRevenue: Number(totalPayments._sum.valor || 0),
    totalCertificados,
    recentMatriculas
  })
}

export default async function Home() {
  const data = await getDashboardData()
  return <DashboardClient data={data as any} />
}
