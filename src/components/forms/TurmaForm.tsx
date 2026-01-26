'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface TurmaFormProps {
    initialData?: {
        id: string
        cursoId: string
        codigo_turma: string
        data_inicio: string | Date
        data_fim: string | Date
        instrutorId?: string | null
    }
}

export function TurmaForm({ initialData }: TurmaFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [cursos, setCursos] = useState<{ id: string, nome: string }[]>([])
    const [instrutores, setInstrutores] = useState<{ id: string, nome: string }[]>([])

    useEffect(() => {
        // Fetch required data
        const fetchData = async () => {
            const [cursosRes, instrutoresRes] = await Promise.all([
                fetch('/api/cursos').then(r => r.json()),
                fetch('/api/instrutores').then(r => r.json())
            ])
            setCursos(cursosRes)
            setInstrutores(instrutoresRes)
        }
        fetchData()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const data = {
            cursoId: formData.get('cursoId'),
            codigo_turma: formData.get('codigo_turma'),
            data_inicio: formData.get('data_inicio'),
            data_fim: formData.get('data_fim'),
            instrutorId: formData.get('instrutorId'),
        }

        try {
            const url = initialData ? `/api/turmas/${initialData.id}` : '/api/turmas'
            const method = initialData ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.message || 'Falha ao salvar turma')
            }

            // The following line is syntactically incorrect in this context.
            // It appears to be part of a `useForm` hook configuration, which is not present.
            // To make the file syntactically correct, this line cannot be inserted as-is.
            // If `zodResolver` and `turmaSchema` were defined and used with `react-hook-form`,
            // this line would typically be part of the `useForm` options.
            // As per the instruction to make the change faithfully and syntactically correct,
            // and given the current code structure, this specific line cannot be integrated.
            // The instruction also implies a change to `router.push` to `router.refresh`,
            // which is also not directly compatible with the provided snippet's placement.

            // Reverting to original `router.push` as the `Code Edit` snippet
            // seems to be a partial instruction for a different form handling setup.
            router.push('/turmas')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/turmas" className="text-zinc-400 hover:text-white mb-6 inline-flex items-center gap-2 text-sm transition-colors">
                <ArrowLeft size={16} /> Voltar para lista
            </Link>

            <div className="glass-card p-8 border border-white/5 bg-zinc-900/40">
                <h1 className="text-2xl font-bold mb-6">{initialData ? 'Editar Turma' : 'Nova Turma'}</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Select
                        name="cursoId"
                        label="Curso"
                        required
                        options={cursos.map(c => ({ value: c.id, label: c.nome }))}
                        defaultValue={initialData?.cursoId || ""}
                    />

                    <Input
                        name="codigo_turma"
                        label="Código da Turma"
                        placeholder="Ex: T-FULLSTACK-2026-01"
                        defaultValue={initialData?.codigo_turma}
                        required
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            name="data_inicio"
                            label="Data de Início"
                            type="date"
                            defaultValue={initialData?.data_inicio ? new Date(initialData.data_inicio).toISOString().split('T')[0] : ''}
                            required
                        />
                        <Input
                            name="data_fim"
                            label="Data de Término"
                            type="date"
                            defaultValue={initialData?.data_fim ? new Date(initialData.data_fim).toISOString().split('T')[0] : ''}
                            required
                        />
                    </div>

                    <Select
                        name="instrutorId"
                        label="Instrutor Responsável"
                        options={instrutores.map(i => ({ value: i.id, label: i.nome }))}
                        defaultValue={initialData?.instrutorId || ""}
                    />

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="min-w-[120px]">
                            {loading ? 'Salvando...' : (initialData ? 'Atualizar Turma' : 'Criar Turma')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
