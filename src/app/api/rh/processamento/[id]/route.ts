import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const folha = await RHService.obterFolhaPorId(params.id);
        if (!folha) {
            return NextResponse.json({ error: "Folha não encontrada" }, { status: 404 });
        }
        return NextResponse.json(folha);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
