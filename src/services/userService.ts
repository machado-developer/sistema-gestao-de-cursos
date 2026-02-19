import { prisma } from "@/lib/prisma";

export class UserService {
    static async listarUtilizadores() {
        return await prisma.user.findMany({
            include: {
                profile: true,
                permissions: {
                    include: { module: true }
                },
                itemPermissions: {
                    include: { moduleItem: true }
                }
            },
            orderBy: { name: 'asc' }
        });
    }

    static async listarPerfis() {
        return await prisma.profile.findMany({
            orderBy: { name: 'asc' }
        });
    }

    static async listarModulos() {
        return await prisma.module.findMany({
            include: {
                items: {
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });
    }
}
