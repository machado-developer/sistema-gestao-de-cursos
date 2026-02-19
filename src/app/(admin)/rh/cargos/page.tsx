import CargosClient from "./CargosClient";
import { RHService } from "@/services/rhService";
import { serializePrisma } from "@/lib/utils";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default async function CargosPage() {
    const [cargos, depts] = await Promise.all([
        RHService.listarCargos(),
        RHService.listarDepartamentos()
    ]);

    const serializedCargos = serializePrisma(cargos);
    const serializedDepts = serializePrisma(depts);

    return (
        <Suspense fallback={<TableSkeleton rows={8} columns={5} />}>
            <CargosClient
                initialCargos={serializedCargos}
                departamentos={serializedDepts}
            />
        </Suspense>
    );
}
