import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let empresa = await prisma.empresa.findFirst();

        if (!empresa) {
            // Create default entry if none exists
            empresa = await prisma.empresa.create({
                data: {
                    nome: "SGRH ANGOLA - ERP",
                    cidade: "Luanda",
                    pais: "Angola",
                    email: "RH@SGRH.CO.AO"
                }
            });
        }

        return NextResponse.json(empresa);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, ...data } = body;

        let empresa;
        if (id) {
            empresa = await prisma.empresa.update({
                where: { id },
                data
            });
        } else {
            // Find first and update or create
            const existing = await prisma.empresa.findFirst();
            if (existing) {
                empresa = await prisma.empresa.update({
                    where: { id: existing.id },
                    data
                });
            } else {
                empresa = await prisma.empresa.create({
                    data
                });
            }
        }

        return NextResponse.json(empresa);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
