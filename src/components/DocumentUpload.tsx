'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, Check, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface DocumentUploadProps {
    alunoId: string
    onUploadSuccess: (doc: any) => void
}

export function DocumentUpload({ alunoId, onUploadSuccess }: DocumentUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [selectedType, setSelectedType] = useState('Outro')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const docTypes = [
        { id: 'Foto', label: 'Foto de Perfil' },
        { id: 'BI', label: 'Bilhete de Identidade' },
        { id: 'Outro', label: 'Outro Documento' },
    ]

    const handleFile = async (file: File) => {
        if (!file) return

        // Basic validation
        if (file.size > 10 * 1024 * 1024) {
            toast.error('O ficheiro é demasiado grande. Máx. 10MB')
            return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('tipo', selectedType)
        formData.append('nome', file.name)

        try {
            const response = await fetch(`/api/alunos/${alunoId}/documentos`, {
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
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {docTypes.map(type => (
                    <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === type.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5'
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }}
                onClick={() => fileInputRef.current?.click()}
                className={`
                    h-48 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group
                    ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 hover:border-blue-500/50 hover:bg-white/5'}
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
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                        <p className="text-sm font-black text-blue-400 uppercase tracking-widest">A processar...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 rounded-full bg-blue-500/5 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                            <Upload size={28} />
                        </div>
                        <h4 className="font-black text-white text-lg">Arraste ou clique para enviar</h4>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter mt-1">Imagens ou PDF até 10MB</p>
                    </>
                )}
            </div>
        </div>
    )
}
