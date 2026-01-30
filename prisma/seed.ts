import { PrismaClient } from '../src/generated/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import path from 'path'

// Explicitly load .env from project root
dotenv.config({ path: path.join(process.cwd(), '.env') })

async function main() {
    const prisma = new PrismaClient()

    try {
        console.log("Iniciando seed...")
        const passwordHash = await bcrypt.hash('Newtech@2026...', 10)

        const admin = await prisma.user.upsert({
            where: { email: 'info@newtech-angola.com' },
            update: {},
            create: {
                email: 'info@newtech-angola.com',
                name: 'Admin NewTech',
                password: passwordHash,
                role: 'ADMIN',
            },
        })

        console.log("Admin seeded:", admin.email)

        // Default Certificate Template
        const templateMapping = [
            { "x": 100, "y": 250, "fontSize": 40, "align": "center", "path": "aluno.nome_completo", "bold": true, "italic": true, "color": "#004587" },
            { "x": 100, "y": 320, "fontSize": 16, "align": "center", "path": "aluno.bi_documento", "bold": true },
            { "x": 100, "y": 350, "fontSize": 16, "align": "center", "path": "turma.curso.nome", "bold": true },
            { "x": 700, "y": 450, "fontSize": 80, "path": "qrCode" },
            { "x": 100, "y": 480, "fontSize": 12, "align": "center", "path": "codigo_unico" }
        ]

        const defaultTemplate = await prisma.certificateTemplate.upsert({
            where: { id: 'default-template-id' },
            update: {
                mapping: JSON.stringify(templateMapping)
            },
            create: {
                id: 'default-template-id',
                nome: 'Modelo Padrão NewTech',
                imageUrl: '/certificate-bg.png',
                mapping: JSON.stringify(templateMapping),
                isDefault: true
            }
        })

        // Link existing cursos to this template if they don't have one
        await prisma.curso.updateMany({
            where: { certificateTemplateId: null },
            data: { certificateTemplateId: defaultTemplate.id }
        })

        console.log("Default template seeded and linked to courses.")
    } finally {
        await prisma.$disconnect()
    }
}

main().catch((e: any) => {
    console.error("ERRO NO SEED:", e)
    process.exit(1)
})
