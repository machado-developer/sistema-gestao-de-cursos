import { prisma } from '@/lib/prisma'

export const aulaService = {
    /**
     * Create a new aula
     */
    async create(data: {
        turmaId: string
        data: Date
        tema: string
        tipo?: string
    }) {
        return prisma.aula.create({
            data: {
                turmaId: data.turmaId,
                data: data.data,
                tema: data.tema,
                tipo: data.tipo || 'normal'
            },
            include: {
                turma: {
                    include: {
                        curso: true
                    }
                }
            }
        })
    },

    /**
     * Find all aulas for a specific turma
     */
    async findByTurma(turmaId: string) {
        return prisma.aula.findMany({
            where: { turmaId },
            include: {
                turma: {
                    include: {
                        curso: true,
                        instrutor: true
                    }
                },
                presencas: {
                    include: {
                        aluno: true
                    }
                },
                avaliacoes: true
            },
            orderBy: { data: 'asc' }
        })
    },

    /**
     * Get a single aula by ID
     */
    async getById(id: string) {
        return prisma.aula.findUnique({
            where: { id },
            include: {
                turma: {
                    include: {
                        curso: true,
                        instrutor: true
                    }
                },
                presencas: {
                    include: {
                        aluno: true
                    }
                },
                avaliacoes: {
                    include: {
                        matricula: {
                            include: {
                                aluno: true
                            }
                        }
                    }
                }
            }
        })
    },

    /**
     * Update an aula
     */
    async update(id: string, data: {
        data?: Date
        tema?: string
        tipo?: string
    }) {
        return prisma.aula.update({
            where: { id },
            data,
            include: {
                turma: true
            }
        })
    },

    /**
     * Delete an aula (cascade deletes presencas and avaliacoes)
     */
    async delete(id: string) {
        return prisma.aula.delete({
            where: { id }
        })
    },

    /**
     * Get all aulas with optional filters
     */
    async findAll(filters?: {
        turmaId?: string
        tipo?: string
        startDate?: Date
        endDate?: Date
    }) {
        return prisma.aula.findMany({
            where: {
                turmaId: filters?.turmaId,
                tipo: filters?.tipo,
                data: {
                    gte: filters?.startDate,
                    lte: filters?.endDate
                }
            },
            include: {
                turma: {
                    include: {
                        curso: true,
                        instrutor: true
                    }
                },
                _count: {
                    select: {
                        presencas: true,
                        avaliacoes: true
                    }
                }
            },
            orderBy: { data: 'desc' }
        })
    }
}
