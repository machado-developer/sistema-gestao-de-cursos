import DepartamentosClient from "./DepartamentosClient";
import { RHService } from "@/services/rhService";
import { serializePrisma } from "@/lib/utils";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export const dynamic = 'force-dynamic';

export default async function DepartamentosPage() {
    const depts = await RHService.listarDepartamentos();
    const serializedDepts = serializePrisma(depts);

    return (
        <Suspense fallback={<TableSkeleton rows={8} columns={4} />}>
            <DepartamentosClient initialDepts={serializedDepts} />
        </Suspense>
    );
}
