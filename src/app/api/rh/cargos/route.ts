import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function GET() {
    try {
        const cargos = await RHService.listarCargos();
        return NextResponse.json(cargos);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cargo = await RHService.criarCargo(body);
        return NextResponse.json(cargo, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
