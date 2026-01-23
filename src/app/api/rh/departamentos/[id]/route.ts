import { NextResponse } from "next/server";
import { RHService } from "@/services/rhService";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const dept = await RHService.atualizarDepartamento(params.id, body);
        return NextResponse.json(dept);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await RHService.eliminarDepartamento(params.id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
