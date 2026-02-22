import { prisma } from '@/lib/prisma'
import { matriculaService } from './matriculaService'
import QRCode from 'qrcode'
import crypto from 'crypto'

export const certificateService = {
    async validateIssuance(matriculaId: string) {
        const matricula = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: {
                turma: true,
                pagamentos: true,
                aluno: true
            }
        })

        const checks = []

        if (!matricula) {
            return { allowed: false, reasons: ['Matrícula não encontrada'] }
        }

        // 1. Turma Concluída
        if (matricula.turma.status !== 'Concluída') {
            checks.push('Turma não está concluída')
        }

        // 2. Aluno Aprovado
        if (matricula.status_academico !== 'Aprovado') {
            checks.push('Aluno não foi aprovado')
        }

        // 3. Pagamento 100% OU Bolseiro
        const financial = await matriculaService.getSaldo(matriculaId)
        const isBolseiro = matricula.aluno.bolseiro

        if (financial.status !== 'Pago' && financial.status !== 'Isento' && !isBolseiro) {
            checks.push(`Pagamento pendente (Saldo: ${financial.saldo})`)
        }

        return {
            allowed: checks.length === 0,
            reasons: checks,
            matricula,
            isBolseiro
        }
    },

    async getCertificateData(matriculaId: string) {
        const validation = await this.validateIssuance(matriculaId)
        if (!validation.allowed) {
            throw new Error(`Emissão bloqueada: ${validation.reasons?.join(', ')}`)
        }

        const { matricula } = validation
        // Fetch full details for PDF
        const fullData = await prisma.matricula.findUnique({
            where: { id: matriculaId },
            include: {
                aluno: true,
                turma: {
                    include: {
                        curso: true,
                        instrutor: true
                    }
                }
            }
        })
        return fullData
    },

    async getTemplateForCurso(cursoId: string) {
        const curso = await prisma.curso.findUnique({
            where: { id: cursoId },
            include: { certificateTemplate: true }
        })
        return curso?.certificateTemplate
    },

    async issueCertificatesBulk(matriculaIds: string[]) {
        const results: any[] = []

        // Process in transaction for data integrity
        return await prisma.$transaction(async (tx) => {
            for (const id of matriculaIds) {
                try {
                    const validation = await this.validateIssuance(id)
                    if (!validation.allowed) {
                        results.push({ error: `Bloqueado: ${validation.reasons?.join(', ')}`, matriculaId: id })
                        continue
                    }

                    // Check if already issued
                    const existing = await tx.certificate.findUnique({
                        where: { matriculaId: id }
                    })

                    if (existing) {
                        results.push({ certificate: existing, matriculaId: id })
                        continue
                    }

                    const codigoUnico = crypto.randomBytes(4).toString('hex').toUpperCase()
                    const hashValidacao = crypto.randomBytes(16).toString('hex')

                    const certificate = await tx.certificate.create({
                        data: {
                            matriculaId: id,
                            codigo_unico: codigoUnico,
                            hash_validacao: hashValidacao
                        }
                    })

                    results.push({ certificate, matriculaId: id })
                } catch (err: any) {
                    results.push({ error: err.message, matriculaId: id })
                }
            }
            return results
        })
    },

    async issueCertificate(matriculaId: string) {
        const results = await this.issueCertificatesBulk([matriculaId])
        const res = results[0] as any
        if (res.error) {
            throw new Error(res.error)
        }
        return res.certificate
    },

    async generateQRCode(hash: string) {
        const url = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/validar/${hash}`
        return await QRCode.toDataURL(url)
    },

    async getCertificateByHash(hash: string) {
        return prisma.certificate.findUnique({
            where: { hash_validacao: hash },
            include: {
                matricula: {
                    include: {
                        aluno: true,
                        turma: {
                            include: {
                                curso: true
                            }
                        }
                    }
                }
            }
        })
    }
}

