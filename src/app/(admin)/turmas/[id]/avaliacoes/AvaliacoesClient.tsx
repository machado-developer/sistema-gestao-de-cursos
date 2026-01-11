'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Plus, Edit3, Trash2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AvaliacoesClientProps {
    turma: any
}

export function AvaliacoesClient({ turma }: AvaliacoesClientProps) {
    const router = useRouter()
    const [selectedMatricula, setSelectedMatricula] = useState<any>(null)
    const [isAddingNota, setIsAddingNota] = useState(false)
    const [notaForm, setNotaForm] = useState({
        tipo: 'prova',
        nota: '',
        peso: '1.0',
        observacao: ''
    })
    const [isSaving, setIsSaving] = useState(false)

    const handleAddNota = async () => {
        if (!selectedMatricula) return

        setIsSaving(true)
        try {
            const res = await fetch('/api/avaliacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    matriculaId: selectedMatricula.id,
                    tipo: notaForm.tipo,
                    nota: parseFloat(notaForm.nota),
                    peso: parseFloat(notaForm.peso),
                    observacao: notaForm.observacao || undefined
                })
            })

            if (!res.ok) throw new Error('Erro ao lançar nota')

            toast.success('Nota lançada com sucesso!')
            setIsAddingNota(false)
            setNotaForm({ tipo: 'prova', nota: '', peso: '1.0', observacao: '' })
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteNota = async (avaliacaoId: string) => {
        if (!confirm('Deseja realmente deletar esta avaliação?')) return

        try {
            const res = await fetch(`/api/avaliacoes/${avaliacaoId}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error('Erro ao deletar avaliação')

            toast.success('Avaliação deletada com sucesso!')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Link href={`/turmas/${turma.id}`}>
                        <Button variant="ghost" className="mb-2 text-zinc-500 hover:text-white">
                            <ArrowLeft size={16} /> Voltar para Turma
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Gestão de Avaliações
                    </h1>
                    <p className="text-zinc-500 font-bold mt-1">
                        {turma.codigo_turma} - {turma.curso.nome}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Média Mínima</p>
                    <p className="text-3xl font-black text-blue-500">{turma.curso.media_minima_aprovacao}</p>
                </Card>
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Frequência Mínima</p>
                    <p className="text-3xl font-black text-orange-500">{turma.curso.frequencia_minima}%</p>
                </Card>
                <Card className="p-6 bg-card-bg border-border">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Alunos</p>
                    <p className="text-3xl font-black text-white">{turma.matriculas.length}</p>
                </Card>
            </div>

            <Card className="overflow-hidden border-border bg-card-bg shadow-2xl">
                <div className="p-6 border-b border-border">
                    <h2 className="font-black uppercase tracking-tight text-white">
                        Alunos e Avaliações
                    </h2>
                </div>
                <div className="divide-y divide-border">
                    {turma.matriculas.map((matricula: any) => (
                        <div key={matricula.id} className="p-6 hover:bg-white/5 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-white font-bold text-lg">{matricula.aluno.nome_completo}</p>
                                    <div className="flex items-center gap-4 mt-1">
                                        <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                                            BI: {matricula.aluno.bi_documento}
                                        </p>
                                        <span className={`text-sm font-black ${matricula.media_final >= turma.curso.media_minima_aprovacao
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}>
                                            Média: {matricula.media_final?.toFixed(1) || '0.0'}
                                        </span>
                                        <span className={`text-sm font-black ${(matricula.percentual_frequencia || 0) >= turma.curso.frequencia_minima
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}>
                                            Freq: {matricula.percentual_frequencia?.toFixed(0) || '0'}%
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => {
                                        setSelectedMatricula(matricula)
                                        setIsAddingNota(true)
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest"
                                >
                                    <Plus size={14} /> Lançar Nota
                                </Button>
                            </div>

                            {matricula.avaliacoes.length > 0 ? (
                                <div className="space-y-2">
                                    {matricula.avaliacoes.map((av: any) => (
                                        <Card key={av.id} className="p-4 bg-zinc-900 border-white/10">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${av.tipo === 'prova' ? 'bg-red-500/20 text-red-500' :
                                                            av.tipo === 'trabalho' ? 'bg-yellow-500/20 text-yellow-500' :
                                                                'bg-blue-500/20 text-blue-500'
                                                        }`}>
                                                        {av.tipo}
                                                    </span>
                                                    <div>
                                                        <p className="text-white font-bold">
                                                            Nota: {av.nota} | Peso: {av.peso}
                                                        </p>
                                                        {av.observacao && (
                                                            <p className="text-[10px] text-zinc-500 mt-1">{av.observacao}</p>
                                                        )}
                                                        <p className="text-[10px] text-zinc-600 mt-1">
                                                            {new Date(av.createdAt).toLocaleString('pt-PT')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteNota(av.id)}
                                                    className="text-red-500 hover:bg-red-500/10"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-600 text-sm italic">Nenhuma avaliação lançada</p>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Add Nota Modal */}
            {isAddingNota && selectedMatricula && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="max-w-md w-full p-8 space-y-6 bg-zinc-900 border-white/10 shadow-2xl">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Lançar Nota</h3>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                                {selectedMatricula.aluno.nome_completo}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Tipo</label>
                                <select
                                    value={notaForm.tipo}
                                    onChange={(e) => setNotaForm({ ...notaForm, tipo: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                >
                                    <option value="prova">Prova</option>
                                    <option value="trabalho">Trabalho</option>
                                    <option value="participacao">Participação</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Nota</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={notaForm.nota}
                                        onChange={(e) => setNotaForm({ ...notaForm, nota: e.target.value })}
                                        placeholder="Ex: 16.5"
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Peso</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={notaForm.peso}
                                        onChange={(e) => setNotaForm({ ...notaForm, peso: e.target.value })}
                                        placeholder="Ex: 2.0"
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Observação (opcional)</label>
                                <textarea
                                    value={notaForm.observacao}
                                    onChange={(e) => setNotaForm({ ...notaForm, observacao: e.target.value })}
                                    placeholder="Ex: Prova final do módulo"
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="ghost"
                                className="flex-1 uppercase text-[10px] font-black tracking-widest py-8 border-border"
                                onClick={() => {
                                    setIsAddingNota(false)
                                    setSelectedMatricula(null)
                                    setNotaForm({ tipo: 'prova', nota: '', peso: '1.0', observacao: '' })
                                }}
                                disabled={isSaving}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="flex-1 uppercase text-[10px] font-black tracking-widest py-8 bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleAddNota}
                                disabled={isSaving || !notaForm.nota}
                            >
                                <Save size={16} /> {isSaving ? 'Salvando...' : 'Salvar Nota'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}
