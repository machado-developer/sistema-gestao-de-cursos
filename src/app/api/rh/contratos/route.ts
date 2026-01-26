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
