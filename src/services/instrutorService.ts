import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/client'

export const instrutorService = {
    async create(data: Prisma.InstrutorCreateInput) {
        return prisma.instrutor.create({ data })
    },

    async findAll() {
        return prisma.instrutor.findMany({ orderBy: { nome: 'asc' } })
    },

    async findById(id: string) {
        return prisma.instrutor.findUnique({ where: { id } })
    }
}
