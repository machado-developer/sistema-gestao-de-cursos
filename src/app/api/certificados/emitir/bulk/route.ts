import { NextRequest, NextResponse } from 'next/server'
import { certificateService } from '@/services/certificateService'
import { withAudit } from '@/lib/withAudit'

async function PostBulkIssuer(req: NextRequest) {
    try {
        const { matriculaIds } = await req.json()

        if (!matriculaIds || !Array.isArray(matriculaIds)) {
            return NextResponse.json({ error: 'Array of matriculaIds is required' }, { status: 400 })
        }

        const bulkResults = await certificateService.issueCertificatesBulk(matriculaIds)
        const results = []

        for (const res of bulkResults) {
            const item = res as any
            if (item.error) {
                results.push({ error: item.error, matriculaId: item.matriculaId })
            } else {
                const qrCode = await certificateService.generateQRCode(item.certificate.hash_validacao)
                const fullData = await certificateService.getCertificateData(item.matriculaId)
                results.push({ certificate: item.certificate, data: fullData, qrCode })
            }
        }

        return NextResponse.json({ results })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const POST = withAudit(PostBulkIssuer, { acao: 'EMITIR_LOTE', entidade: 'CERTIFICADO' })
