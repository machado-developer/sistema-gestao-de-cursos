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
        stats: {
            totalAlunos: number
            totalFuncionarios: number
            turmasAtivas: number
            totalCursos: number
            revenueTotal: number
            revenueMensal: number
            pendentes: number
        },
        recentPagamentos: any[]
        recentActivity: any[]
    }
}

export function DashboardClient({ data }: DashboardClientProps) {
    const { t } = useLanguage()

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                <h1 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                    Dashboard Executivo
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Vista consolidada de todos os módulos do sistema
                </p>
            </div>

            {/* Main Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Volume Financeiro (Mês)"
                    value={formatCurrency(data.stats.revenueMensal)}
                    icon={Wallet}
                    variant="green"
                    subStats={[
                        { label: 'Total Acumulado', value: formatCurrency(data.stats.revenueTotal) }
                    ]}
                />
                <StatCard
                    title="Alunos Activos"
                    value={data.stats.totalAlunos}
                    icon={Users}
                    variant="orange"
                    subStats={[
                        { label: 'Pendentes de Pag.', value: data.stats.pendentes }
                    ]}
                />
                <StatCard
                    title="Capital Humano"
                    value={data.stats.totalFuncionarios}
                    icon={Briefcase}
                    variant="purple"
                    subStats={[
                        { label: 'Funcionários Ativos', value: '100%' }
                    ]}
                />
                <StatCard
                    title="Operações Académicas"
                    value={data.stats.turmasAtivas}
                    icon={School}
                    variant="cyan"
                    subStats={[
                        { label: 'Cursos Disponíveis', value: data.stats.totalCursos }
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Financial/Transactions Board */}
                <div className="lg:col-span-2">
                    <div className="bg-[var(--card-bg)] border-2 border-slate-100 dark:border-zinc-800 rounded shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/20 flex justify-between items-center">
                            <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                                Últimas Transações Financeiras
                            </h3>
                            <Link href="/financeiro" className="text-[10px] font-bold text-blue-600 uppercase hover:underline">
                                Ver Gestão Financeira
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">
                                        <th className="px-6 py-4">Entidade / Aluno</th>
                                        <th className="px-6 py-4 text-center">Referência</th>
                                        <th className="px-6 py-4 text-center">Método</th>
                                        <th className="px-6 py-4 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                                    {data.recentPagamentos.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-black text-[10px]">
                                                        {p.matricula?.aluno?.nome_completo?.[0] || 'S'}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-[var(--text-primary)]">{p.matricula?.aluno?.nome_completo || 'Sistema'}</p>
                                                        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">Liquidado em {new Date(p.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-slate-100 dark:bg-zinc-800 text-[10px] px-2 py-0.5 rounded font-black text-slate-500 uppercase">
                                                    #{p.referencia || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">{p.metodo_pagamento}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs font-black text-emerald-600">
                                                + {formatCurrency(Number(p.valor))}
                                            </td>
                                        </tr>
                                    ))}
                                    {data.recentPagamentos.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center italic text-slate-400 text-xs uppercase font-bold">
                                                Nenhuma transação recente encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* System Audit & Health */}
                <div className="space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
                        <TrendingUp size={14} className="text-blue-600" />
                        <h3 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Actividade do Sistema</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {data.recentActivity.map((log) => (
                            <div key={log.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded flex items-center gap-4 shadow-sm border-l-4 border-blue-600 transition-all hover:translate-x-1">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded">
                                    <Clock size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[9px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">
                                            {log.acao.replace(/_/g, ' ')}
                                        </p>
                                        <span className="text-[8px] font-bold text-slate-300">
                                            {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                                        {log.usuario || 'Usuário do Sistema'}
                                    </p>
                                    <p className="text-[9px] text-blue-500 font-bold uppercase tracking-tighter">
                                        {log.entidade}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Card className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle size={18} className="text-blue-200" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Estado Operacional</h4>
                        </div>
                        <p className="text-[11px] font-bold text-blue-100 leading-tight">
                            Sistema operando em plena capacidade com {data.stats.totalAlunos} entidades activas em base de dados.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

import Link from 'next/link'
