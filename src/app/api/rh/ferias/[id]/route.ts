import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status, observacao } = body;

        const solicitacao = await prisma.feriasSolicitacao.update({
            where: { id },
            data: {
                status,
                ...(observacao && { observacao })
            },
            include: {
                funcionario: true
            }
        });

        // Se aprovado, poderíamos disparar lógica de atualização de saldo ou notificações aqui

        return NextResponse.json(solicitacao);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.feriasSolicitacao.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Solicitação eliminada com sucesso" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
