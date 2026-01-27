import { AcademicService } from "@/services/academicService";
import { AcademicReportsClient } from "./AcademicReportsClient";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AcademicReportsPage() {
    const data = await AcademicService.getAcademicReport();

    return <AcademicReportsClient data={serializePrisma(data)} />;
}
