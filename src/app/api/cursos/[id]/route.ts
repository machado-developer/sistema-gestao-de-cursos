import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cursoSchema } from '@/lib/schemas'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const curso = await prisma.curso.findUnique({
            where: { id }
        })

        if (!curso) {
            return NextResponse.json({ message: 'Curso não encontrado' }, { status: 404 })
        }

        return NextResponse.json(curso)
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar curso' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const result = cursoSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: 'Dados inválidos', errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const data = result.data

        const curso = await prisma.curso.update({
            where: { id },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                carga_horaria: data.carga_horaria,
                preco_base: data.preco
            }
        })

        return NextResponse.json(curso)
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar curso' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const curso = await prisma.curso.findUnique({
            where: { id },
            include: { turmas: true }
        })

        if (!curso) {
            return NextResponse.json({ message: 'Curso não encontrado' }, { status: 404 })
        }

        if (curso.turmas.length > 0) {
            return NextResponse.json(
                { message: 'Não é possível excluir curso com turmas associadas.' },
                { status: 400 }
            )
        }

        await prisma.curso.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Curso excluído com sucesso' })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao excluir curso' }, { status: 500 })
    }
}
