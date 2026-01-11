import { NextResponse } from 'next/server'
import { turmaService } from '@/services/turmaService'

export async function GET() {
    // Check and auto-finalize any expired turmas "lazy load" style
    await turmaService.checkAndFinalizeExpiredTurmas()

    const turmas = await turmaService.findAll()
    return NextResponse.json(turmas)
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const turma = await turmaService.create({
            ...data,
            data_inicio: new Date(data.data_inicio),
            data_fim: new Date(data.data_fim)
        })
        return NextResponse.json(turma)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create turma' }, { status: 500 })
    }
}
