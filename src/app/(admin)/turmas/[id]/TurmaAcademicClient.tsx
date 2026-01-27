'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import {
    GraduationCap, User, Calendar, BookOpen, Plus, Edit3, Trash2,
    CheckCircle2, XCircle, Award, ClipboardList, BarChart3, Download
} from 'lucide-react'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EditMatriculaModal } from '@/components/modals/EditMatriculaModal'

interface TurmaAcademicClientProps {
    turma: any
    aulas: any[]
}

export function TurmaAcademicClient({ turma, aulas: initialAulas }: TurmaAcademicClientProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('alunos')
    const [aulas, setAulas] = useState(initialAulas)
    const [isCreatingAula, setIsCreatingAula] = useState(false)
    const [selectedAula, setSelectedAula] = useState<any>(null)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

    // Edit Matricula State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedMatricula, setSelectedMatricula] = useState<any>(null)

    // Aula form state
    const [aulaForm, setAulaForm] = useState({
        data: '',
        tema: '',
        tipo: 'normal'
    })

    const handleUpdateStatus = async (newStatus: string) => {
        if (!confirm(`Deseja realmente alterar o status da turma para "${newStatus}"?`)) return

        setIsUpdatingStatus(true)
        try {
            const res = await fetch(`/api/turmas/${turma.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...turma,
                    status: newStatus
                })
            })

            if (!res.ok) throw new Error('Erro ao atualizar status da turma')

            toast.success(`Turma ${newStatus} com sucesso!`)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const handleCreateAula = async () => {
        try {
            const res = await fetch('/api/aulas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    turmaId: turma.id,
                    data: new Date(aulaForm.data).toISOString(),
                    tema: aulaForm.tema,
                    tipo: aulaForm.tipo
                })
            })

            if (!res.ok) throw new Error('Erro ao criar aula')

            const newAula = await res.json()
            setAulas([...aulas, newAula])
            setIsCreatingAula(false)
            setAulaForm({ data: '', tema: '', tipo: 'normal' })
            toast.success('Aula criada com sucesso!')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleDeleteAula = async (aulaId: string) => {
        if (!confirm('Deseja realmente deletar esta aula?')) return

        try {
            const res = await fetch(`/api/aulas/${aulaId}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error('Erro ao deletar aula')

            setAulas(aulas.filter(a => a.id !== aulaId))
            toast.success('Aula deletada com sucesso!')
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const tabs = [
        { id: 'alunos', label: 'Alunos', icon: <User size={16} /> },
        { id: 'aulas', label: 'Aulas', icon: <BookOpen size={16} /> },
        { id: 'relatorio', label: 'Relatório', icon: <BarChart3 size={16} /> }
    ]

    const handleExportPauta = async () => {
        const columns = ["Estudante", "BI", "Média Final", "Frequência", "Estado Pagamento", "Status Académico"];
        const data = turma.matriculas.map((m: any) => [
            m.aluno.nome_completo,
            m.aluno.bi_documento,
            m.media_final?.toFixed(1) || '0.0',
            `${m.percentual_frequencia?.toFixed(0) || '0'}%`,
            m.estado_pagamento,
            m.status_academico
        ]);

        await DocumentService.generate(DocumentType.ACADEMIC_PAUTA, ExportFormat.PDF, data, {
            title: `PAUTA ACADÉMICA - ${turma.codigo_turma} - ${turma.curso.nome}`,
            columns,
            filename: `pauta_${turma.codigo_turma.replace(/\s+/g, '_')}`
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-blue-500 mb-1">
                        <GraduationCap size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Gestão Académica</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        {turma.codigo_turma} - {turma.curso.nome}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    {turma.status !== 'Concluída' ? (
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-widest px-8 h-[52px]"
                            onClick={() => handleUpdateStatus('Concluída')}
                            disabled={isUpdatingStatus}
                        >
                            {isUpdatingStatus ? 'Processando...' : 'Finalizar Turma'}
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            className="font-black uppercase text-[10px] tracking-widest px-8 h-[52px]"
                            onClick={() => handleUpdateStatus('Em Andamento')}
                            disabled={isUpdatingStatus}
                        >
                            Reabrir Turma
                        </Button>
                    )}
                    <Link href={`/turmas/${turma.id}/editar`}>
                        <Button variant="outline" className="font-black uppercase text-[10px] tracking-widest px-8 h-[52px]">
                            Editar Turma
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 bg-card-bg border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Instrutor</p>
                            <p className="text-white font-black uppercase">{turma.instrutor?.nome || 'Não atribuído'}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-card-bg border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Período</p>
                            <p className="text-white font-black uppercase text-sm">
                                {new Date(turma.data_inicio).toLocaleDateString()} - {new Date(turma.data_fim).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-card-bg border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Aulas / Status</p>
                            <p className="text-white font-black uppercase">{aulas.length} Aulas / {turma.status}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-card-bg border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                            <ClipboardList size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Alunos</p>
                            <p className="text-white font-black uppercase">{turma.matriculas.length} Matriculados</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'alunos' && (
                <Card className="overflow-hidden border-border bg-card-bg shadow-2xl">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <h2 className="font-black uppercase tracking-tight text-white flex items-center gap-2">
                            Lista de Estudantes ({turma.matriculas.length})
                        </h2>
                        <Link href={`/turmas/${turma.id}/avaliacoes`}>
                            <Button variant="ghost" size="sm" className="text-blue-500 gap-1 text-[10px] font-black uppercase hover:bg-blue-500/10 transition-colors">
                                <ClipboardList size={14} /> Lançar Notas
                            </Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-950/50">
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estudante</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Média</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Frequência</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Pagamento</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {turma.matriculas.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <p className="text-zinc-500 font-bold mb-2">Nenhum aluno matriculado nesta turma</p>
                                            <Link href="/matriculas/novo" className="text-blue-500 hover:text-blue-400 text-sm">
                                                Criar primeira matrícula
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    turma.matriculas.map((m: any) => (
                                        <tr key={m.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <p className="text-white font-bold">{m.aluno.nome_completo}</p>
                                                <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                                                    BI: {m.aluno.bi_documento}
                                                    {m.aluno.bolseiro && (
                                                        <span className="ml-2 text-yellow-500">★ BOLSEIRO</span>
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`text-sm font-black ${m.media_final >= turma.curso.media_minima_aprovacao ? 'text-green-500' : 'text-red-500'}`}>
                                                    {m.media_final?.toFixed(1) || '0.0'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`text-sm font-black ${(m.percentual_frequencia || 0) >= turma.curso.frequencia_minima ? 'text-green-500' : 'text-red-500'}`}>
                                                    {m.percentual_frequencia?.toFixed(0) || '0'}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-[10px] font-black uppercase px-2.5 py-1 border ${m.estado_pagamento === 'Pago' || m.estado_pagamento === 'Isento'
                                                    ? 'text-green-500 border-green-500/20 bg-green-500/10'
                                                    : 'text-orange-500 border-orange-500/20 bg-orange-500/10'
                                                    }`}>
                                                    {m.estado_pagamento}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                {m.status_academico === 'Aprovado' ? (
                                                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-green-500 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full w-fit">
                                                        <CheckCircle2 size={10} strokeWidth={3} /> Aprovado
                                                    </span>
                                                ) : m.status_academico === 'Reprovado' ? (
                                                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full w-fit">
                                                        <XCircle size={10} strokeWidth={3} /> Reprovado
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full w-fit">
                                                        Cursando
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-right flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-[10px] font-black uppercase"
                                                    onClick={() => {
                                                        setSelectedMatricula(m)
                                                        setIsEditModalOpen(true)
                                                    }}
                                                >
                                                    <Edit3 size={14} />
                                                </Button>
                                                <Link href={`/alunos/${m.aluno.id}/historico`}>
                                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">
                                                        Ver Detalhes
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {selectedMatricula && (
                <EditMatriculaModal
                    matricula={selectedMatricula}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {activeTab === 'aulas' && (
                <div className="space-y-6">
                    <Card className="p-6 bg-card-bg border-border">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-black uppercase tracking-tight text-white">Aulas da Turma</h2>
                            <Button
                                onClick={() => setIsCreatingAula(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-gre font-black uppercase text-[10px] tracking-widest"
                            >
                                <Plus size={16} /> Nova Aula
                            </Button>
                        </div>

                        {isCreatingAula && (
                            <Card className="p-6 mb-6 bg-zinc-900 border-white/10">
                                <h3 className="text-sm font-black uppercase text-white mb-4">Criar Nova Aula</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Data</label>
                                        <input
                                            type="datetime-local"
                                            value={aulaForm.data}
                                            onChange={(e) => setAulaForm({ ...aulaForm, data: e.target.value })}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Tema</label>
                                        <input
                                            type="text"
                                            value={aulaForm.tema}
                                            onChange={(e) => setAulaForm({ ...aulaForm, tema: e.target.value })}
                                            placeholder="Ex: Introdução ao TypeScript"
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Tipo</label>
                                        <select
                                            value={aulaForm.tipo}
                                            onChange={(e) => setAulaForm({ ...aulaForm, tipo: e.target.value })}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                                        >
                                            <option value="normal">Normal</option>
                                            <option value="prova">Prova</option>
                                            <option value="trabalho">Trabalho</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="ghost" onClick={() => setIsCreatingAula(false)}>Cancelar</Button>
                                    <Button onClick={handleCreateAula} className="bg-blue-600 hover:bg-blue-700">Criar Aula</Button>
                                </div>
                            </Card>
                        )}

                        <div className="space-y-3">
                            {aulas.length === 0 ? (
                                <p className="text-zinc-500 text-center py-8">Nenhuma aula criada ainda.</p>
                            ) : (
                                aulas.map((aula) => (
                                    <Card key={aula.id} className="p-4 bg-zinc-900 border-white/10 hover:border-blue-500/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${aula.tipo === 'prova' ? 'bg-red-500/20 text-red-500' :
                                                        aula.tipo === 'trabalho' ? 'bg-yellow-500/20 text-yellow-500' :
                                                            'bg-blue-500/20 text-blue-500'
                                                        }`}>
                                                        {aula.tipo}
                                                    </span>
                                                    <h3 className="text-white font-bold">{aula.tema}</h3>
                                                </div>
                                                <p className="text-[10px] text-zinc-500 mt-1">
                                                    {new Date(aula.data).toLocaleString('pt-PT')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/turmas/${turma.id}/aulas/${aula.id}/presencas`}>
                                                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">
                                                        <ClipboardList size={14} /> Presenças
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteAula(aula.id)}
                                                    className="text-red-500 hover:bg-red-500/10"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'relatorio' && (
                <Card className="p-6 bg-card-bg border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-black uppercase tracking-tight text-white flex items-center gap-2">
                            Relatório Académico
                        </h2>
                        <Button
                            onClick={handleExportPauta}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest gap-2"
                        >
                            <Download size={16} /> Exportar Pauta PDF
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 bg-zinc-900 border-white/10">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Aprovados</p>
                            <p className="text-3xl font-black text-green-500">
                                {turma.matriculas.filter((m: any) => m.status_academico === 'Aprovado').length}
                            </p>
                        </Card>
                        <Card className="p-6 bg-zinc-900 border-white/10">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Reprovados</p>
                            <p className="text-3xl font-black text-red-500">
                                {turma.matriculas.filter((m: any) => m.status_academico === 'Reprovado').length}
                            </p>
                        </Card>
                        <Card className="p-6 bg-zinc-900 border-white/10">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Cursando</p>
                            <p className="text-3xl font-black text-blue-500">
                                {turma.matriculas.filter((m: any) => m.status_academico === 'Cursando').length}
                            </p>
                        </Card>
                    </div>
                </Card>
            )}
        </div>
    )
}
