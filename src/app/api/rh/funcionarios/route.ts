import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";
import { serializePrisma } from "@/lib/utils";

export async function GET() {
    try {
        // Garantir que contratos expirados são atualizados ou renovados
        await RHService.verificarContratosExpirados();

        const funcionarios = await RHService.listarFuncionarios();
        return NextResponse.json(serializePrisma(funcionarios));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const funcionario = await RHService.criarFuncionario(body);
        return NextResponse.json(funcionario, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
