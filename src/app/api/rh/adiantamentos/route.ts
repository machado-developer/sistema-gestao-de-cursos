
import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const funcionarioId = searchParams.get("funcionarioId") || undefined;
        const status = searchParams.get("status") || undefined;
        const mes = searchParams.get("mes") ? Number(searchParams.get("mes")) : undefined;
        const ano = searchParams.get("ano") ? Number(searchParams.get("ano")) : undefined;

        const adiantamentos = await RHService.listarAdiantamentos({
            funcionarioId,
            status,
            mes,
            ano
        });

        return NextResponse.json(adiantamentos);
    } catch (error: any) {
        console.error("Erro ao listar adiantamentos:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { funcionarioId, valor, mes_referencia, ano_referencia, motivo } = body;

        if (!funcionarioId || !valor || !mes_referencia || !ano_referencia) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const adiantamento = await RHService.solicitarAdiantamento({
            funcionarioId,
            valor,
            mes_referencia,
            ano_referencia,
            motivo
        });

        return NextResponse.json(adiantamento, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
