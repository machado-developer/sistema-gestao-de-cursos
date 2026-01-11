import { prisma } from '@/lib/prisma'

export const financialService = {
    async getGlobalStats() {
        const matriculas = await prisma.matricula.findMany({
            include: { pagamentos: true }
        })

        const totalRevenue = matriculas.reduce((acc: number, m: any) => acc + Number(m.valor_pago), 0)
        const totalPending = matriculas.reduce((acc: number, m: any) => acc + (Number(m.valor_total) - Number(m.valor_pago)), 0)

        const countPaid = matriculas.filter((m: any) => m.estado_pagamento === 'Pago').length
        const countPartial = matriculas.filter((m: any) => m.estado_pagamento === 'Parcial').length
        const countPending = matriculas.filter((m: any) => m.estado_pagamento === 'Pendente').length

        return {
            totalRevenue,
            totalPending,
            countPaid,
            countPartial,
            countPending,
            totalMatriculas: matriculas.length
        }
    },

    async getRevenueByCourse() {
        const cursos = await prisma.curso.findMany({
            include: {
                turmas: {
                    include: {
                        matriculas: true
                    }
                }
            }
        })

        return cursos.map((curso: any) => {
            let total = 0
            curso.turmas.forEach((t: any) => {
                t.matriculas.forEach((m: any) => {
                    total += Number(m.valor_pago)
                })
            })
            return {
                id: curso.id,
                nome: curso.nome,
                revenue: total
            }
        })
    }
}
