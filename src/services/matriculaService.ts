import { prisma } from '@/lib/prisma'
import { presencaService } from './presencaService'
import { avaliacaoService } from './avaliacaoService'

export const matriculaService = {
    async create(data: any, userId?: string) {
        // Extract alunoId - handle both formats
        const alunoId = data.alunoId || data.aluno?.connect?.id

        if (!alunoId) {
            throw new Error('alunoId is required')
        }

        // Check if student is bolseiro
        const aluno = await prisma.aluno.findUnique({
            where: { id: alunoId }
        })

        // Apply bolseiro rules
        if (aluno?.bolseiro) {
            data.valor_total = 0
            data.valor_pago = 0
            data.estado_pagamento = 'Isento'
        }

        return prisma.matricula.create({
            data: { ...data, userId }
        })
    },

    async findAll(userId?: string, isAdmin = false) {
        const where: any = isAdmin ? {} : { userId };
        return prisma.matricula.findMany({
            where,
            include: {
                aluno: true,
                turma: { include: { curso: true } },
                avaliacoes: true
            },
            orderBy: { createdAt: 'desc' }
        })
    },

    async getById(id: string) {
        return prisma.matricula.findUnique({
            where: { id },
            include: { pagamentos: true, aluno: true, turma: { include: { curso: true } } }
        })
    },

    async registerPayment(matriculaId: string, valor: number, metodo: string) {
        // Create payment
        await prisma.pagamento.create({
            data: {
                matriculaId,
                valor,
                metodo_pagamento: metodo
            }
        })

        // Update balance
        return this.updateSaldo(matriculaId)
    },


    async updateNotas(matriculaId: string, notas: number[]) {
        // Calculate average
        const total = notas.reduce((acc, nota) => acc + nota, 0)
        const media = notas.length > 0 ? total / notas.length : 0

        // Update matricula with new average
        await prisma.matricula.update({
            where: { id: matriculaId },
            data: { media_final: media }
        })

        // Recalculate academic status
        return this.calcularStatusAcademico(matriculaId)
    },

    async updateSaldo(matriculaId: string) {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: {
                pagamentos: true,
                aluno: true
            }
        })
        if (!matricula) throw new Error("Matrícula não encontrada")

        const total = Number(matricula.valor_total)
        const pago = matricula.pagamentos.reduce((acc: number, p: any) => acc + Number(p.valor), 0)

        let status = 'Pendente'

        // Bolseiros are always "Isento"
        if (matricula.aluno.bolseiro) {
            status = 'Isento'
        } else {
            if (pago >= total - 0.1) status = 'Pago' // Use small epsilon for float tolerance
            else if (pago > 0) status = 'Parcial'
        }

        return prisma.matricula.update({
            where: { id: matriculaId },
            data: {
                valor_pago: pago,
                estado_pagamento: status
            }
        })
    },

    async getSaldo(matriculaId: string) {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: { pagamentos: true }
        })
        if (!matricula) throw new Error("Matrícula não encontrada")

        const total = Number(matricula.valor_total)
        const pago = Number(matricula.valor_pago)

        return {
            total,
            pago,
            saldo: total - pago,
            status: matricula.estado_pagamento
        }
    },

    /**
     * Calculate and update academic status based on:
     * 1. Media >= media_minima_aprovacao
     * 2. Frequencia >= frequencia_minima
     */
    async calcularStatusAcademico(matriculaId: string) {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: {
                turma: {
                    include: {
                        curso: true
                    }
                },
                avaliacoes: true
            }
        })

        if (!matricula) throw new Error("Matrícula não encontrada")

        // Get current values
        const media = matricula.media_final || 0
        const frequencia = matricula.percentual_frequencia || 0

        const curso = matricula.turma.curso
        const mediaMinima = curso.media_minima_aprovacao
        const frequenciaMinima = curso.frequencia_minima

        let status = 'Cursando'

        // Only calculate status if there are avaliacoes
        if (matricula.avaliacoes.length > 0) {
            // Must meet BOTH criteria
            const aprovadoPorMedia = media >= mediaMinima
            const aprovadoPorFrequencia = frequencia >= frequenciaMinima

            if (aprovadoPorMedia && aprovadoPorFrequencia) {
                status = 'Aprovado'
            } else {
                status = 'Reprovado'
            }
        }

        return prisma.matricula.update({
            where: { id: matriculaId },
            data: {
                status_academico: status
            }
        })
    },

    /**
     * Apply bolseiro rules to an existing matricula
     */
    async aplicarRegrasBolseiro(matriculaId: string) {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: { aluno: true }
        })

        if (!matricula) throw new Error("Matrícula não encontrada")

        if (matricula.aluno.bolseiro) {
            return prisma.matricula.update({
                where: { id: matriculaId },
                data: {
                    valor_total: 0,
                    valor_pago: 0,
                    estado_pagamento: 'Isento'
                }
            })
        }

        return matricula
    }
}
