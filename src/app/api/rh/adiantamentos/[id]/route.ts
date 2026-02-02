
import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, observacao } = body;

        if (!status) {
            return NextResponse.json({ error: "Status é obrigatório" }, { status: 400 });
        }

        const validStatuses = ["PENDENTE", "APROVADO", "REJEITADO", "PROCESSADO"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "Status inválido" }, { status: 400 });
        }

        const adiantamento = await RHService.atualizarStatusAdiantamento(id, status, observacao);

        return NextResponse.json(adiantamento);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
