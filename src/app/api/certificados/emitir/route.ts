import { NextRequest, NextResponse } from 'next/server'
import { certificateService } from '@/services/certificateService'
import { withAudit } from '@/lib/withAudit'

async function PostIssuer(req: NextRequest) {
    try {
        const { matriculaId } = await req.json()

        if (!matriculaId) {
            return NextResponse.json({ error: 'MatriculaId is required' }, { status: 400 })
        }

        const certificate = await certificateService.issueCertificate(matriculaId)
        const fullData = await certificateService.getCertificateData(matriculaId)
        const qrCode = await certificateService.generateQRCode(certificate.hash_validacao)

        return NextResponse.json({
            certificate,
            data: fullData,
            qrCode
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const POST = withAudit(PostIssuer, { acao: 'EMITIR', entidade: 'CERTIFICADO' })
