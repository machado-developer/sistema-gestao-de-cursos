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

        // Seeding Modules and Items
        const modules = [
            {
                key: 'gestao_cursos',
                name: 'Gestão de Cursos',
                description: 'Módulo de cursos, turmas e alunos',
                items: [
                    { key: 'cursos', name: 'Cursos' },
                    { key: 'turmas', name: 'Turmas' },
                    { key: 'alunos', name: 'Alunos' },
                    { key: 'matriculas', name: 'Matrículas' }
                ]
            },
            {
                key: 'financeiro_mod',
                name: 'Financeiro',
                description: 'Módulo financeiro e pagamentos',
                items: [
                    { key: 'pagamentos', name: 'Pagamentos' },
                    { key: 'faturacao', name: 'Faturação' },
                    { key: 'relatorios_fin', name: 'Relatórios Financeiros' }
                ]
            },
            {
                key: 'rh_mod',
                name: 'Recursos Humanos',
                description: 'Módulo de recursos humanos',
                items: [
                    { key: 'funcionarios', name: 'Funcionários' },
                    { key: 'processamento_salarial', name: 'Processamento Salarial' },
                    { key: 'ferias', name: 'Gestão de Férias' },
                    { key: 'adiantamentos', name: 'Adiantamentos' }
                ]
            },
            {
                key: 'sistema',
                name: 'Sistema',
                description: 'Configurações e auditoria',
                items: [
                    { key: 'utilizadores', name: 'Utilizadores' },
                    { key: 'perfis', name: 'Perfis e Permissões' },
                    { key: 'config_gerais', name: 'Configurações Gerais' },
                    { key: 'auditoria', name: 'Logs de Auditoria' }
                ]
            },
        ]

        const seededModules = []
        for (const mod of modules) {
            const m = await prisma.module.upsert({
                where: { key: mod.key },
                update: { name: mod.name, description: mod.description },
                create: {
                    key: mod.key,
                    name: mod.name,
                    description: mod.description
                },
            })

            // Seed Items for this Module
            for (const item of mod.items) {
                await prisma.moduleItem.upsert({
                    where: { key: item.key },
                    update: { name: item.name, moduleId: m.id },
                    create: {
                        key: item.key,
                        name: item.name,
                        moduleId: m.id
                    }
                })
            }

            seededModules.push(m)
            console.log(`Module seeded: ${mod.name} with ${mod.items.length} items`)
        }

        // Seeding Initial Profiles
        const profiles = [
            { name: 'Administrador', description: 'Acesso total ao sistema' },
            { name: 'Gestor Académico', description: 'Gestão de cursos e alunos' },
            { name: 'Financeiro', description: 'Gestão financeira' },
            { name: 'RH', description: 'Gestão de recursos humanos' },
        ]

        for (const prof of profiles) {
            const p = await prisma.profile.upsert({
                where: { name: prof.name },
                update: { description: prof.description },
                create: prof,
            })
            console.log(`Profile seeded: ${prof.name}`)

            // Add permissions based on profile
            if (prof.name === 'Administrador') {
                for (const mod of seededModules) {
                    await prisma.profilePermission.upsert({
                        where: { profileId_moduleId: { profileId: p.id, moduleId: mod.id } },
                        update: { canRead: true, canWrite: true },
                        create: { profileId: p.id, moduleId: mod.id, canRead: true, canWrite: true },
                    })
                }
                // Link admin user to Admin profile
                await prisma.user.update({
                    where: { id: admin.id },
                    data: { profileId: p.id }
                })
            } else if (prof.name === 'Gestor Académico') {
                const mod = seededModules.find(m => m.key === 'gestao_cursos')
                if (mod) {
                    await prisma.profilePermission.upsert({
                        where: { profileId_moduleId: { profileId: p.id, moduleId: mod.id } },
                        update: { canRead: true, canWrite: true },
                        create: { profileId: p.id, moduleId: mod.id, canRead: true, canWrite: true },
                    })
                }
            }
            // ... add other specific permissions if needed
        }

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
