import { NextRequest, NextResponse } from 'next/server'
import { certificateService } from '@/services/certificateService'
import { withAudit } from '@/lib/withAudit'

async function PostBulkIssuer(req: NextRequest) {
    try {
        const { matriculaIds } = await req.json()

        if (!matriculaIds || !Array.isArray(matriculaIds)) {
            return NextResponse.json({ error: 'Array of matriculaIds is required' }, { status: 400 })
        }

        const results = []
        for (const id of matriculaIds) {
            try {
                const certificate = await certificateService.issueCertificate(id)
                const fullData = await certificateService.getCertificateData(id)
                const qrCode = await certificateService.generateQRCode(certificate.hash_validacao)
                results.push({ certificate, data: fullData, qrCode })
            } catch (err: any) {
                results.push({ error: err.message, matriculaId: id })
            }
        }

        return NextResponse.json({ results })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const POST = withAudit(PostBulkIssuer, { acao: 'EMITIR_LOTE', entidade: 'CERTIFICADO' })
