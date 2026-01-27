'use server'

import { AcademicService } from "@/services/academicService"
import { serializePrisma } from "@/lib/utils"

export async function getTurmaForReport(turmaId: string) {
    const data = await AcademicService.getTurmaWithStudents(turmaId);
    return serializePrisma(data);
}
