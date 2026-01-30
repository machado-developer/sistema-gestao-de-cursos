import { NextRequest, NextResponse } from 'next/server'
import { alunoService } from '@/services/alunoService'
import { alunoSchema } from '@/lib/schemas'
import { withAudit } from '@/lib/withAudit'

export async function GET() {
    try {
        const alunos = await alunoService.findAll()
        return NextResponse.json(alunos)
    } catch (error: any) {
        return NextResponse.json({ error: 'Erro ao listar alunos', message: error.message }, { status: 500 })
    }
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function POSTHandler(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user?.email ? await prisma.user.findUnique({ where: { email: session.user.email } }) : null

        const body = await request.json()

        const validation = alunoSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: 'Dados inválidos',
                message: 'Verifique os campos preenchidos.',
                details: validation.error.format()
            }, { status: 400 })
        }

        const { empresaId, data_nascimento, email, ...rest } = validation.data

        const createData: any = {
            ...rest,
            data_nascimento: new Date(data_nascimento),
            email: email || null,
        }

        if (empresaId) {
            createData.empresa = { connect: { id: empresaId } }
        }

        const aluno = await alunoService.create(createData, user?.id)

        return NextResponse.json(aluno)
    } catch (error: any) {
        if (error.code === 'P2002') { // Prisma Unique constraint failed
            return NextResponse.json({
                error: 'Registo duplicado',
                message: 'Já existe um aluno registado com este BI ou Email.'
            }, { status: 409 })
        }
        return NextResponse.json({
            error: 'Erro no servidor',
            message: 'Falha ao criar o registo do aluno.'
        }, { status: 500 })
    }
}

export const POST = withAudit(POSTHandler, { acao: 'CRIAR', entidade: 'ALUNO' })
