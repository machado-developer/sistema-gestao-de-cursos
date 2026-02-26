import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        const { ajustes } = await req.json();

        if (!ajustes || !Array.isArray(ajustes)) {
            return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
        }

        const result = await RHService.ajustarFolhaPagamento(
            id,
            ajustes,
            (session?.user as any)?.id
        );

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Erro ao ajustar folha:", error);
        return NextResponse.json(
            { error: error.message || "Erro interno ao processar ajuste" },
            { status: 500 }
        );
    }
}
