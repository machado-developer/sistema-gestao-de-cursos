import { NextRequest, NextResponse } from 'next/server'
import { matriculaService } from '@/services/matriculaService'
import { withAudit } from '@/lib/withAudit'

async function PutNotas(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { notas } = await req.json()

        if (!Array.isArray(notas)) {
            return NextResponse.json({ error: 'Notas must be an array of numbers' }, { status: 400 })
        }

        const updated = await matriculaService.updateNotas(id, notas)

        return NextResponse.json(updated)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const PUT = withAudit(PutNotas, { acao: 'ATUALIZAR_NOTAS', entidade: 'MATRICULA' })
