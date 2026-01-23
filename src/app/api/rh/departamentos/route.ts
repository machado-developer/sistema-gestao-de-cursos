import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET() {
    try {
        const depts = await RHService.listarDepartamentos();
        return NextResponse.json(depts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const dept = await RHService.criarDepartamento(body);
        return NextResponse.json(dept, { status: 201 });
    } catch (error: any) {
        console.error("Erro na criação de departamento:", error);
        let message = error.message;
        if (error.code === 'P2002') {
            message = "Já existe um departamento com este nome.";
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
