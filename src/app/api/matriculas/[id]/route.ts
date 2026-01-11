import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const { status_academico, estado_pagamento, media_final, percentual_frequencia } = body

        const matricula = await prisma.matricula.update({
            where: { id },
            data: {
                status_academico,
                estado_pagamento,
                media_final,
                percentual_frequencia
            }
        })

        return NextResponse.json(matricula)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update matricula' },
            { status: 500 }
        )
    }
}
