import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id
        const empresa = await prisma.empresaCliente.findUnique({
            where: { id },
            include: {
                alunos: true,
                matriculas: {
                    include: {
                        aluno: true,
                        turma: {
                            include: {
                                curso: true
                            }
                        }
                    }
                }
            }
        })

        if (!empresa) {
            return NextResponse.json({ message: 'Empresa não encontrada' }, { status: 404 })
        }

        const totalToPay = empresa.matriculas.reduce((acc, m) => acc + Number(m.valor_total), 0)
        const totalPaid = empresa.matriculas.reduce((acc, m) => acc + Number(m.valor_pago), 0)

        return NextResponse.json({
            ...empresa,
            totalToPay,
            totalPaid,
            balance: totalToPay - totalPaid
        })
    } catch (error: any) {
        console.error('API Error - GET empresa by ID:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id
        const data = await req.json()
        const empresa = await prisma.empresaCliente.update({
            where: { id },
            data
        })
        return NextResponse.json(empresa)
    } catch (error: any) {
        console.error('API Error - PATCH empresa:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id
        await prisma.empresaCliente.delete({
            where: { id }
        })
        return NextResponse.json({ message: 'Empresa removida com sucesso' })
    } catch (error: any) {
        console.error('API Error - DELETE empresa:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
