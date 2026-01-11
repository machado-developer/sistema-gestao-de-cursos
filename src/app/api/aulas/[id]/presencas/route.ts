import { NextRequest, NextResponse } from 'next/server'
import { presencaService } from '@/services/presencaService'
import { withAudit } from '@/lib/withAudit'

async function GetPresencas(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: aulaId } = await params
        const presencas = await presencaService.findByAula(aulaId)
        return NextResponse.json(presencas)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PostPresencas(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: aulaId } = await params
        const { presencas } = await req.json()

        if (!Array.isArray(presencas)) {
            return NextResponse.json(
                { error: 'presencas deve ser um array' },
                { status: 400 }
            )
        }

        const result = await presencaService.marcarPresencasEmLote(aulaId, presencas)
        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PutPresenca(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: aulaId } = await params
        const { alunoId, status } = await req.json()

        if (!alunoId || !status) {
            return NextResponse.json(
                { error: 'alunoId e status são obrigatórios' },
                { status: 400 }
            )
        }

        const presenca = await presencaService.marcarPresenca({
            aulaId,
            alunoId,
            status
        })

        return NextResponse.json(presenca)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const GET = GetPresencas
export const POST = withAudit(PostPresencas, { acao: 'MARCAR_PRESENCAS', entidade: 'PRESENCA' })
export const PUT = withAudit(PutPresenca, { acao: 'ATUALIZAR_PRESENCA', entidade: 'PRESENCA' })
