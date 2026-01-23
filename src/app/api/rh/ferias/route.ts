import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const solicitacoes = await prisma.feriasSolicitacao.findMany({
            include: {
                funcionario: {
                    include: {
                        cargo: true,
                        departamento: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(solicitacoes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { funcionarioId, data_inicio, data_fim, dias_uteis, tipo, observacao } = body;

        const solicitacao = await prisma.feriasSolicitacao.create({
            data: {
                funcionarioId,
                data_inicio: new Date(data_inicio),
                data_fim: new Date(data_fim),
                dias_uteis: Number(dias_uteis),
                ano_referencia: new Date(data_inicio).getFullYear(),
                tipo: tipo || "GOZO_FERIAS",
                status: "PENDENTE",
                observacao
            }
        });

        return NextResponse.json(solicitacao, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
