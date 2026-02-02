
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

        const desconto = await RHService.atualizarStatusDesconto(id, status, observacao);

        return NextResponse.json(desconto);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
