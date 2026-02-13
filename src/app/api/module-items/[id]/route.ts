import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, key, moduleId, description } = body;

        const item = await prisma.moduleItem.update({
            where: { id },
            data: {
                name,
                key,
                moduleId,
                description
            }
        });

        return NextResponse.json(item);
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
        await prisma.moduleItem.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Item removido com sucesso" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
