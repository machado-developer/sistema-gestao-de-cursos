import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'RH')) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    try {
        const { folhaIds, recipients } = await req.json();

        if (!folhaIds || !Array.isArray(folhaIds)) {
            return NextResponse.json({ error: "Lista de IDs inválida" }, { status: 400 });
        }

        const folhas = await prisma.folhaPagamento.findMany({
            where: { id: { in: folhaIds } },
            include: {
                funcionario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        const createdJobs = [];

        for (const folha of folhas) {
            // Check if there's an override email in recipients
            const override = recipients?.find((r: any) => r.folhaId === folha.id);
            const targetEmail = override?.email || folha.funcionario.email;

            if (!targetEmail) continue;

            const job = await prisma.emailJob.create({
                data: {
                    type: "SALARY_SLIP",
                    payload: JSON.stringify({
                        folhaId: folha.id,
                        recipientEmail: targetEmail,
                        recipientName: folha.funcionario.nome,
                        month: folha.mes,
                        year: folha.ano
                    }),
                    status: "PENDING"
                }
            });
            createdJobs.push(job);
        }

        return NextResponse.json({
            success: true,
            jobsCount: createdJobs.length,
            ignoredCount: folhaIds.length - createdJobs.length
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
