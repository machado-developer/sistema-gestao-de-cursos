import { NextRequest, NextResponse } from 'next/server'
import { avaliacaoService } from '@/services/avaliacaoService'
import { withAudit } from '@/lib/withAudit'

async function GetAvaliacao(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const avaliacao = await avaliacaoService.findByMatricula(id)

        if (!avaliacao) {
            return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 })
        }

        return NextResponse.json(avaliacao)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PutAvaliacao(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()

        const avaliacao = await avaliacaoService.editarNota(id, {
            nota: body.nota ? parseFloat(body.nota) : undefined,
            peso: body.peso ? parseFloat(body.peso) : undefined,
            observacao: body.observacao
        })

        return NextResponse.json(avaliacao)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function DeleteAvaliacao(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await avaliacaoService.deletarNota(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const GET = GetAvaliacao
export const PUT = withAudit(PutAvaliacao, { acao: 'EDITAR_NOTA', entidade: 'AVALIACAO' })
export const DELETE = withAudit(DeleteAvaliacao, { acao: 'DELETAR_NOTA', entidade: 'AVALIACAO' })
