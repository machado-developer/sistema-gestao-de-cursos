import { NextRequest, NextResponse } from 'next/server'
import { avaliacaoService } from '@/services/avaliacaoService'
import { withAudit } from '@/lib/withAudit'

async function GetAvaliacoes(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const matriculaId = searchParams.get('matriculaId')
        const turmaId = searchParams.get('turmaId')

        if (matriculaId) {
            const avaliacoes = await avaliacaoService.findByMatricula(matriculaId)
            return NextResponse.json(avaliacoes)
        } else if (turmaId) {
            const avaliacoes = await avaliacaoService.findByTurma(turmaId)
            return NextResponse.json(avaliacoes)
        } else {
            return NextResponse.json(
                { error: 'matriculaId ou turmaId é obrigatório' },
                { status: 400 }
            )
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PostAvaliacao(req: NextRequest) {
    try {
        const body = await req.json()
        const { matriculaId, tipo, nota, peso, instrutorId, aulaId, observacao } = body

        if (!matriculaId || !tipo || nota === undefined) {
            return NextResponse.json(
                { error: 'matriculaId, tipo e nota são obrigatórios' },
                { status: 400 }
            )
        }

        const avaliacao = await avaliacaoService.lancarNota({
            matriculaId,
            tipo,
            nota: parseFloat(nota),
            peso: peso ? parseFloat(peso) : undefined,
            instrutorId,
            aulaId,
            observacao
        })

        return NextResponse.json(avaliacao, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const GET = GetAvaliacoes
export const POST = withAudit(PostAvaliacao, { acao: 'LANCAR_NOTA', entidade: 'AVALIACAO' })
