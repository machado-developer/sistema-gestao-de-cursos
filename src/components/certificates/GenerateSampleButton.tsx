import { PDFDownloadLink } from '@react-pdf/renderer'
import { DynamicCertificateDocument } from './DynamicCertificateDocument'
import { Button } from '@/components/ui/Button'
import { FileSearch, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function GenerateSampleButton() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const sampleData = [{
        id: 'sample-cert-id',
        aluno: {
            nome_completo: 'Gomes Domingos Bulo Quinanga',
            bi_documento: '007735864LA046'
        },
        turma: {
            data_inicio: '2023-10-07T00:00:00.000Z',
            data_fim: '2023-11-05T00:00:00.000Z',
            curso: {
                nome: 'Redes de Fibra óptica',
                carga_horaria: 120
            }
        },
        media_final: 18,
        codigo_unico: 'SAMPLE-VLD',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://newtech.com/validar/sample'
    }]

    // Sample mapping matching the professional NewTech layout
    const sampleTemplate = {
        imageUrl: '/certificate-bg.png',
        mapping: JSON.stringify([
            { "x": 100, "y": 250, "fontSize": 40, "align": "center", "path": "aluno.nome_completo", "bold": true, "italic": true, "color": "#004587" },
            { "x": 100, "y": 320, "fontSize": 16, "align": "center", "path": "aluno.bi_documento", "bold": true },
            { "x": 100, "y": 350, "fontSize": 16, "align": "center", "path": "turma.curso.nome", "bold": true },
            { "x": 700, "y": 450, "fontSize": 80, "path": "qrCode" },
            { "x": 100, "y": 480, "fontSize": 12, "align": "center", "path": "codigo_unico" }
        ])
    }

    if (!isClient) {
        return (
            <Button variant="secondary" className="gap-2">
                <FileSearch size={18} />
                Gerar Exemplar
            </Button>
        )
    }

    return (
        <PDFDownloadLink
            document={<DynamicCertificateDocument certificates={sampleData} template={sampleTemplate} />}
            fileName="certificado_exemplar.pdf"
        >
            {({ loading }) => (
                <Button
                    variant="secondary"
                    className="gap-2 hover:bg-zinc-800 border border-zinc-700 bg-zinc-900 text-zinc-300"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Gerando...
                        </>
                    ) : (
                        <>
                            <FileSearch size={18} />
                            Gerar Exemplar
                        </>
                    )}
                </Button>
            )}
        </PDFDownloadLink>
    )
}
