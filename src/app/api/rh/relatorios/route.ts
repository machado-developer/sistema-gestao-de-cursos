import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const mes = Number(searchParams.get("mes"));
        const ano = Number(searchParams.get("ano"));

        if (!mes || !ano || !type) {
            return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
        }

        let data;
        switch (type) {
            case "inss":
                data = await RHService.getRelatorioINSS(mes, ano);
                break;
            case "irt":
                data = await RHService.getRelatorioIRT(mes, ano);
                break;
            case "ferias":
                data = await RHService.getRelatorioFerias(mes, ano);
                break;
            case "faltas":
                data = await RHService.getRelatorioFaltas(mes, ano);
                break;
            default:
                return NextResponse.json({ error: "Tipo de relatório inválido" }, { status: 400 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
