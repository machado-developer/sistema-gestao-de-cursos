import { prisma } from '@/lib/prisma'
import { DashboardClient } from './DashboardClient'
import { serializePrisma } from '@/lib/utils'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

async function getDashboardData() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalAlunos,
    turmasAtivas,
    totalPayments,
    totalCertificados,
    recentMatriculas,
    totalFuncionarios,
    presencasHoje,
    pagamentosPendentes,
    recentActivity
  ] = await Promise.all([
    prisma.aluno.count(),
    prisma.turma.count({ where: { status: 'Em Andamento' } }),
    prisma.pagamento.aggregate({ _sum: { valor: true } }),
    prisma.certificate.count(),
    prisma.matricula.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        aluno: true,
        turma: { include: { curso: true } }
      }
    }),
    prisma.funcionario.count({ where: { status: 'ATIVO' } }),
    prisma.presencaHR.count({
      where: {
        data: { gte: today },
        status: 'PRESENTE'
      }
    }),
    prisma.matricula.count({
      where: { estado_pagamento: { in: ['Pendente', 'Parcial'] } }
    }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ])

  return serializePrisma({
    totalAlunos,
    turmasAtivas,
    totalRevenue: Number(totalPayments._sum.valor || 0),
    totalCertificados,
    recentMatriculas,
    totalFuncionarios,
    presencasHoje,
    pagamentosPendentes,
    recentActivity
  })
}

export default async function Home() {
  const data = await getDashboardData()
  return <DashboardClient data={data as any} />
}
