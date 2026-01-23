'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import {
    Users,
    School,
    Wallet,
    Award,
    TrendingUp,
    Clock,
    CheckCircle2,
    Briefcase,
    CalendarCheck,
    AlertCircle
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface DashboardClientProps {
    data: {
        totalAlunos: number
        turmasAtivas: number
        totalRevenue: number
        totalCertificados: number
        recentMatriculas: any[]
        totalFuncionarios: number
        presencasHoje: number
        pagamentosPendentes: number
        recentActivity: any[]
    }
}

export function DashboardClient({ data }: DashboardClientProps) {
    const { t } = useLanguage()

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Module Title */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                    Estado do sistema de gestão
                </h1>
            </div>

            {/* Top Stats Row - Vibrant Reference Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Alunos Matriculados"
                    value={data.totalAlunos}
                    icon={Users}
                    variant="orange"
                />
                <StatCard
                    title="Contratos Ativos"
                    value={data.totalFuncionarios}
                    icon={Briefcase}
                    variant="green"
                    subStats={[
                        { label: 'Presentes', value: data.presencasHoje }
                    ]}
                />
                <StatCard
                    title="Certificados Emitidos"
                    value={data.totalCertificados}
                    icon={Award}
                    variant="purple"
                />
                <StatCard
                    title="Matrículas Pagas"
                    value={formatCurrency(data.totalRevenue)}
                    icon={Wallet}
                    variant="cyan"
                    subStats={[
                        { label: 'Volume Total', value: '100%' }
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Table Activity */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-sm shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-800/20">
                            <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                                Transações em processo
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">
                                        <th className="px-6 py-3 font-semibold">Aluno</th>
                                        <th className="px-6 py-3 font-semibold">No. Matrícula</th>
                                        <th className="px-6 py-3 font-semibold">Estado</th>
                                        <th className="px-6 py-3 font-semibold">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                                    {data.recentMatriculas.map((m) => (
                                        <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-blue-600 text-xs font-bold">
                                                        {m.aluno.nome_completo[0]}
                                                    </div>
                                                    <span className="text-xs font-bold text-[var(--text-primary)]">{m.aluno.nome_completo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
                                                    #{m.id.split('-')[0].toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${m.estado_pagamento === 'Pago' ? 'bg-green-500' : 'bg-orange-400'}`} />
                                                    <span className="text-xs font-medium text-[var(--text-secondary)]">{m.estado_pagamento}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-[var(--text-primary)]">
                                                {formatCurrency(Number(m.valor_total))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Quick Status Vertical */}
                <div className="space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase">Estado geral</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {data.recentActivity.map((log) => (
                            <div key={log.id} className="bg-white dark:bg-zinc-900 border-b border-t border-r border-slate-200 dark:border-zinc-800 p-4 rounded-sm flex items-center gap-4 shadow-sm border-l-4 border-blue-600 transition-all hover:translate-x-1">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded">
                                    <Clock size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">
                                        {log.acao.replace(/_/g, ' ')}
                                    </p>
                                    <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                                        {log.usuario || 'Sistema'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                                        {new Date(log.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {data.recentActivity.length === 0 && (
                            <div className="py-8 text-center border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-sm">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                                    Sem atividade recente
                                </p>
                            </div>
                        )}
                    </div>

                    <button className="w-full py-3 bg-slate-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 rounded-sm hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
                        Ver relatório detalhado
                    </button>
                </div>
            </div>
        </div>
    )
}
