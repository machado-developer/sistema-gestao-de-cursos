import { NextRequest, NextResponse } from 'next/server'
import { aulaService } from '@/services/aulaService'
import { withAudit } from '@/lib/withAudit'

async function GetAulas(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const turmaId = searchParams.get('turmaId')
        const tipo = searchParams.get('tipo')

        const filters: any = {}
        if (turmaId) filters.turmaId = turmaId
        if (tipo) filters.tipo = tipo

        const aulas = await aulaService.findAll(filters)
        return NextResponse.json(aulas)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function PostAula(req: NextRequest) {
    try {
        const body = await req.json()
        const { turmaId, data, tema, tipo } = body

        if (!turmaId || !data || !tema) {
            return NextResponse.json(
                { error: 'turmaId, data e tema são obrigatórios' },
                { status: 400 }
            )
        }

        const aula = await aulaService.create({
            turmaId,
            data: new Date(data),
            tema,
            tipo
        })

        return NextResponse.json(aula, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const GET = GetAulas
export const POST = withAudit(PostAula, { acao: 'CRIAR_AULA', entidade: 'AULA' })
