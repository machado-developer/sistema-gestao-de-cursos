
import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const funcionarioId = searchParams.get("funcionarioId") || undefined;
        const status = searchParams.get("status") || undefined;
        const mes = searchParams.get("mes") ? Number(searchParams.get("mes")) : undefined;
        const ano = searchParams.get("ano") ? Number(searchParams.get("ano")) : undefined;

        const descontos = await RHService.listarDescontos({
            funcionarioId,
            status,
            mes,
            ano
        });

        return NextResponse.json(descontos);
    } catch (error: any) {
        console.error("Erro ao listar descontos:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { funcionarioId, valor, mes_referencia, ano_referencia, tipo, motivo } = body;

        if (!funcionarioId || !valor || !mes_referencia || !ano_referencia) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const desconto = await RHService.registarDesconto({
            funcionarioId,
            valor,
            mes_referencia,
            ano_referencia,
            tipo,
            motivo
        });

        return NextResponse.json(desconto, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
