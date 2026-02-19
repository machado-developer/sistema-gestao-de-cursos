import { RHService } from "@/services/rhService";
import FuncionariosClient from "./FuncionariosClient";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function FuncionariosPage() {
    // Parallelize data fetching on the server
    const [funcionarios, depts, cargos] = await Promise.all([
        RHService.listarFuncionarios(),
        RHService.listarDepartamentos(),
        RHService.listarCargos()
    ]);

    // Serialize data for Client Component (especially Prisma Decimals and Dates)
    const serializedFuncionarios = serializePrisma(funcionarios);
    const serializedDepts = serializePrisma(depts);
    const serializedCargos = serializePrisma(cargos);

    return (
        <Suspense fallback={<TableSkeleton rows={8} columns={6} />}>
            <FuncionariosClient
                initialFuncionarios={serializedFuncionarios}
                departamentos={serializedDepts}
                cargos={serializedCargos}
            />
        </Suspense>
    );
}
