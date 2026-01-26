import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";
import { serializePrisma } from "@/lib/utils";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("API: GET funcionario ID:", id);
        const funcionario = await RHService.obterFuncionario(id);
        console.log("API: Result for ID:", funcionario ? "Found" : "Not Found");
        if (!funcionario) {
            return NextResponse.json({ error: "Colaborador não encontrado" }, { status: 404 });
        }
        return NextResponse.json(serializePrisma(funcionario));
    } catch (error: any) {
        console.error("API ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const funcionario = await RHService.atualizarFuncionario(id, body);
        return NextResponse.json(serializePrisma(funcionario));
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
        await RHService.eliminarFuncionario(id);
        return NextResponse.json({ message: "Colaborador removido com sucesso" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
