import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const profiles = await prisma.profile.findMany({
            include: {
                permissions: {
                    include: { module: true }
                },
                itemPermissions: {
                    include: { moduleItem: true }
                }
            }
        });
        return NextResponse.json(profiles);
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
        const { name, description, permissions, itemPermissions } = await req.json();

        const profile = await prisma.$transaction(async (tx) => {
            const newProfile = await tx.profile.create({
                data: {
                    name,
                    description
                }
            });

            if (permissions && Array.isArray(permissions)) {
                for (const p of permissions) {
                    await tx.profilePermission.create({
                        data: {
                            profileId: newProfile.id,
                            moduleId: p.moduleId,
                            canRead: p.canRead,
                            canWrite: p.canWrite
                        }
                    });
                }
            }

            if (itemPermissions && Array.isArray(itemPermissions)) {
                for (const ip of itemPermissions) {
                    await tx.profileItemPermission.create({
                        data: {
                            profileId: newProfile.id,
                            moduleItemId: ip.moduleItemId,
                            canRead: ip.canRead,
                            canWrite: ip.canWrite
                        }
                    });
                }
            }

            return newProfile;
        });

        return NextResponse.json(profile, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
