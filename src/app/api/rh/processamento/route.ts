import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const mes = Number(searchParams.get("mes"));
        const ano = Number(searchParams.get("ano"));

        if (!mes || !ano) {
            return NextResponse.json({ error: "Mês e ano são obrigatórios" }, { status: 400 });
        }

        const relatorio = await RHService.obterRelatorioMensal(mes, ano);
        return NextResponse.json(relatorio);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { mes, ano } = await req.json();

        if (!mes || !ano) {
            return NextResponse.json({ error: "Mês e ano são obrigatórios" }, { status: 400 });
        }

        const resultados = await RHService.processarFolhaMensal(mes, ano);

        return NextResponse.json({
            mensagem: "Processamento concluído",
            count: resultados.length,
            resultados
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
