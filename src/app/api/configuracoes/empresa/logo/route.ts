import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'
import { uploadFile } from '@/lib/storage'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ message: 'Nenhum ficheiro enviado' }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer) as any as Buffer
        const fileName = `logo-${Date.now()}.webp`
        const storagePath = `uploads/empresa`

        // Process image with sharp: resize and convert to webp
        const processedBuffer = await sharp(buffer)
            .resize(800, 800, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toBuffer()

        // Use centralized storage utility
        const publicUrl = await uploadFile(processedBuffer, {
            path: storagePath,
            filename: fileName,
            contentType: 'image/webp'
        })

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
