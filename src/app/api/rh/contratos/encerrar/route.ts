import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID do contrato é obrigatório" }, { status: 400 });
        }

        const contratoEncerrado = await RHService.encerrarContrato(id);
        return NextResponse.json(contratoEncerrado);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
