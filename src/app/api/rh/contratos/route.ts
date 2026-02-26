import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RHService } from "@/services/rhService";

export async function GET() {
    try {
        await RHService.verificarContratosExpirados();

        const contratos = await prisma.contrato.findMany({
            include: {
                funcionario: {
                    include: {
                        cargo: true,
                        departamento: true
                    }
                }
            },
            orderBy: {
                data_fim: 'asc'
            }
        });

        return NextResponse.json(contratos);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.funcionarioId || !body.tipo || !body.data_inicio || !body.salario_base) {
            return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });
        }

        const contrato = await prisma.contrato.create({
            data: {
                funcionarioId: body.funcionarioId,
                tipo: body.tipo,
                data_inicio: new Date(body.data_inicio),
                data_fim: body.data_fim ? new Date(body.data_fim) : null,
                renovacao_automatica: body.renovacao_automatica ?? false,
                status: "VIGENTE",
                salario_base: body.salario_base,
                subsidio_alimentacao: body.subsidio_alimentacao ?? 0,
                subsidio_transporte: body.subsidio_transporte ?? 0,
                subsidio_residencia: body.subsidio_residencia ?? 0,
                outros_subsidios: body.outros_subsidios ?? 0,
            }
        });

        return NextResponse.json(contrato);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
