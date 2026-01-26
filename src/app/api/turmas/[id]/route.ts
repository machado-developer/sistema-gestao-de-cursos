import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { turmaSchema } from '@/lib/schemas'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const turma = await prisma.turma.findUnique({
            where: { id }
        })

        if (!turma) {
            return NextResponse.json({ message: 'Turma não encontrada' }, { status: 404 })
        }

        return NextResponse.json(turma)
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar turma' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Convert strings to dates for Zod if needed (assuming schema expects strings or dates)
        const dataToValidate = {
            ...body,
            data_inicio: new Date(body.data_inicio),
            data_fim: new Date(body.data_fim),
        }

        const result = turmaSchema.safeParse(dataToValidate)

        if (!result.success) {
            console.error('Validation error:', result.error.flatten())
            return NextResponse.json(
                { message: 'Dados inválidos', errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const data = result.data

        const turma = await prisma.turma.update({
            where: { id },
            data: {
                cursoId: data.cursoId,
                codigo_turma: data.codigo_turma,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,

                instrutorId: body.instrutorId || null
            }
        })

        return NextResponse.json(turma)
    } catch (error: any) {
        console.error('Error updating turma:', error)
        return NextResponse.json({
            message: 'Erro ao atualizar turma',
            details: error.message
        }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const turma = await prisma.turma.findUnique({
            where: { id },
            include: { matriculas: true }
        })

        if (!turma) {
            return NextResponse.json({ message: 'Turma não encontrada' }, { status: 404 })
        }

        if (turma.matriculas.length > 0) {
            return NextResponse.json(
                { message: 'Não é possível excluir turma com matrículas associadas.' },
                { status: 400 }
            )
        }

        await prisma.turma.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Turma excluída com sucesso' })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao excluir turma' }, { status: 500 })
    }
}
