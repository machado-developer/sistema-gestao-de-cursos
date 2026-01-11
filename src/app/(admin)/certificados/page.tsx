import { prisma } from '@/lib/prisma'
import { serializePrisma } from '@/lib/utils'
import { CertificadosClient } from './CertificadosClient'

export const dynamic = 'force-dynamic'

async function getEligibleMatriculas() {
    // We'll fetch all registrations that are in "Concluída" classes
    const data = await prisma.matricula.findMany({
        where: {
            turma: {
                status: 'Concluída'
            }
        },
        include: {
            aluno: true,
            certificate: true, // Check if already issued
            turma: {
                include: {
                    curso: {
                        include: {
                            certificateTemplate: true // Include template mapping
                        }
                    },
                    instrutor: true
                }
            }
        }
    })

    return serializePrisma(data)
}

export default async function CertificadosPage() {
    const matriculas = await getEligibleMatriculas()

    return <CertificadosClient initialMatriculas={matriculas} />
}
