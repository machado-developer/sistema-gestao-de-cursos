import { NextResponse } from 'next/server'
import { cursoService } from '@/services/cursoService'

export async function GET() {
    const cursos = await cursoService.findAll()
    return NextResponse.json(cursos)
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        // Basic validation: ensure number types where needed
        const cursoData = {
            ...data,
            carga_horaria: Number(data.carga_horaria),
            media_minima_aprovacao: Number(data.media_minima_aprovacao || 10),
            frequencia_minima: Number(data.frequencia_minima || 75),
            preco_base: data.preco_base
        }
        const curso = await cursoService.create(cursoData)
        return NextResponse.json(curso)
    } catch (error: any) {
        console.error('Error creating curso:', error)
        return NextResponse.json({
            error: 'Failed to create curso',
            details: error.message
        }, { status: 500 })
    }
}
