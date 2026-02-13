import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const items = await prisma.moduleItem.findMany({
            include: {
                module: true
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, key, moduleId, description } = body;

        if (!name || !key || !moduleId) {
            return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });
        }

        const item = await prisma.moduleItem.create({
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
