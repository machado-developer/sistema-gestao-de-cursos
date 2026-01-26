'use client'

import { useState, useEffect } from 'react'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'
import { Button } from '@/components/ui/Button'
import { Award, Loader2, Download, CheckCircle2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface DownloadCertificateButtonProps {
    matricula: any
}

export function DownloadCertificateButton({ matricula }: DownloadCertificateButtonProps) {
    const [isIssuing, setIsIssuing] = useState(false)
    const [certificateInfo, setCertificateInfo] = useState<{ certificate: any, data: any, qrCode: string } | null>(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleIssue = async () => {
        setIsIssuing(true)
        try {
            const res = await fetch('/api/certificados/emitir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matriculaId: matricula.id })
            })

            const result = await res.json()

            if (!res.ok) throw new Error(result.error || 'Erro ao emitir certificado')

            setCertificateInfo(result)
            toast.success('Certificado gerado com sucesso!')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsIssuing(false)
        }
    }

    // Determine if we have a certificate to show
    const currentCertificate = certificateInfo || (matricula.certificate ? {
        certificate: matricula.certificate,
        data: matricula,
        qrCode: '' // In a real scenario we'd need to fetch or reconstruct this
    } : null)

    if (currentCertificate) {
        if (!isClient) return null // Prevent SSR error

        // Resolve background image path to absolute URL if possible to ensure React-PDF can load it
        const getBackgroundUrl = () => {
            const bgPath = certificateInfo?.data?.turma?.curso?.certificateTemplate?.imageUrl || "/images/certificate-bg.png"
            if (bgPath.startsWith('http')) return bgPath
            return `${window.location.origin}${bgPath}`
        }

        const backgroundUrl = getBackgroundUrl()

        return (
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        className="flex-1 gap-2 font-black uppercase text-[10px] tracking-widest py-4 bg-green-600 hover:bg-green-700 border-green-500"
                        onClick={() => DocumentService.generate(DocumentType.CERTIFICATE, ExportFormat.PDF, currentCertificate.data, {
                            qrCode: currentCertificate.qrCode,
                            codigo_unico: currentCertificate.certificate.codigo_unico
                        })}
                    >
                        <Download size={14} /> BAIXAR
                    </Button>

                    <Button
                        variant="danger"
                        className="gap-2 font-black uppercase text-[10px] tracking-widest py-4 px-3"
                        disabled={isIssuing}
                        onClick={handleIssue}
                        title="Gerar Novamente (Sobrescrever)"
                    >
                        {isIssuing ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                    </Button>
                </div>
                <div className="flex justify-center items-center gap-1 text-[8px] font-black text-green-500 uppercase tracking-widest">
                    <CheckCircle2 size={10} /> Emitido em {new Date(currentCertificate.certificate.data_emissao).toLocaleDateString()}
                </div>
            </div>
        )
    }

    return (
        <Button
            variant="secondary"
            className="w-full gap-2 font-black uppercase text-[10px] tracking-widest py-6"
            disabled={isIssuing}
            onClick={handleIssue}
        >
            {isIssuing ? (
                <>
                    <Loader2 className="animate-spin" size={14} />
                    PROCESSANDO...
                </>
            ) : (
                <>
                    <Award size={14} />
                    EMITIR CERTIFICADO
                </>
            )}
        </Button>
    )
}
