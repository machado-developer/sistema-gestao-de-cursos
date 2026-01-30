import { NextRequest, NextResponse } from 'next/server'
import { prisma, PRISMA_VERSION_ID } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        console.log('API EmpresaCliente - Final Check - Hash:', PRISMA_VERSION_ID);
        const empresas = await prisma.empresaCliente.findMany({
            include: {
                _count: {
                    select: {
                        alunos: true,
                        matriculas: true
                    }
                },
                matriculas: {
                    select: {
                        valor_total: true,
                        valor_pago: true
                    }
                }
            },
            orderBy: { nome: 'asc' }
        })

        // Calculate totals for each company
        const processedEmpresas = empresas.map(empresa => {
            const totalToPay = empresa.matriculas.reduce((acc, m) => acc + Number(m.valor_total), 0)
            const totalPaid = empresa.matriculas.reduce((acc, m) => acc + Number(m.valor_pago), 0)

            return {
                ...empresa,
                totalToPay,
                totalPaid,
                balance: totalToPay - totalPaid
            }
        })

        return NextResponse.json(processedEmpresas)
    } catch (error: any) {
        console.error('API Error - GET empresas-clientes:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const empresa = await prisma.empresaCliente.create({
            data: {
                nome: data.nome,
                nif: data.nif,
                email: data.email,
                telefone: data.telefone,
                endereco: data.endereco,
                responsavel: data.responsavel
            }
        })
        return NextResponse.json(empresa)
    } catch (error: any) {
        console.error('API Error - POST empresas-clientes:', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
