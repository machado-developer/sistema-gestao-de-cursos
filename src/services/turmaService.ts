import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const turmaService = {
    async create(data: Prisma.TurmaCreateInput) {
        return prisma.turma.create({ data })
    },

    async findAll() {
        return prisma.turma.findMany({
            include: { curso: true, instrutor: true },
            orderBy: { createdAt: 'desc' }
        })
    },

    async findById(id: string) {
        return prisma.turma.findUnique({
            where: { id },
            include: {
                curso: true,
                instrutor: true,
                matriculas: { include: { aluno: true } }
            }
        })
    },

    async update(id: string, data: Prisma.TurmaUpdateInput) {
        return prisma.turma.update({ where: { id }, data })
    },

    async concluirTurma(id: string) {
        return prisma.$transaction(async (tx) => {
            const turma = await tx.turma.findUnique({
                where: { id },
                include: { curso: true, matriculas: true }
            })
            if (!turma) throw new Error("Turma não encontrada")

            // Update status
            await tx.turma.update({
                where: { id },
                data: { status: 'Concluída' }
            })

            // Calculate pass/fail for each student
            // Assuming 'media_final' is already populated by instructor
            for (const m of turma.matriculas) {
                const media = m.media_final || 0 // Default to 0 if not set
                const aprovado = media >= turma.curso.media_minima_aprovacao

                await tx.matricula.update({
                    where: { id: m.id },
                    data: {
                        status_academico: aprovado ? 'Aprovado' : 'Reprovado',
                        // Optional: Lock grades here logic implies we don't change 'notas' anymore
                    }
                })
            }
            return turma
        })
    },

    async getVagasDisponiveis(id: string) {
        const turma = await prisma.turma.findUnique({
            where: { id },
            include: { _count: { select: { matriculas: true } } }
        })
        if (!turma) throw new Error("Turma não encontrada")

        return {
            total: turma.vagas,
            ocupadas: turma._count.matriculas,
            disponiveis: turma.vagas - turma._count.matriculas
        }
    },

    async checkAndFinalizeExpiredTurmas() {
        // 1. Find active turmas that have passed their end date
        const expiredTurmas = await prisma.turma.findMany({
            where: {
                status: 'Em Andamento',
                data_fim: { lt: new Date() }
            },
            include: { curso: true, matriculas: true }
        })

        // 2. Find COMPLETED turmas that still have students "Cursando" (fix inconsistencies)
        const inconsistentTurmas = await prisma.turma.findMany({
            where: {
                status: 'Concluída',
                matriculas: {
                    some: {
                        status_academico: 'Cursando'
                    }
                }
            },
            include: { curso: true, matriculas: true }
        })

        const turmasToProcess = [...expiredTurmas, ...inconsistentTurmas]

        if (turmasToProcess.length === 0) return

        // Process each turma in a transaction
        for (const turma of turmasToProcess) {
            await prisma.$transaction(async (tx) => {
                // Ensure status is Concluída
                if (turma.status !== 'Concluída') {
                    await tx.turma.update({
                        where: { id: turma.id },
                        data: { status: 'Concluída' }
                    })
                }

                // Calculate pass/fail for each student
                for (const m of turma.matriculas) {
                    // Only update students who are still "Cursando"
                    if (m.status_academico === 'Cursando') {
                        const media = m.media_final || 0
                        const aprovado = media >= turma.curso.media_minima_aprovacao

                        await tx.matricula.update({
                            where: { id: m.id },
                            data: {
                                status_academico: aprovado ? 'Aprovado' : 'Reprovado',
                            }
                        })
                    }
                }
            })
        }
    }
}
