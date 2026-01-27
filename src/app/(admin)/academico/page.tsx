import { AcademicService } from "@/services/academicService";
import { AcademicDashboardClient } from "./AcademicDashboardClient";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AcademicDashboardPage() {
    const stats = await AcademicService.getDashboardStats();

    return <AcademicDashboardClient data={serializePrisma(stats)} />;
}
