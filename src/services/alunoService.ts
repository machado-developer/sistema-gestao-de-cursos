import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const alunoService = {
    async create(data: Prisma.AlunoCreateInput) {
        return prisma.aluno.create({ data })
    },

    async findAll() {
        return prisma.aluno.findMany({
            include: { matriculas: true },
            orderBy: { createdAt: 'desc' }
        })
    },

    async findById(id: string) {
        return prisma.aluno.findUnique({
            where: { id },
            include: {
                matriculas: {
                    include: {
                        turma: {
                            include: { curso: true }
                        }
                    }
                }
            }
        })
    },

    async update(id: string, data: Prisma.AlunoUpdateInput) {
        return prisma.aluno.update({ where: { id }, data })
    },

    async delete(id: string) {
        return prisma.aluno.delete({ where: { id } })
    }
}
