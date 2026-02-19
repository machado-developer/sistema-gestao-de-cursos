import { prisma } from "@/lib/prisma";

export class ProfileService {
    static async listarPerfis() {
        return await prisma.profile.findMany({
            include: {
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
