import { NextResponse } from 'next/server'
import { certificateService } from '@/services/certificateService'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const matriculaId = searchParams.get('matriculaId')

    if (!matriculaId) {
        return NextResponse.json({ error: 'Matrícula ID is required' }, { status: 400 })
    }

    try {
        const data = await certificateService.getCertificateData(matriculaId)
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 403 })
    }
}
