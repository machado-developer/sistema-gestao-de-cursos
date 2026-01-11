import { NextRequest, NextResponse } from 'next/server'
import { aulaService } from '@/services/aulaService'
import { withAudit } from '@/lib/withAudit'

async function GetAula(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const aula = await aulaService.getById(id)

        if (!aula) {
            return NextResponse.json({ error: 'Aula não encontrada' }, { status: 404 })
        }

        return NextResponse.json(aula)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PutAula(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()

        const aula = await aulaService.update(id, {
            data: body.data ? new Date(body.data) : undefined,
            tema: body.tema,
            tipo: body.tipo
        })

        return NextResponse.json(aula)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function DeleteAula(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await aulaService.delete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const GET = GetAula
export const PUT = withAudit(PutAula, { acao: 'ATUALIZAR_AULA', entidade: 'AULA' })
export const DELETE = withAudit(DeleteAula, { acao: 'DELETAR_AULA', entidade: 'AULA' })
