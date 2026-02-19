import { ProfileService } from "@/services/profileService";
import PerfisClient from "./PerfisClient";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function PerfisPage() {
    const [profiles, modules] = await Promise.all([
        ProfileService.listarPerfis(),
        ProfileService.listarModulos()
    ]);

    const serializedProfiles = serializePrisma(profiles);
    const serializedModules = serializePrisma(modules);

    return (
        <Suspense fallback={<TableSkeleton rows={5} columns={3} />}>
            <PerfisClient
                initialProfiles={serializedProfiles}
                modules={serializedModules}
            />
        </Suspense>
    );
}
