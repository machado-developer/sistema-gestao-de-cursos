'use client'

import { useState, useRef, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Upload, X, Check, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface DocumentUploadProps {
    entityId?: string
    entityType?: 'alunos' | 'rh/funcionarios'
    onUploadSuccess?: (doc: any) => void
    onFileSelect?: (file: File, type: string) => void
}

const DOC_TYPES_MAP = {
    'alunos': [
        { id: 'Foto', label: 'Foto de Perfil' },
        { id: 'BI', label: 'Bilhete de Identidade' },
        { id: 'Certificado', label: 'Certificado Escolar' },
        { id: 'Outro', label: 'Outro Documento' },
    ],
    'rh/funcionarios': [
        { id: 'Foto', label: 'Foto de Perfil' },
        { id: 'BI', label: 'BI / Passaporte' },
        { id: 'NIF', label: 'Cartão de NIF' },
        { id: 'INSS', label: 'Cartão INSS' },
        { id: 'Contrato', label: 'Contrato Assinado' },
        { id: 'Habilitações', label: 'Diploma / Certificado' },
        { id: 'CV', label: 'Currículo (CV)' },
        { id: 'Outro', label: 'Outro Documento' },
    ]
}

export function DocumentUpload({ entityId, entityType = 'alunos', onUploadSuccess, onFileSelect }: DocumentUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const docTypes = DOC_TYPES_MAP[entityType as keyof typeof DOC_TYPES_MAP] || DOC_TYPES_MAP['alunos']
    const [selectedType, setSelectedType] = useState(docTypes[0].id)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = async (file: File) => {
        if (!file) return

        // Basic validation
        if (file.size > 10 * 1024 * 1024) {
            toast.error('O ficheiro é demasiado grande. Máx. 10MB')
            return
        }

        if (onFileSelect) {
            onFileSelect(file, selectedType)
            return
        }

        if (!entityId || !onUploadSuccess) {
            toast.error('Configuração de upload incompleta.')
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('tipo', selectedType)
        formData.append('nome', file.name)

        try {
            const response = await fetch(`/api/${entityType}/${entityId}/documentos`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Erro no upload')

            const result = await response.json()
            toast.success('Documento carregado com sucesso!')
            onUploadSuccess(result)
        } catch (error) {
            toast.error('Erro ao carregar ficheiro. Tente novamente.')
            console.error(error)
        } finally {
            setIsUploading(false)
        }
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    return (
        <div className="space-y-4">
            <div className="max-w-xs">
                <Select
                    label="Tipo de Documento"
                    value={selectedType}
                    onChange={setSelectedType}
                    options={docTypes.map(t => ({ value: t.id, label: t.label }))}
                />
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }}
                onClick={() => fileInputRef.current?.click()}
                className={`
                    h-40 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group
                    ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-[var(--border-color)] dark:border-zinc-800 hover:border-blue-500/50 hover:bg-white/5'}
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={onFileChange}
                    accept="image/*,.pdf"
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">A processar...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center px-6">
                        <div className="w-12 h-12 rounded-full bg-blue-500/5 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all mb-3">
                            <Upload size={22} />
                        </div>
                        <h4 className="font-black text-white text-sm">Arraste ou clique para enviar</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight mt-1">Imagens ou PDF até 10MB</p>
                    </div>
                )}
            </div>
        </div>
    )
}
