'use client'

import { Card } from "@/components/ui/Card"
import { StatCard } from "@/components/dashboard/StatCard"
import {
    Users,
    FileText,
    Calendar,
    Wallet,
    Plus,
    Calculator,
    ClipboardCheck,
    ShieldCheck,
    Briefcase
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

interface RHDashboardClientProps {
    data: {
        totalFuncionarios: number
        contratosAtivos: number
        feriasEsteMes: number
        totalFolha: number
        presencasHoje: number
    }
}

export function RHDashboardClient({ data }: RHDashboardClientProps) {
    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header / Module Title */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                    Gestão de Recursos Humanos
                </h1>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Funcionários"
                    value={data.totalFuncionarios}
                    icon={Users}
                    variant="blue"
                    subStats={[
                        { label: 'Contratos vigentes', value: data.contratosAtivos }
                    ]}
                />
                <StatCard
                    title="Assiduidade Hoje"
                    value={data.presencasHoje}
                    icon={ClipboardCheck}
                    variant="green"
                    subStats={[
                        { label: 'Taxa', value: `${((data.presencasHoje / (data.totalFuncionarios || 1)) * 100).toFixed(0)}%` }
                    ]}
                />
                <StatCard
                    title="Férias Programadas"
                    value={data.feriasEsteMes}
                    icon={Calendar}
                    variant="orange"
                    subStats={[
                        { label: 'Este mês', value: data.feriasEsteMes }
                    ]}
                />
                <StatCard
                    title="Estimativa de Folha"
                    value={formatCurrency(data.totalFolha)}
                    icon={Wallet}
                    variant="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Actions & Summary */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase">Ações de gestão</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/rh/funcionarios/novo">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-sm hover:border-blue-500 transition-all group flex items-start gap-4 shadow-sm cursor-pointer">
                                <div className="p-3 bg-blue-600 rounded text-white group-hover:scale-110 transition-transform">
                                    <Plus size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--text-primary)]">Novo Funcionário</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Registar colaborador</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/rh/processamento">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-sm hover:border-emerald-500 transition-all group flex items-start gap-4 shadow-sm cursor-pointer">
                                <div className="p-3 bg-emerald-600 rounded text-white group-hover:scale-110 transition-transform">
                                    <Calculator size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--text-primary)]">Processar Salários</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Fechar folha do mês</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/rh/presencas">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-sm hover:border-amber-500 transition-all group flex items-start gap-4 shadow-sm cursor-pointer">
                                <div className="p-3 bg-amber-600 rounded text-white group-hover:scale-110 transition-transform">
                                    <ClipboardCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--text-primary)]">Mapa de Assiduidade</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Gerir faltas e horas</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/rh/relatorios">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-sm hover:border-purple-500 transition-all group flex items-start gap-4 shadow-sm cursor-pointer">
                                <div className="p-3 bg-purple-600 rounded text-white group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--text-primary)]">Relatórios Mensais</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Exportar guias</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Sidebar Compliance */}
                <div className="space-y-4">
                    <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase">Estado legal</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-white dark:bg-zinc-900 border-b border-r border-t border-slate-200 dark:border-zinc-800 p-4 rounded-sm flex justify-between items-center shadow-sm border-l-4 border-emerald-500">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Segurança Social</p>
                                <p className="text-sm font-bold text-[var(--text-primary)]">Regularizado</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>

                        <div className="bg-white dark:bg-zinc-900 border-b border-r border-t border-slate-200 dark:border-zinc-800 p-4 rounded-sm flex justify-between items-center shadow-sm border-l-4 border-amber-500">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Imposto IRT</p>
                                <p className="text-sm font-bold text-[var(--text-primary)]">Processando</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                        </div>
                    </div>

                    <div className="bg-blue-600 text-white p-6 rounded-sm shadow-md border-l-4 border-blue-800">
                        <p className="text-[10px] font-bold uppercase mb-2 opacity-80">Dica de Gestão</p>
                        <p className="text-xs font-medium leading-relaxed">
                            Valide as presenças semanais para garantir o processamento correto das horas extras de 50% e 100% no fecho de mês.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
