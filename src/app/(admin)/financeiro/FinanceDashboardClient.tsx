'use client'

import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import {
    Banknote,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    BarChart3,
    History
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface FinanceDashboardClientProps {
    stats: {
        totalRevenue: number
        totalPending: number
        countPaid: number
        totalMatriculas: number
    }
    courseRevenue: any[]
}

export function FinanceDashboardClient({ stats, courseRevenue }: FinanceDashboardClientProps) {
    const efficiency = stats.totalMatriculas > 0
        ? ((stats.totalRevenue / (stats.totalRevenue + stats.totalPending)) * 100).toFixed(1)
        : '0'

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Module Title */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                    Gestão Financeira
                </h1>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Receita Realizada"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={Banknote}
                    variant="green"
                />
                <StatCard
                    title="Volume Pendente"
                    value={formatCurrency(stats.totalPending)}
                    icon={AlertCircle}
                    variant="orange"
                />
                <StatCard
                    title="Liquidações"
                    value={stats.countPaid}
                    icon={CheckCircle}
                    variant="blue"
                    subStats={[
                        { label: 'Total', value: stats.totalMatriculas }
                    ]}
                />
                <StatCard
                    title="Eficiência"
                    value={`${efficiency}%`}
                    icon={TrendingUp}
                    variant="cyan"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Analytics Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase">Receita por Curso</h3>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-sm shadow-sm p-8">
                        <div className="space-y-6">
                            {courseRevenue.map(course => (
                                <div key={course.id} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-tight">{course.nome}</span>
                                        <span className="text-sm font-black text-[var(--text-primary)]">{formatCurrency(course.revenue)}</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 dark:bg-zinc-800 rounded-sm overflow-hidden border border-slate-200 dark:border-zinc-800">
                                        <div
                                            className="h-full bg-blue-600 rounded-sm transition-all duration-1000"
                                            style={{ width: stats.totalRevenue > 0 ? `${(course.revenue / stats.totalRevenue) * 100}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {courseRevenue.length === 0 && (
                                <div className="py-12 text-center text-slate-400">
                                    <PieChart size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-xs font-bold uppercase tracking-widest">Sem dados disponíveis</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Recent Activity */}
                <div className="space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase">Atividade recente</h3>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-sm shadow-sm space-y-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                                        Liquidação #12{i}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-tight">{i + 1}h atrás • {formatCurrency(45000)}</p>
                                </div>
                            </div>
                        ))}

                        <Link href="/matriculas">
                            <button className="w-full mt-4 py-3 bg-slate-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 rounded-sm hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
                                Ver extrato completo
                            </button>
                        </Link>
                    </div>

                    <div className="bg-emerald-600 text-white p-6 rounded-sm shadow-md border-l-4 border-emerald-800">
                        <p className="text-[10px] font-bold uppercase mb-2 opacity-80">Previsão Próximo Mês</p>
                        <p className="text-xl font-black">{formatCurrency(stats.totalPending * 0.8)}</p>
                        <p className="text-[10px] opacity-70 mt-1 font-bold">Baseado em acordos vigentes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
