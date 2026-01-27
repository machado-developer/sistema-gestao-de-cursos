import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ message: 'Nenhum ficheiro enviado' }, { status: 400 })
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'empresa')

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true })

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = `logo-${Date.now()}.webp`
        const filePath = path.join(uploadDir, fileName)
        const publicUrl = `/uploads/empresa/${fileName}`

        // Process image with sharp: resize and convert to webp
        await sharp(buffer)
            .resize(800, 800, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toFile(filePath)

        // Update company record with new logoUrl
        const existing = await prisma.empresa.findFirst()
        if (existing) {
            await prisma.empresa.update({
                where: { id: existing.id },
                data: { logoUrl: publicUrl }
            })
        } else {
            await prisma.empresa.create({
                data: {
                    nome: "SGRH ANGOLA - ERP",
                    logoUrl: publicUrl
                }
            })
        }

        return NextResponse.json({ url: publicUrl })

    } catch (error: any) {
        console.error('Logo Upload Error:', error)
        return NextResponse.json({ message: 'Erro ao processar logotipo', error: error.message }, { status: 500 })
    }
}
