import { UserService } from "@/services/userService";
import UtilizadoresClient from "./UtilizadoresClient";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function UtilizadoresPage() {
    const [users, profiles, modules] = await Promise.all([
        UserService.listarUtilizadores(),
        UserService.listarPerfis(),
        UserService.listarModulos()
    ]);

    const serializedUsers = serializePrisma(users);
    const serializedProfiles = serializePrisma(profiles);
    const serializedModules = serializePrisma(modules);

    return (
        <Suspense fallback={<TableSkeleton rows={8} columns={4} />}>
            <UtilizadoresClient
                initialUsers={serializedUsers}
                profiles={serializedProfiles}
                modules={serializedModules}
            />
        </Suspense>
    );
}
