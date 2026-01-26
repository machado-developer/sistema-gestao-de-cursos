'use client'

import { useState } from 'react'
import { Aluno, Matricula, Documento } from '@prisma/client'
import { Tabs } from '@/components/ui/Tabs'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    User,
    ClipboardList,
    FileText,
    Mail,
    CreditCard,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Download,
    Eye,
    Upload,
    MoreVertical,
    CheckCircle2,
    ArrowLeft,
    BookOpen
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { formatCurrency } from '@/lib/utils'
import { DocumentUpload } from '@/components/DocumentUpload'

interface AlunoProfileClientProps {
    aluno: Aluno & {
        matriculas: any[]
        documentos: Documento[]
    }
}

export function AlunoProfileClient({ aluno }: AlunoProfileClientProps) {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState('overview')
    const [docs, setDocs] = useState<Documento[]>(aluno.documentos)

    const tabs = [
        { id: 'overview', label: t('profile.tabs.overview'), icon: <User size={18} /> },
        { id: 'matriculas', label: t('profile.tabs.matriculas'), icon: <ClipboardList size={18} /> },
        { id: 'documents', label: t('profile.tabs.documents'), icon: <FileText size={18} /> },
    ]

    const fotoPasse = aluno.documentos.find(d => d.tipo === 'Foto')

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Link href="/alunos" className="inline-flex items-center gap-2 text-app-muted hover:text-blue-500 transition-colors group text-sm font-bold mb-2">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t('common.back')}
            </Link>

            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden glass border-2 border-border shadow-2xl transition-all group-hover:border-blue-500/50">
                        {fotoPasse ? (
                            <img src={fotoPasse.url} alt={aluno.nome_completo} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-surface-hover text-app-muted">
                                <User size={48} />
                            </div>
                        )}
                        <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Upload size={24} />
                        </button>
                    </div>
                    {aluno.matriculas.length > 0 && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-app-bg flex items-center justify-center text-white shadow-lg">
                            <CheckCircle2 size={16} />
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-4xl font-black text-app-text tracking-tighter">
                            {aluno.nome_completo}
                        </h1>
                        <span className="px-3 py-1 rounded-full border border-blue-500/20 text-blue-500 bg-blue-500/10 text-[10px] font-black uppercase tracking-widest">
                            {aluno.escolaridade || 'Estudante'}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-app-muted text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-blue-500" />
                            {aluno.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} className="text-blue-500" />
                            {aluno.bi_documento}
                        </div>
                        {aluno.telefone && (
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-green-500" />
                                {aluno.telefone}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="secondary" className="gap-2 font-bold shadow-lg shadow-black/5">
                        <Download size={18} />
                        Ficha PDF
                    </Button>
                    <Button className="gap-2 font-bold shadow-lg shadow-blue-600/20">
                        {t('common.edit')}
                    </Button>
                </div>
            </div>

            <div className="border-t border-border pt-8">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="mt-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 p-8 space-y-8 bg-card-bg border-border">
                            <div>
                                <h3 className="text-lg font-black text-app-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                    <User size={18} className="text-blue-500" />
                                    Informações Pessoais
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <InfoItem label="Nome Completo" value={aluno.nome_completo} />
                                    <InfoItem label="E-mail" value={aluno.email} />
                                    <InfoItem label="BI" value={aluno.bi_documento} />
                                    <InfoItem label="Telefone" value={aluno.telefone || '---'} />
                                    <InfoItem label="Gênero" value={aluno.genero || '---'} />
                                    <InfoItem label="Data de Nascimento" value={aluno.data_nascimento ? new Date(aluno.data_nascimento).toLocaleDateString() : '---'} />
                                    <InfoItem label="Escolaridade" value={aluno.escolaridade || '---'} />
                                    <InfoItem label="Escola Académica" value={aluno.escolaAcademica || '---'} />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border">
                                <h3 className="text-lg font-black text-app-text mb-6 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={18} className="text-red-500" />
                                    Localização
                                </h3>
                                <InfoItem label="Endereço" value={aluno.Endereco || 'Endereço não informado.'} fullWidth />
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card className="p-8 bg-blue-600 shadow-2xl shadow-blue-600/20 border-blue-500 relative overflow-hidden group">
                                <div className="absolute -top-6 -right-6 opacity-10 group-hover:scale-110 transition-transform">
                                    <GraduationCap size={120} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 mb-1">Total Matriculado</p>
                                    <h4 className="text-4xl font-black text-white mb-4">{aluno.matriculas.length}</h4>
                                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-white/90 font-black uppercase text-[10px] tracking-widest h-10">
                                        Nova Matrícula
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-8 space-y-6">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
                                    Cronologia
                                </h3>
                                <div className="space-y-6">
                                    <TimelineItem
                                        icon={<Calendar size={14} />}
                                        label="Registado em"
                                        date={new Date(aluno.createdAt).toLocaleDateString()}
                                    />
                                    {aluno.matriculas.length > 0 && (
                                        <TimelineItem
                                            icon={<ClipboardList size={14} />}
                                            label="Primeira Matrícula"
                                            date={new Date(Math.min(...aluno.matriculas.map(m => new Date(m.createdAt).getTime()))).toLocaleDateString()}
                                            color="bg-blue-500"
                                        />
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'matriculas' && (
                    <div className="space-y-4">
                        {aluno.matriculas.map((m: any) => (
                            <Card key={m.id} className="p-6 group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white">{m.turma.curso.nome}</h4>
                                            <p className="text-sm text-zinc-500 font-medium">{m.turma.codigo_turma} • {new Date(m.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Status Académico</p>
                                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${m.status_academico === 'Aprovado' ? 'border-green-500/20 text-green-400 bg-green-500/10' :
                                                m.status_academico === 'Reprovado' ? 'border-red-500/20 text-red-400 bg-red-500/10' :
                                                    'border-blue-500/20 text-blue-400 bg-blue-500/10'
                                                }`}>
                                                {m.status_academico}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Financeiro</p>
                                            <p className="font-black text-white text-lg">{formatCurrency(m.valor_pago)} / {formatCurrency(m.valor_total)}</p>
                                        </div>
                                        <Button variant="secondary" size="icon" className="rounded-xl">
                                            <MoreVertical size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {aluno.matriculas.length === 0 && (
                            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                <ClipboardList className="mx-auto text-zinc-700 mb-4" size={48} />
                                <p className="text-zinc-500 font-bold">Nenhuma matrícula identificada para este aluno.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <Card className="p-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                                Novo Documento
                            </h3>
                            <DocumentUpload
                                entityId={aluno.id}
                                entityType="alunos"
                                onUploadSuccess={(doc) => {
                                    setDocs(prev => [doc, ...prev])
                                    // If it's a photo, we should ideally trigger a refresh or handle it
                                }}
                            />
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {docs.map(doc => (
                                <Card key={doc.id} className="p-6 group relative overflow-hidden hover:border-blue-500/30 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {doc.tipo === 'Foto' ? <User size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div className="flex gap-1">
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Eye size={14} />
                                                </Button>
                                            </a>
                                            <a href={doc.url} download={doc.nome}>
                                                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Download size={14} />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-white truncate pr-2" title={doc.nome}>{doc.nome}</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">{doc.tipo}</p>
                                    <p className="text-[10px] text-zinc-600 mt-4 font-medium">{new Date(doc.createdAt).toLocaleDateString()}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function InfoItem({ label, value, fullWidth }: { label: string; value: string | null; fullWidth?: boolean }) {
    return (
        <div className={fullWidth ? 'col-span-full' : ''}>
            <p className="text-[10px] font-black uppercase text-app-muted tracking-widest mb-1">{label}</p>
            <p className="text-app-text font-bold">{value || '---'}</p>
        </div>
    )
}

function TimelineItem({ icon, label, date, color = 'bg-zinc-800' }: { icon: React.ReactNode; label: string; date: string; color?: string }) {
    return (
        <div className="flex gap-4 relative">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white shrink-0 shadow-lg relative z-10`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-app-muted tracking-widest">{label}</p>
                <p className="text-sm font-bold text-app-text">{date}</p>
            </div>
        </div>
    )
}
