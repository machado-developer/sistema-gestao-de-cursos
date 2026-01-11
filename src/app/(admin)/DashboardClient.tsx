'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Card } from '@/components/ui/Card'
import { Users, School, Wallet, Award, Activity, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface DashboardClientProps {
    data: {
        totalAlunos: number
        turmasAtivas: number
        totalRevenue: number
        totalCertificados: number
        recentMatriculas: any[]
    }
}

export function DashboardClient({ data }: DashboardClientProps) {
    const { t } = useLanguage()

    const stats = [
        {
            name: t('dashboard.stats.students'),
            value: data.totalAlunos.toString(),
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            name: t('dashboard.stats.active_classes'),
            value: data.turmasAtivas.toString(),
            icon: School,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10'
        },
        {
            name: t('dashboard.stats.revenue'),
            value: formatCurrency(data.totalRevenue),
            icon: Wallet,
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        },
        {
            name: t('dashboard.stats.certificates'),
            value: data.totalCertificados.toString(),
            icon: Award,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10'
        },
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-app-text tracking-tighter uppercase transition-colors">
                    {t('dashboard.title')}
                </h1>
                <p className="text-app-muted font-bold uppercase text-[10px] tracking-widest mt-1">
                    {t('dashboard.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="p-6 group hover:border-blue-500/20 transition-all bg-card-bg border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <Activity size={16} className="text-app-muted" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase text-app-muted tracking-widest mb-1">{stat.name}</h3>
                        <p className="text-3xl font-black text-app-text tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 bg-card-bg border-border space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h3 className="text-xs font-black text-app-text uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp size={16} className="text-green-500" />
                            {t('dashboard.recent_matriculas')}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {data.recentMatriculas.map((m) => (
                            <div key={m.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-hover/50 border border-border group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-black">
                                        {m.aluno.nome_completo[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-app-text">{m.aluno.nome_completo}</p>
                                        <p className="text-xs text-app-muted font-bold uppercase tracking-tight">{m.turma.curso.nome}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-app-text mb-1">{formatCurrency(Number(m.valor_total))}</p>
                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                                        {m.estado_pagamento === 'Pago' ? t('common.save') && 'Liquidado' : m.estado_pagamento}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-8 bg-blue-600 shadow-2xl shadow-blue-600/20 border-blue-500 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp size={200} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">{t('dashboard.finance_flow')}</h3>
                        <div className="space-y-2">
                            <p className="text-4xl font-black text-gray-900">{formatCurrency(data.totalRevenue)}</p>
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-70">Volume total acumulado</p>
                        </div>
                        <div className="h-[2px] w-full bg-white/20" />
                        <p className="text-xs text-blue-900/75 font-medium leading-relaxed">
                            O sistema registou um crescimento de 12% em relação ao mês anterior. Continue monitorando as inadimplências.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
