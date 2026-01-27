import { prisma } from '@/lib/prisma'

export const avaliacaoService = {
    /**
     * Launch a new grade/evaluation
     */
    async lancarNota(data: {
        matriculaId: string
        tipo: 'prova' | 'trabalho' | 'participacao'
        nota: number
        peso?: number
        instrutorId?: string
        aulaId?: string
        observacao?: string
    }) {
        const avaliacao = await prisma.avaliacao.create({
            data: {
                matriculaId: data.matriculaId,
                tipo: data.tipo,
                nota: data.nota,
                peso: data.peso || 1.0,
                instrutorId: data.instrutorId,
                aulaId: data.aulaId,
                observacao: data.observacao
            },
            include: {
                matricula: {
                    include: {
                        aluno: true
                    }
                },
                instrutor: true,
                aula: true
            }
        })

        // Automatically update the matricula's average
        await this.atualizarMediaMatricula(data.matriculaId)

        return avaliacao
    },

    /**
     * Edit an existing grade
     */
    async editarNota(
        id: string,
        data: {
            nota?: number
            peso?: number
            observacao?: string
        }
    ) {
        const avaliacao = await prisma.avaliacao.update({
            where: { id },
            data,
            include: {
                matricula: true
            }
        })

        // Recalculate average
        await this.atualizarMediaMatricula(avaliacao.matriculaId)

        return avaliacao
    },

    /**
     * Delete a grade
     */
    async deletarNota(id: string) {
        const avaliacao = await prisma.avaliacao.findUnique({
            where: { id },
            select: { matriculaId: true }
        })

        if (!avaliacao) {
            throw new Error('Avaliação não encontrada')
        }

        await prisma.avaliacao.delete({
            where: { id }
        })

        // Recalculate average after deletion
        await this.atualizarMediaMatricula(avaliacao.matriculaId)

        return { success: true }
    },

    /**
     * Get all avaliacoes for a matricula
     */
    async findByMatricula(matriculaId: string) {
        return prisma.avaliacao.findMany({
            where: { matriculaId },
            include: {
                instrutor: true,
                aula: true
            },
            orderBy: { createdAt: 'asc' }
        })
    },

    /**
     * Get all avaliacoes for a turma
     */
    async findByTurma(turmaId: string) {
        return prisma.avaliacao.findMany({
            where: {
                matricula: {
                    turmaId
                }
            },
            include: {
                matricula: {
                    include: {
                        aluno: true
                    }
                },
                instrutor: true,
                aula: true
            },
            orderBy: { createdAt: 'desc' }
        })
    },

    /**
     * Calculate weighted average for a matricula
     * Formula: Σ(nota × peso) / Σ(pesos)
     */
    async calcularMedia(matriculaId: string): Promise<number> {
        const avaliacoes = await prisma.avaliacao.findMany({
            where: { matriculaId },
            select: {
                nota: true,
                peso: true
            }
        })

        if (avaliacoes.length === 0) {
            return 0
        }

        const somaNotasPonderadas = avaliacoes.reduce(
            (acc: number, av: { nota: number; peso: number }) => acc + av.nota * av.peso,
            0
        )
        const somaPesos = avaliacoes.reduce((acc: any, av: { peso: any }) => acc + av.peso, 0)

        if (somaPesos === 0) {
            return 0
        }

        const media = somaNotasPonderadas / somaPesos

        return Math.round(media * 100) / 100 // Round to 2 decimal places
    },

    /**
     * Update the media_final field in matricula
     */
    async atualizarMediaMatricula(matriculaId: string) {
        const media = await this.calcularMedia(matriculaId)

        return prisma.matricula.update({
            where: { id: matriculaId },
            data: {
                media_final: media
            }
        })
    },

    /**
     * Get grade summary for a student
     */
    async getSummaryByAluno(alunoId: string) {
        const matriculas = await prisma.matricula.findMany({
            where: { alunoId },
            include: {
                turma: {
                    include: {
                        curso: true
                    }
                },
                avaliacoes: true
            }
        })

        const summary = []

        for (const matricula of matriculas) {
            const media = await this.calcularMedia(matricula.id)
            summary.push({
                matriculaId: matricula.id,
                turma: matricula.turma,
                media_final: media,
                total_avaliacoes: matricula.avaliacoes.length
            })
        }

        return summary
    },

    /**
     * Get detailed grade breakdown for a matricula
     */
    async getDetalhesNotas(matriculaId: string) {
        const avaliacoes = await this.findByMatricula(matriculaId)
        const media = await this.calcularMedia(matriculaId)

        const breakdown = avaliacoes.map((av: { id: any; tipo: any; nota: number; peso: number; instrutor: { nome: any }; createdAt: any }) => ({
            id: av.id,
            tipo: av.tipo,
            nota: av.nota,
            peso: av.peso,
            contribuicao: (av.nota * av.peso) / avaliacoes.reduce((acc: any, a: { peso: any }) => acc + a.peso, 0),
            instrutor: av.instrutor?.nome,
            data: av.createdAt
        }))

        return {
            avaliacoes: breakdown,
            media_final: media,
            total_avaliacoes: avaliacoes.length,
            soma_pesos: avaliacoes.reduce((acc: any, av: { peso: any }) => acc + av.peso, 0)
        }
    }
}
