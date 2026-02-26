import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const contrato = await prisma.contrato.findUnique({
            where: { id },
            include: { funcionario: { include: { cargo: true, departamento: true } } }
        });
        if (!contrato) return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
        return NextResponse.json(contrato);
    } catch (error: any) {
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

        const contrato = await prisma.contrato.update({
            where: { id },
            data: {
                tipo: body.tipo,
                data_inicio: new Date(body.data_inicio),
                data_fim: body.data_fim ? new Date(body.data_fim) : null,
                renovacao_automatica: body.renovacao_automatica ?? false,
                salario_base: body.salario_base,
                subsidio_alimentacao: body.subsidio_alimentacao ?? 0,
                subsidio_transporte: body.subsidio_transporte ?? 0,
                subsidio_residencia: body.subsidio_residencia ?? 0,
                outros_subsidios: body.outros_subsidios ?? 0,
            }
        });

        return NextResponse.json(contrato);
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
        await prisma.contrato.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();
        const contrato = await prisma.contrato.update({ where: { id }, data: { status } });
        return NextResponse.json(contrato);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
