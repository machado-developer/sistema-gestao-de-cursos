'use client'

import { useState } from 'react'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'
import { Button } from '@/components/ui/Button'
import { Printer, Loader2, Download, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface DownloadBulkButtonProps {
    matriculas: any[]
    disabled?: boolean
}

export function DownloadBulkButton({ matriculas, disabled }: DownloadBulkButtonProps) {
    const [isIssuing, setIsIssuing] = useState(false)
    const [bulkInfo, setBulkInfo] = useState<any[] | null>(null)

    const handleBulkIssue = async () => {
        setIsIssuing(true)
        try {
            const res = await fetch('/api/certificados/emitir/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matriculaIds: matriculas.map(m => m.id) })
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.error || 'Erro na emissão em lote')

            const issued = result.results.filter((r: any) => !r.error)
            setBulkInfo(issued)
            toast.success(`${issued.length} certificados emitidos com sucesso!`)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsIssuing(false)
        }
    }

    // Check if all selected are already issued in the initial data
    const allIssuedInitially = matriculas.length > 0 && matriculas.every(m => m.certificate)

    if (bulkInfo || allIssuedInitially) {
        const dataForPdf = bulkInfo || matriculas.map(m => ({
            certificate: m.certificate,
            data: m,
            qrCode: '' // In practice, we'd need to ensure QR codes are available or fetch them
        }))

        // We use the template of the first one (assuming same course for bulk or handle variation)
        const template = matriculas[0]?.turma?.curso?.certificateTemplate || { imageUrl: '/certificate-bg.png', mapping: '[]' }

        return (
            <Button
                variant="primary"
                disabled={disabled}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={() => DocumentService.generate(DocumentType.BULK_CERTIFICATES, ExportFormat.PDF, dataForPdf.map(item => ({
                    ...item.data,
                    qrCode: item.qrCode,
                    codigo_unico: item.certificate.codigo_unico
                })))}
            >
                <Download size={18} />
                BAIXAR LOTE ({matriculas.length})
            </Button>
        )
    }

    return (
        <Button
            variant="primary"
            disabled={disabled || isIssuing || matriculas.length === 0}
            onClick={handleBulkIssue}
            className="gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold"
        >
            {isIssuing ? (
                <>
                    <Loader2 className="animate-spin" size={18} />
                    PROCESSANDO...
                </>
            ) : (
                <>
                    <Printer size={18} />
                    EMITIR LOTE ({matriculas.length})
                </>
            )}
        </Button>
    )
}
