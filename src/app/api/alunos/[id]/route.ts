import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { alunoSchema } from '@/lib/schemas'
import { withAudit } from '@/lib/withAudit'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const aluno = await prisma.aluno.findUnique({
            where: { id },
            include: {
                matriculas: true
            }
        })

        if (!aluno) {
            return NextResponse.json(
                { message: 'Aluno não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(aluno)
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao buscar aluno' },
            { status: 500 }
        )
    }
}

async function PUTHandler(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Validate with Zod
        const result = alunoSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: 'Dados inválidos', errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const data = result.data

        // Check if BI already exists for ANOTHER student
        const existingAluno = await prisma.aluno.findUnique({
            where: { bi_documento: data.bi_documento }
        })

        if (existingAluno && existingAluno.id !== id) {
            return NextResponse.json(
                { message: 'Já existe um aluno com este número de BI' },
                { status: 409 }
            )
        }

        const { empresaId, data_nascimento, ...rest } = result.data

        const updateData: any = {
            ...rest,
            data_nascimento: new Date(data_nascimento)
        }

        if (empresaId) {
            updateData.empresa = { connect: { id: empresaId } }
        } else {
            updateData.empresa = { disconnect: true }
        }

        const aluno = await prisma.aluno.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json(aluno)
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error)
        return NextResponse.json(
            { message: 'Erro ao atualizar aluno' },
            { status: 500 }
        )
    }
}

async function DELETEHandler(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Check for enrollment dependencies
        const aluno = await prisma.aluno.findUnique({
            where: { id },
            include: { matriculas: true }
        })

        if (!aluno) {
            return NextResponse.json({ message: 'Aluno não encontrado' }, { status: 404 })
        }

        if (aluno.matriculas.length > 0) {
            return NextResponse.json(
                { message: 'Não é possível excluir aluno com matrículas ativas.' },
                { status: 400 }
            )
        }

        await prisma.aluno.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Aluno excluído com sucesso' })
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao excluir aluno' },
            { status: 500 }
        )
    }
}

export const PUT = withAudit(PUTHandler, { acao: 'ATUALIZAR', entidade: 'ALUNO' })
export const DELETE = withAudit(DELETEHandler, { acao: 'ELIMINAR', entidade: 'ALUNO' })
