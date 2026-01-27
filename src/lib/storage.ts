import { put } from '@vercel/blob'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

interface UploadOptions {
    path: string
    filename: string
    contentType?: string
}

export async function uploadFile(buffer: Buffer, options: UploadOptions): Promise<string> {
    const isVercel = process.env.VERCEL === '1' || !!process.env.BLOB_READ_WRITE_TOKEN

    if (isVercel && process.env.BLOB_READ_WRITE_TOKEN) {
        // Upload to Vercel Blob
        const blob = await put(`${options.path}/${options.filename}`, buffer, {
            access: 'public',
            contentType: options.contentType,
            addRandomSuffix: true // Important for cache busting
        })
        return blob.url
    } else {
        // Local upload (Development)
        const uploadDir = path.join(process.cwd(), 'public', options.path)

        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Directory might already exist
        }

        const filePath = path.join(uploadDir, options.filename)
        await writeFile(filePath, buffer)

        return `/${options.path}/${options.filename}`
    }
}
