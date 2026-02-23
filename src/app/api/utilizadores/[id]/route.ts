import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    try {
        const { id } = await params;
        const { name, email, password, role, profileId, permissions, itemPermissions } = await req.json();

        const user = await prisma.$transaction(async (tx) => {
            const updateData: any = {
                name,
                email,
                role: role || 'USER',
                profileId: profileId || null
            };

            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await tx.user.update({
                where: { id },
                data: updateData
            });

            // Limpar permissões existentes
            await tx.userPermission.deleteMany({ where: { userId: id } });
            await tx.userItemPermission.deleteMany({ where: { userId: id } });

            // Criar novas permissões
            if (permissions && Array.isArray(permissions) && permissions.length > 0) {
                await tx.userPermission.createMany({
                    data: permissions.map(p => ({
                        userId: id,
                        moduleId: p.moduleId,
                        canRead: p.canRead,
                        canWrite: p.canWrite
                    }))
                });
            }

            if (itemPermissions && Array.isArray(itemPermissions) && itemPermissions.length > 0) {
                await tx.userItemPermission.createMany({
                    data: itemPermissions.map(ip => ({
                        userId: id,
                        moduleItemId: ip.moduleItemId,
                        canRead: ip.canRead,
                        canWrite: ip.canWrite
                    }))
                });
            }

            return updatedUser;
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    try {
        const { id } = await params;

        // Verificar se é o admin@admin.com (não permitir deletar)
        const user = await prisma.user.findUnique({ where: { id } });
        if (user?.email === 'admin@admin.com') {
            return NextResponse.json({ error: "Não é possível eliminar o utilizador base de sistema" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Utilizador eliminado com sucesso" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
