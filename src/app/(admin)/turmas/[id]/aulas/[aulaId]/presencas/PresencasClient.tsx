'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, XCircle, ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PresencasClientProps {
    aula: any
}

export function PresencasClient({ aula }: PresencasClientProps) {
    const router = useRouter()
    const [presencas, setPresencas] = useState<Record<string, 'Presente' | 'Ausente'>>(() => {
        const initial: Record<string, 'Presente' | 'Ausente'> = {}
        aula.presencas.forEach((p: any) => {
            initial[p.alunoId] = p.status
        })
        // Default all students to Presente if not marked
        aula.turma.matriculas.forEach((m: any) => {
            if (!initial[m.alunoId]) {
                initial[m.alunoId] = 'Presente'
            }
        })
        return initial
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'Todos' | 'Presente' | 'Ausente'>('Todos')
    const [isSaving, setIsSaving] = useState(false)

    const togglePresenca = (alunoId: string) => {
        setPresencas(prev => ({
            ...prev,
            [alunoId]: prev[alunoId] === 'Presente' ? 'Ausente' : 'Presente'
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const presencasArray = Object.entries(presencas).map(([alunoId, status]) => ({
                alunoId,
                status
            }))

            const res = await fetch(`/api/aulas/${aula.id}/presencas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ presencas: presencasArray })
            })

            if (!res.ok) throw new Error('Erro ao salvar presenças')

            toast.success('Presenças salvas com sucesso!')
            router.push(`/turmas/${aula.turmaId}`)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    const totalPresentes = Object.values(presencas).filter(p => p === 'Presente').length
    const totalAusentes = Object.values(presencas).filter(p => p === 'Ausente').length

    const filteredMatriculas = aula.turma.matriculas.filter((matricula: any) => {
        const matchesSearch = matricula.aluno.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
        const status = presencas[matricula.alunoId]
        const matchesStatus = statusFilter === 'Todos' || status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Link href={`/turmas/${aula.turmaId}`}>
                        <Button variant="ghost" className="mb-2 text-zinc-500 hover:text-white">
                            <ArrowLeft size={16} /> Voltar para Turma
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Marcar Presenças
                    </h1>
                    <p className="text-zinc-500 font-bold mt-1">
                        {aula.tema} - {new Date(aula.data).toLocaleDateString('pt-PT')}
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest px-8 h-[52px]"
                >
                    <Save size={16} /> {isSaving ? 'Salvando...' : 'Salvar Presenças'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Alunos</p>
                    <p className="text-3xl font-black text-white">{aula.turma.matriculas.length}</p>
                </Card>
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Presentes</p>
                    <p className="text-3xl font-black text-green-500">{totalPresentes}</p>
                </Card>
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Ausentes</p>
                    <p className="text-3xl font-black text-red-500">{totalAusentes}</p>
                </Card>
            </div>

            <Card className="overflow-hidden border-border bg-card-bg shadow-2xl">
                <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="font-black uppercase tracking-tight text-white">
                        Lista de Chamada
                    </h2>
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="Todos">Todos</option>
                            <option value="Presente">Presentes</option>
                            <option value="Ausente">Ausentes</option>
                        </select>
                    </div>
                </div>
                <div className="divide-y divide-border">
                    {filteredMatriculas.length === 0 ? (
                        <div className="p-6 text-center text-zinc-500 font-bold">
                            Nenhum aluno encontrado com os filtros selecionados.
                        </div>
                    ) : (
                        filteredMatriculas.map((matricula: any) => {
                            const status = presencas[matricula.alunoId]
                            const isPresente = status === 'Presente'

                            return (
                                <div
                                    key={matricula.id}
                                    className="p-6 hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <p className="text-white font-bold">{matricula.aluno.nome_completo}</p>
                                        <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                                            BI: {matricula.aluno.bi_documento}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={() => togglePresenca(matricula.alunoId)}
                                            className={`font-black uppercase text-[10px] tracking-widest px-8 h-[48px] ${isPresente
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-red-600 hover:bg-red-700 text-white'
                                                }`}
                                        >
                                            {isPresente ? (
                                                <>
                                                    <CheckCircle2 size={16} /> Presente
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={16} /> Ausente
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </Card>
        </div>
    )
}
