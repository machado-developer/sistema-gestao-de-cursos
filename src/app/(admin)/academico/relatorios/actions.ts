'use server'

import { AcademicService } from "@/services/academicService"
import { serializePrisma } from "@/lib/utils"

export async function getTurmaForReport(turmaId: string) {
    const data = await AcademicService.getTurmaWithStudents(turmaId);
    return serializePrisma(data);
}

export async function getGeneralStudentList() {
    const students = await AcademicService.getGeneralStudentList();
    return serializePrisma(students);
}

export async function getEnrollmentMap() {
    const enrollments = await AcademicService.getEnrollmentMap();
    return serializePrisma(enrollments);
}
