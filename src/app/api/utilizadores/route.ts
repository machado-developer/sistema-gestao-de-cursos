import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profileId: true,
                profile: { select: { name: true } },
                createdAt: true,
                permissions: {
                    include: { module: true }
                },
                itemPermissions: {
                    include: { moduleItem: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    try {
        const { name, email, password, role, profileId, permissions, itemPermissions, isSystemRoot } = await req.json();

        if (isSystemRoot || role === 'SUPER_ADMIN_ROOT') {
            return NextResponse.json({ error: "Operação não permitida." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email já registado" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: role || 'USER',
                    profileId: profileId || null
                }
            });

            if (permissions && Array.isArray(permissions) && permissions.length > 0) {
                await tx.userPermission.createMany({
                    data: permissions.map(p => ({
                        userId: newUser.id,
                        moduleId: p.moduleId,
                        canRead: p.canRead,
                        canWrite: p.canWrite
                    }))
                });
            }

            if (itemPermissions && Array.isArray(itemPermissions) && itemPermissions.length > 0) {
                await tx.userItemPermission.createMany({
                    data: itemPermissions.map(ip => ({
                        userId: newUser.id,
                        moduleItemId: ip.moduleItemId,
                        canRead: ip.canRead,
                        canWrite: ip.canWrite
                    }))
                });
            }

            return newUser;
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
