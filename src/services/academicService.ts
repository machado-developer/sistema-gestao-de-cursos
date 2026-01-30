import { prisma } from '@/lib/prisma'

export class AcademicService {
    static async getDashboardStats() {
        const [
            totalAlunos,
            totalCursos,
            totalTurmasAtivas,
            totalInstrutores,
            recentMatriculas,
            matriculasPorCurso
        ] = await Promise.all([
            prisma.aluno.count(),
            prisma.curso.count(),
            prisma.turma.count({ where: { status: 'Em Andamento' } }),
            prisma.instrutor.count(),
            prisma.matricula.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    aluno: true,
                    turma: {
                        include: { curso: true }
                    }
                }
            }),
            prisma.curso.findMany({
                select: {
                    nome: true,
                    turmas: {
                        select: {
                            _count: {
                                select: { matriculas: true }
                            }
                        }
                    }
                }
            })
        ]);

        return {
            totalAlunos,
            totalCursos,
            totalTurmasAtivas,
            totalInstrutores,
            recentMatriculas,
            matriculasPorCurso: matriculasPorCurso.map((c: any) => ({
                curso: c.nome,
                total: c.turmas.reduce((acc: number, t: any) => acc + (t._count?.matriculas || 0), 0)
            }))
        };
    }

    static async getAcademicReport(filters: any = {}) {
        // Basic implementation for academic report data
        const turmas = await prisma.turma.findMany({
            include: {
                curso: true,
                instrutor: true,
                _count: {
                    select: { matriculas: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return turmas;
    }

    static async getTurmaWithStudents(turmaId: string) {
        return prisma.turma.findUnique({
            where: { id: turmaId },
            include: {
                curso: true,
                matriculas: {
                    include: {
                        aluno: true
                    }
                }
            }
        });
    }
}
