'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Award, CheckCircle2, XCircle, Search, Lock, X } from 'lucide-react'
import { DownloadCertificateButton } from '@/components/certificates/DownloadCertificateButton'
import { DownloadBulkButton } from '@/components/certificates/DownloadBulkButton'
import { GenerateSampleButton } from '@/components/certificates/GenerateSampleButton'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface CertificadosClientProps {
    initialMatriculas: any[]
}

export function CertificadosClient({ initialMatriculas }: CertificadosClientProps) {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('all')
    const [selectedTurma, setSelectedTurma] = useState('all')
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    // Unique courses and turmas
    const cursos = Array.from(new Set(initialMatriculas.map(m => m.turma.curso.nome))).sort()
    const turmas = Array.from(new Set(initialMatriculas.map(m => m.turma.nome))).sort()

    const filteredMatriculas = initialMatriculas.filter(m => {
        const matchesSearch = m.aluno.nome_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.aluno.bi_documento.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCourse = selectedCourse === 'all' || m.turma.curso.nome === selectedCourse
        const matchesTurma = selectedTurma === 'all' || m.turma.nome === selectedTurma

        return matchesSearch && matchesCourse && matchesTurma
    })

    const selectedMatriculasData = initialMatriculas.filter(m => selectedIds.has(m.id))

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedIds(newSelected)
    }

    const selectAll = () => {
        if (selectedIds.size === filteredMatriculas.length && filteredMatriculas.length > 0) {
            setSelectedIds(new Set())
        } else {
            const newSelected = new Set(filteredMatriculas.filter(m =>
                m.status_academico === 'Aprovado' && m.estado_pagamento === 'Pago'
            ).map(m => m.id))
            setSelectedIds(newSelected)
        }
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
                        <Award className="text-blue-500" size={32} />
                        {t('sidebar.certificates')}
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-1">
                        Validar e gerar certificados para alunos aprovados
                    </p>
                </div>
            </div>

            <Alert
                variant="info"
                title="Critérios de Emissão"
                message="Para que um certificado seja emitido, o aluno deve cumprir dois requisitos: 1. Estar Aprovado (Nota >= Média) e 2. Ter a Situação Financeira como 'Pago' (Saldo = 0)."
            />

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar por nome ou BI..."
                        className="w-full bg-surface-hover/50 border border-border rounded-xl pl-12 pr-4 py-3 text-app-text placeholder-app-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    />
                </div>

                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="bg-surface-hover/50 border border-border rounded-xl px-4 py-3 text-app-text focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="all">Todos os Cursos</option>
                    {cursos.map(c => <option key={String(c)} value={String(c)}>{String(c)}</option>)}
                </select>

                <select
                    value={selectedTurma}
                    onChange={(e) => setSelectedTurma(e.target.value)}
                    className="bg-surface-hover/50 border border-border rounded-xl px-4 py-3 text-app-text focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="all">Todas as Turmas</option>
                    {turmas.map(t => <option key={String(t)} value={String(t)}>{String(t)}</option>)}
                </select>
            </div>

            {/* Bulk Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-surface-hover/30 p-4 rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedIds.size === filteredMatriculas.length && filteredMatriculas.length > 0}
                        onChange={selectAll}
                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span className="text-sm font-bold text-zinc-400">
                        {selectedIds.size} selecionados de {filteredMatriculas.length}
                    </span>
                    {selectedIds.size > 0 && (
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                        >
                            <X size={12} /> Limpar
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <GenerateSampleButton />
                    <DownloadBulkButton matriculas={selectedMatriculasData} disabled={selectedIds.size === 0} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatriculas.map((m: any) => {
                    const isApproved = m.status_academico === 'Aprovado'
                    const isPaid = m.estado_pagamento === 'Pago'
                    const canIssue = isApproved && isPaid

                    return (
                        <Card
                            key={m.id}
                            className={`relative group p-8 transition-all border flex flex-col h-full cursor-pointer ${selectedIds.has(m.id)
                                ? 'bg-blue-500/5 border-blue-500/50 shadow-lg shadow-blue-500/10'
                                : 'bg-card-bg border-border hover:border-blue-500/20'
                                }`}
                            onClick={() => canIssue && toggleSelection(m.id)}
                        >
                            <div className="absolute top-6 left-6 z-10">
                                {canIssue && (
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(m.id)}
                                        onChange={() => toggleSelection(m.id)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                )}
                            </div>

                            <div className="absolute top-6 right-6">
                                {canIssue ? (
                                    <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-black uppercase py-1 px-2.5 rounded-full border border-green-500/20 bg-green-500/5">
                                        <CheckCircle2 size={12} strokeWidth={3} /> Elegível
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-black uppercase py-1 px-2.5 rounded-full border border-red-500/20 bg-red-500/5">
                                        <XCircle size={12} strokeWidth={3} /> Bloqueado
                                    </div>
                                )}
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Award size={28} />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-black text-xl text-gray-900 mb-1 tracking-tight leading-tight">
                                    {m.aluno.nome_completo}
                                </h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-border pb-4">
                                    {m.turma.curso.nome}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status Académico</span>
                                        <span className={`text-xs font-bold ${isApproved ? 'text-green-500' : 'text-zinc-500'}`}>
                                            {m.status_academico}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Situação Financeira</span>
                                        <span className={`text-xs font-bold ${isPaid ? 'text-green-500' : 'text-orange-500'}`}>
                                            {m.estado_pagamento}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                {canIssue ? (
                                    <DownloadCertificateButton matricula={m} />
                                ) : (
                                    <Button
                                        variant="secondary"
                                        className="w-full gap-2 font-black uppercase text-[10px] tracking-widest py-6"
                                        disabled
                                    >
                                        <Lock size={14} /> Emitir Certificado
                                    </Button>
                                )}
                            </div>
                        </Card>
                    )
                })}

                {filteredMatriculas.length === 0 && (
                    <div className="col-span-full py-32 text-center text-zinc-500 border-2 border-dashed border-border rounded-3xl bg-surface-hover/20">
                        <Award size={48} className="mx-auto mb-4 opacity-10" />
                        <p className="font-bold text-lg text-app-text">Nenhum registo encontrado</p>
                        <p className="text-xs uppercase tracking-widest mt-2 opacity-60">
                            {searchQuery ? 'Tente ajustar os filtros de pesquisa' : 'Os certificados são liberados após aprovação'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
