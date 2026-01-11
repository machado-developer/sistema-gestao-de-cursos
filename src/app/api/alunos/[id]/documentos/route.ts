import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { createAuditLog } from '@/lib/audit'

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const tipo = formData.get('tipo') as string // "Foto", "BI", "Outro"
        const nomeOriginal = formData.get('nome') as string

        if (!file) {
            return NextResponse.json({ message: 'Nenhum ficheiro enviado' }, { status: 400 })
        }

        const id = (await params).id
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'alunos', id)

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true })

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = `${Date.now()}-${tipo.toLowerCase()}.webp`
        const filePath = path.join(uploadDir, fileName)
        const publicUrl = `/uploads/alunos/${id}/${fileName}`

        // Optimized Image Processing with Sharp
        let processedImage = sharp(buffer)

        if (tipo === 'Foto') {
            // Square crop and resize for profile photo
            processedImage = processedImage
                .resize(400, 400, { fit: 'cover' })
                .webp({ quality: 80 })
        } else {
            // General optimization for documents
            const metadata = await processedImage.metadata()
            if (metadata.width && metadata.width > 1200) {
                processedImage = processedImage.resize(1200)
            }
            processedImage = processedImage.webp({ quality: 85 })
        }

        await processedImage.toFile(filePath)

        // Save record to database
        const documento = await prisma.documento.create({
            data: {
                alunoId: id,
                tipo,
                nome: nomeOriginal || file.name,
                url: publicUrl
            }
        })

        // Log the activity
        await createAuditLog({
            acao: 'UPLOAD_DOCUMENTO',
            entidade: 'ALUNO',
            detalhes: {
                alunoId: id,
                tipo,
                nome: documento.nome
            }
        })

        return NextResponse.json(documento)

    } catch (error: any) {
        console.error('Upload Error:', error)
        return NextResponse.json({ message: 'Erro ao processar ficheiro', error: error.message }, { status: 500 })
    }
}
