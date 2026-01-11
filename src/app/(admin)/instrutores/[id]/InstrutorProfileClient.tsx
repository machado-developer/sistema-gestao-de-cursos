'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Users,
    BookOpen,
    ArrowLeft,
    ShieldCheck,
    Briefcase
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface InstrutorProfileClientProps {
    instrutor: any
}

export function InstrutorProfileClient({ instrutor }: InstrutorProfileClientProps) {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState('overview')

    const tabs = [
        { id: 'overview', label: t('instructor.tabs.overview'), icon: <BookOpen size={18} /> },
        { id: 'details', label: t('instructor.tabs.details'), icon: <User size={18} /> },
    ]

    const totalStudents = instrutor.turmas.reduce((acc: number, t: any) => acc + t.matriculas.length, 0)
    const activeClasses = instrutor.turmas.filter((t: any) => t.status === 'Em Andamento').length

    return (
        <div className="space-y-6">
            {/* Header / Back Button */}
            <div className="flex items-center gap-4">
                <Link href="/instrutores">
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <ArrowLeft size={18} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">{instrutor.nome}</h1>
                    <p className="text-zinc-400">{instrutor.especialidade || t('instructor.info.specialty')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Brief Details Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 ring-4 ring-blue-500/5">
                            <User size={48} />
                        </div>
                        <h2 className="font-bold text-lg">{instrutor.nome}</h2>
                        <p className="text-sm text-zinc-500 mb-6">{instrutor.email}</p>

                        <div className="w-full pt-6 border-t border-white/5 space-y-4 text-left">
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <ShieldCheck size={16} className="text-blue-500" />
                                <span>{t('instructor.info.specialty')}: {instrutor.especialidade || '---'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <Briefcase size={16} className="text-blue-500" />
                                <span>{t('instructor.info.active_classes')}: {activeClasses}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <Users size={16} className="text-blue-500" />
                                <span>{t('instructor.info.students')}: {totalStudents}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Bio</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {instrutor.bio || 'Nenhuma biografia disponível para este instrutor.'}
                        </p>
                    </Card>
                </div>

                {/* Right Column: Dynamic Tabs */}
                <div className="lg:col-span-3 space-y-6">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {activeTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="p-6 bg-blue-600/5 border-blue-500/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-black">{t('instructor.info.students')}</p>
                                            <h4 className="text-2xl font-bold">{totalStudents}</h4>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-6 bg-zinc-900/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-black">{t('instructor.info.active_classes')}</p>
                                            <h4 className="text-2xl font-bold">{activeClasses}</h4>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <Card className="p-0 overflow-hidden">
                                <div className="p-6 border-b border-white/5 bg-white/2">
                                    <h3 className="font-bold">{t('sidebar.classes')}</h3>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {instrutor.turmas.map((turma: any) => (
                                        <div key={turma.id} className="p-6 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-zinc-200">{turma.curso.nome}</h4>
                                                    <p className="text-xs text-zinc-500 font-mono">{turma.codigo_turma}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 text-right">
                                                <div className="hidden md:block">
                                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">{t('dashboard.stats.students')}</p>
                                                    <p className="font-bold text-zinc-300">{turma.matriculas.length}</p>
                                                </div>
                                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase border ${turma.status === 'Em Andamento'
                                                    ? 'border-blue-500/20 text-blue-400 bg-blue-500/10'
                                                    : 'border-green-500/20 text-green-400 bg-green-500/10'
                                                    }`}>
                                                    {turma.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {instrutor.turmas.length === 0 && (
                                        <div className="p-12 text-center text-zinc-500">
                                            Nenhuma turma atribuída a este instrutor.
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Card className="p-6 space-y-6">
                                <h3 className="font-bold border-b border-white/5 pb-4">Informações de Contacto</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail size={16} className="text-zinc-500" />
                                        <span className="text-zinc-400">Email:</span>
                                        <span className="font-bold ml-auto">{instrutor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone size={16} className="text-zinc-500" />
                                        <span className="text-zinc-400">Telefone:</span>
                                        <span className="font-bold ml-auto">{instrutor.telefone || '---'}</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 space-y-6">
                                <h3 className="font-bold border-b border-white/5 pb-4">Documentação</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <ShieldCheck size={16} className="text-zinc-500" />
                                        <span className="text-zinc-400">NIF/BI:</span>
                                        <span className="font-bold ml-auto">{instrutor.bi_documento || '---'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar size={16} className="text-zinc-500" />
                                        <span className="text-zinc-400">Membro desde:</span>
                                        <span className="font-bold ml-auto">
                                            {new Date(instrutor.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
