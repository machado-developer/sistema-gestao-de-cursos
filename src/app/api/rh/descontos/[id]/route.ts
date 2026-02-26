
import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Se houver apenas status e observação, usamos atualizarStatusDesconto
        // Caso contrário, se for uma edição completa, usamos atualizarDesconto
        if (Object.keys(body).length <= 2 && (body.status || body.observacao)) {
            const { status, observacao } = body;
            const desconto = await RHService.atualizarStatusDesconto(id, status, observacao);
            return NextResponse.json(desconto);
        }

        const desconto = await RHService.atualizarDesconto(id, body);
        return NextResponse.json(desconto);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const desconto = await RHService.atualizarDesconto(id, body);
        return NextResponse.json(desconto);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await RHService.eliminarDesconto(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
