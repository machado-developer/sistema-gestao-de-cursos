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
        console.log("Received funcionario data:", JSON.stringify(body, null, 2));
        const funcionario = await RHService.criarFuncionario(body);
        return NextResponse.json(funcionario, { status: 201 });
    } catch (error: any) {
        console.error("Error creating funcionario:", error);
        console.error("Error stack:", error.stack);
        return NextResponse.json({
            message: error.message,
            error: error.toString(),
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
