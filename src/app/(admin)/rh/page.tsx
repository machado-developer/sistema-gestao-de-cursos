import { RHService } from "@/services/rhService";
import { RHDashboardClient } from "./RHDashboardClient";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function RHDashboardPage() {
    const stats = await RHService.getDashboardStats();

    return <RHDashboardClient data={serializePrisma(stats)} />;
}
