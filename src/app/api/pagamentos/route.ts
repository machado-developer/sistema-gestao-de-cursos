import { NextRequest, NextResponse } from 'next/server'
import { matriculaService } from '@/services/matriculaService'
import { pagamentoSchema } from '@/lib/schemas'
import { withAudit } from '@/lib/withAudit'

async function POSTHandler(request: NextRequest) {
    try {
        const body = await request.json()

        // Zod Validation
        const validation = pagamentoSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: 'Dados inválidos',
                details: validation.error.format()
            }, { status: 400 })
        }

        const { matriculaId, valor, metodo_pagamento } = validation.data

        // Business Rule: Check balance before payment
        const saldoRes = await matriculaService.getSaldo(matriculaId)
        if (valor > saldoRes.saldo) {
            return NextResponse.json({
                error: 'Valor excedente',
                message: `O valor de ${valor.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} excede o saldo pendente de ${saldoRes.saldo.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}.`
            }, { status: 422 })
        }

        const updatedMatricula = await matriculaService.registerPayment(
            matriculaId,
            valor,
            metodo_pagamento
        )

        return NextResponse.json(updatedMatricula)
    } catch (error: any) {
        return NextResponse.json({
            error: 'Erro no servidor',
            message: error.message || 'Falha ao registrar pagamento'
        }, { status: 500 })
    }
}

export const POST = withAudit(POSTHandler, { acao: 'REGISTAR', entidade: 'PAGAMENTO' })
