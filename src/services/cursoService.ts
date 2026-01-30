import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/client'

export const cursoService = {
    async create(data: Prisma.CursoCreateInput) {
        return prisma.curso.create({ data })
    },

    async findAll() {
        return prisma.curso.findMany({ include: { turmas: true } })
    },

    async findById(id: string) {
        return prisma.curso.findUnique({
            where: { id },
            include: { turmas: true }
        })
    },

    async update(id: string, data: Prisma.CursoUpdateInput) {
        return prisma.curso.update({ where: { id }, data })
    },

    async delete(id: string) {
        return prisma.curso.delete({ where: { id } })
    }
}
