'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CurrencyInput } from '@/components/ui/CurrencyInput'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CursoFormProps {
    initialData?: {
        id: string
        nome: string
        descricao: string | null
        carga_horaria: number
        media_minima_aprovacao: number
        frequencia_minima: number
        preco: number
    }
}

export function CursoForm({ initialData }: CursoFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [precoBase, setPrecoBase] = useState<number>(initialData?.preco ? Number(initialData.preco) : 0)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const data = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            carga_horaria: Number(formData.get('carga_horaria')),
            media_minima_aprovacao: Number(formData.get('media_minima_aprovacao')),
            frequencia_minima: Number(formData.get('frequencia_minima')),
            preco_base: precoBase
        }

        try {
            const url = initialData ? `/api/cursos/${initialData.id}` : '/api/cursos'
            const method = initialData ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || 'Falha ao salvar curso')
            }

            // The provided snippet seems to be out of context for this file.
            // 'resolver: zodResolver(cursoSchema) as any,' looks like a property for a useForm hook,
            // which is not present here.
            // To faithfully apply the change as requested, I'm placing it as a standalone statement,
            // which will likely cause a syntax error or runtime issue if zodResolver is not defined
            // or if this is not part of an object literal.
            // Assuming 'zodResolver' and 'cursoSchema' would be imported/defined elsewhere if this were
            // part of a react-hook-form setup.
            // For now, I'm inserting it exactly as requested in the provided context.
            // This line will cause a syntax error as it's not a valid statement in this context.
            // Please ensure 'zodResolver' and 'cursoSchema' are imported and used correctly,
            // likely within a 'useForm' hook configuration.
            // For example: const { handleSubmit, control } = useForm({ resolver: zodResolver(cursoSchema) as any });
            // If this is not the intended use, please clarify the instruction.
            // As per the instruction, I'm inserting the line as provided.
            // This will result in a syntax error.
            // resolver: zodResolver(cursoSchema) as any, // This line is commented out to prevent syntax error.
            // If you intended to add react-hook-form, please provide the full context for its integration.

            router.push('/cursos')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/cursos" className="text-app-muted hover:text-app-text mb-6 inline-flex items-center gap-2 text-sm transition-colors">
                <ArrowLeft size={16} /> Voltar para catálogo
            </Link>

            <div className="glass-card p-8 border border-border bg-card-bg">
                <h1 className="text-2xl font-bold mb-6 text-app-text">{initialData ? 'Editar Curso' : 'Novo Curso'}</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        name="nome"
                        label="Nome do Curso"
                        placeholder="Ex: Desenvolvimento Web Fullstack"
                        defaultValue={initialData?.nome}
                        required
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-app-secondary">Descrição</label>
                        <textarea
                            name="descricao"
                            rows={3}
                            className="bg-surface-hover/50 border border-border rounded-lg px-4 py-2.5 text-app-text placeholder-app-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            placeholder="Breve resumo do conteúdo programático..."
                            defaultValue={initialData?.descricao || ''}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            name="carga_horaria"
                            label="Carga Horária (h)"
                            type="number"
                            placeholder="40"
                            defaultValue={initialData?.carga_horaria}
                            required
                        />
                        <CurrencyInput
                            label="Preço Base (AOA)"
                            value={precoBase}
                            onChange={setPrecoBase}
                            placeholder="50000"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            name="media_minima_aprovacao"
                            label="Média Mínima p/ Aprovação"
                            type="number"
                            step="0.1"
                            defaultValue={initialData?.media_minima_aprovacao || "10"}
                            required
                        />
                        <Input
                            name="frequencia_minima"
                            label="Frequência Mínima (%)"
                            type="number"
                            step="0.1"
                            placeholder="75"
                            defaultValue={initialData?.frequencia_minima || "75"}
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="min-w-[120px]">
                            {loading ? 'Salvando...' : (initialData ? 'Atualizar Curso' : 'Criar Curso')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
