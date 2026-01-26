import { prisma } from '@/lib/prisma'
import { DashboardClient } from './DashboardClient'
import { serializePrisma } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'

async function getDashboardData(userId?: string, isAdmin = false) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Define global filter based on user role
  const globalFilter = isAdmin ? {} : { userId };

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
    prisma.aluno.count({ where: globalFilter }),
    prisma.turma.count({ where: { status: 'Em Andamento', ...globalFilter } }),
    prisma.pagamento.aggregate({
      where: globalFilter,
      _sum: { valor: true }
    }),
    prisma.certificate.count({ where: globalFilter }),
    prisma.matricula.findMany({
      take: 5,
      where: globalFilter,
      orderBy: { createdAt: 'desc' },
      include: {
        aluno: true,
        turma: { include: { curso: true } }
      }
    }),
    prisma.funcionario.count({ where: { status: 'ATIVO' } }), // HR data is usually shared or differently protected
    prisma.presencaHR.count({
      where: {
        data: { gte: today },
        status: 'PRESENTE'
      }
    }),
    prisma.matricula.count({
      where: {
        estado_pagamento: { in: ['Pendente', 'Parcial'] },
        ...globalFilter
      }
    }),
    prisma.auditLog.findMany({
      take: 5,
      where: isAdmin ? {} : { userId },
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Não autorizado</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const data = await getDashboardData(user.id, isAdmin);

  return <DashboardClient data={data as any} />
}
