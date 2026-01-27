import { prisma } from '@/lib/prisma'

export class DashboardService {
    static async getGlobalStats() {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [
            alunosCount,
            funcionariosCount,
            turmasCount,
            cursosCount,
            pagamentosRecentes,
            totalRevenue,
            monthlyRevenue,
            matriculasPendentes,
            recentAuditLogs
        ] = await Promise.all([
            prisma.aluno.count(),
            prisma.funcionario.count({ where: { status: 'ATIVO' } }),
            prisma.turma.count({ where: { status: 'Em Andamento' } }),
            prisma.curso.count(),
            prisma.pagamento.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    matricula: {
                        include: { aluno: true }
                    }
                }
            }),
            prisma.pagamento.aggregate({
                _sum: { valor: true }
            }),
            prisma.pagamento.aggregate({
                where: { createdAt: { gte: firstDayOfMonth } },
                _sum: { valor: true }
            }),
            prisma.matricula.count({
                where: { estado_pagamento: { in: ['Pendente', 'Parcial'] } }
            }),
            prisma.auditLog.findMany({
                take: 6,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            stats: {
                totalAlunos: alunosCount,
                totalFuncionarios: funcionariosCount,
                turmasAtivas: turmasCount,
                totalCursos: cursosCount,
                revenueTotal: Number(totalRevenue._sum.valor || 0),
                revenueMensal: Number(monthlyRevenue._sum.valor || 0),
                pendentes: matriculasPendentes
            },
            recentPagamentos: pagamentosRecentes,
            recentActivity: recentAuditLogs
        };
    }
}
