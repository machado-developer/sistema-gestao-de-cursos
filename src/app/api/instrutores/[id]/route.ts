import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { instrutorSchema } from '@/lib/schemas'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const instrutor = await prisma.instrutor.findUnique({
            where: { id }
        })

        if (!instrutor) {
            return NextResponse.json({ message: 'Instrutor não encontrado' }, { status: 404 })
        }

        return NextResponse.json(instrutor)
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar instrutor' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const validation = instrutorSchema.safeParse(body)
        const result = instrutorSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: 'Dados inválidos', errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const data = result.data

        const instrutor = await prisma.instrutor.update({
            where: { id },
            data: {
                nome: data.nome,
                email: data.email,
                especialidade: data.especialidade,
                telefone: data.telefone,
                bi_documento: data.bi_documento,
                bio: data.bio,
                genero: data.genero
            }
        })

        return NextResponse.json(instrutor)
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao atualizar instrutor' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const instrutor = await prisma.instrutor.findUnique({
            where: { id },
            include: { turmas: true }
        })

        if (!instrutor) {
            return NextResponse.json({ message: 'Instrutor não encontrado' }, { status: 404 })
        }

        if (instrutor.turmas.length > 0) {
            return NextResponse.json(
                { message: 'Não é possível excluir instrutor vinculado a turmas.' },
                { status: 400 }
            )
        }

        await prisma.instrutor.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Instrutor excluído com sucesso' })
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao excluir instrutor' }, { status: 500 })
    }
}
