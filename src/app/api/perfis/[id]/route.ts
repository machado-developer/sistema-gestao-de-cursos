import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const profile = await prisma.profile.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: { module: true }
                },
                itemPermissions: {
                    include: { moduleItem: true }
                }
            }
        });

        if (!profile) {
            return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
        const { name, description, permissions, itemPermissions } = await req.json();

        const profile = await prisma.$transaction(async (tx) => {
            // Atualizar Perfil
            const updatedProfile = await tx.profile.update({
                where: { id },
                data: {
                    name,
                    description
                }
            });

            // Limpar permissões existentes
            await tx.profilePermission.deleteMany({ where: { profileId: id } });
            await tx.profileItemPermission.deleteMany({ where: { profileId: id } });

            // Criar novas permissões
            if (permissions && Array.isArray(permissions) && permissions.length > 0) {
                await tx.profilePermission.createMany({
                    data: permissions.map(p => ({
                        profileId: id,
                        moduleId: p.moduleId,
                        canRead: p.canRead,
                        canWrite: p.canWrite
                    }))
                });
            }

            if (itemPermissions && Array.isArray(itemPermissions) && itemPermissions.length > 0) {
                await tx.profileItemPermission.createMany({
                    data: itemPermissions.map(ip => ({
                        profileId: id,
                        moduleItemId: ip.moduleItemId,
                        canRead: ip.canRead,
                        canWrite: ip.canWrite
                    }))
                });
            }

            return updatedProfile;
        });

        return NextResponse.json(profile);
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

        // Verificar se é Admin (não permitir deletar)
        const profile = await prisma.profile.findUnique({ where: { id } });
        if (profile?.name === 'Administrador' || profile?.name === 'Admin') {
            return NextResponse.json({ error: "Não é possível eliminar o perfil de Administrador" }, { status: 400 });
        }

        await prisma.profile.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Perfil eliminado com sucesso" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
