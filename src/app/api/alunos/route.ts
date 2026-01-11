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

async function POSTHandler(request: NextRequest) {
    try {
        const body = await request.json()

        const validation = alunoSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: 'Dados inválidos',
                message: 'Verifique os campos preenchidos.',
                details: validation.error.format()
            }, { status: 400 })
        }

        const aluno = await alunoService.create({
            ...validation.data,
            data_nascimento: new Date(validation.data.data_nascimento),
            email: validation.data.email || null,
        })

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
