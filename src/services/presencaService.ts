import { prisma } from '@/lib/prisma'

export const presencaService = {
    /**
     * Mark attendance for a single student in a class
     */
    async marcarPresenca(data: {
        aulaId: string
        alunoId: string
        status: 'Presente' | 'Ausente'
    }) {
        const presenca = await prisma.presenca.upsert({
            where: {
                aulaId_alunoId: {
                    aulaId: data.aulaId,
                    alunoId: data.alunoId
                }
            },
            update: {
                status: data.status
            },
            create: {
                aulaId: data.aulaId,
                alunoId: data.alunoId,
                status: data.status
            }
        })

        // Find the matricula and update frequency
        const aula = await prisma.aula.findUnique({
            where: { id: data.aulaId },
            select: { turmaId: true }
        })

        if (aula) {
            const matricula = await prisma.matricula.findFirst({
                where: {
                    alunoId: data.alunoId,
                    turmaId: aula.turmaId
                }
            })

            if (matricula) {
                await this.atualizarFrequenciaMatricula(matricula.id)
            }
        }

        return presenca
    },

    /**
     * Mark attendance for multiple students in a class (bulk operation)
     */
    async marcarPresencasEmLote(
        aulaId: string,
        presencas: Array<{ alunoId: string; status: 'Presente' | 'Ausente' }>
    ) {
        const results = []

        for (const p of presencas) {
            const result = await this.marcarPresenca({
                aulaId,
                alunoId: p.alunoId,
                status: p.status
            })
            results.push(result)
        }

        return results
    },

    /**
     * Get all presencas for a specific aula
     */
    async findByAula(aulaId: string) {
        return prisma.presenca.findMany({
            where: { aulaId },
            include: {
                aluno: true,
                aula: true
            },
            orderBy: {
                aluno: {
                    nome_completo: 'asc'
                }
            }
        })
    },

    /**
     * Get all presencas for a specific student
     */
    async findByAluno(alunoId: string, turmaId?: string) {
        return prisma.presenca.findMany({
            where: {
                alunoId,
                ...(turmaId && {
                    aula: {
                        turmaId
                    }
                })
            },
            include: {
                aula: {
                    include: {
                        turma: true
                    }
                }
            },
            orderBy: {
                aula: {
                    data: 'asc'
                }
            }
        })
    },

    /**
     * Calculate attendance percentage for a matricula
     */
    async calcularFrequencia(matriculaId: string): Promise<number> {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: {
                aluno: true,
                turma: {
                    include: {
                        aulas: true
                    }
                }
            }
        })

        if (!matricula) {
            throw new Error('Matrícula não encontrada')
        }

        const totalAulas = matricula.turma.aulas.length

        if (totalAulas === 0) {
            return 0
        }

        // Count presences
        const presencas = await prisma.presenca.count({
            where: {
                alunoId: matricula.alunoId,
                aula: {
                    turmaId: matricula.turmaId
                },
                status: 'Presente'
            }
        })

        const percentual = (presencas / totalAulas) * 100

        return Math.round(percentual * 100) / 100 // Round to 2 decimal places
    },

    /**
     * Update the percentual_frequencia field in matricula
     */
    async atualizarFrequenciaMatricula(matriculaId: string) {
        const percentual = await this.calcularFrequencia(matriculaId)

        return prisma.matricula.update({
            where: { id: matriculaId },
            data: {
                percentual_frequencia: percentual
            }
        })
    },

    /**
     * Get attendance summary for a turma
     */
    async getSummaryByTurma(turmaId: string) {
        const matriculas = await prisma.matricula.findMany({
            where: { turmaId },
            include: {
                aluno: true
            }
        })

        const summary = []

        for (const matricula of matriculas) {
            const percentual = await this.calcularFrequencia(matricula.id)
            summary.push({
                matriculaId: matricula.id,
                aluno: matricula.aluno,
                percentual_frequencia: percentual
            })
        }

        return summary
    }
}
