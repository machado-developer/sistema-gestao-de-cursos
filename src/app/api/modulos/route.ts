import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const modules = await prisma.module.findMany({
            include: {
                items: {
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(modules);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
