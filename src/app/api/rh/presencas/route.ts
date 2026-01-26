import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { funcionarioId, data, status, entrada, saida, horas_extras_50, horas_extras_100 } = body;

        const res = await RHService.registarPresenca({
            funcionarioId,
            data: new Date(data),
            status,
            entrada: entrada ? new Date(entrada) : undefined,
            saida: saida ? new Date(saida) : undefined,
            horas_extras_50,
            horas_extras_100
        });

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dataStr = searchParams.get("data");

        if (!dataStr) {
            return NextResponse.json({ error: "Data é obrigatória" }, { status: 400 });
        }

        const data = new Date(dataStr);
        // Ajustar para o início do dia para evitar problemas de fuso horário na busca
        data.setUTCHours(0, 0, 0, 0);

        const presencas = await RHService.listarPresencasPorData(data);
        return NextResponse.json(presencas);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
