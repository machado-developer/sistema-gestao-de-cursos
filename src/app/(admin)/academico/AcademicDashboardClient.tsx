'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import {
    Users,
    BookOpen,
    School,
    Award,
    Clock,
    UserCheck,
    TrendingUp,
    FileText,
    ArrowRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

interface AcademicDashboardClientProps {
    data: {
        totalAlunos: number
        totalCursos: number
        totalTurmasAtivas: number
        totalInstrutores: number
        recentMatriculas: any[]
        matriculasPorCurso: { curso: string, total: number }[]
    }
}

export function AcademicDashboardClient({ data }: AcademicDashboardClientProps) {
    const { t } = useLanguage()

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tighter">
                        Painel de Gestão Académica
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Controle e Monitoramento de Alunos e Cursos
                    </p>
                </div>
                <Link
                    href="/academico/relatorios"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-blue-700 transition-colors"
                >
                    <FileText size={14} />
                    Ver Relatórios
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total de Alunos"
                    value={data.totalAlunos}
                    icon={Users}
                    variant="cyan"
                />
                <StatCard
                    title="Cursos Disponíveis"
                    value={data.totalCursos}
                    icon={BookOpen}
                    variant="purple"
                />
                <StatCard
                    title="Turmas em Curso"
                    value={data.totalTurmasAtivas}
                    icon={School}
                    variant="orange"
                />
                <StatCard
                    title="Corpo Docente"
                    value={data.totalInstrutores}
                    icon={UserCheck}
                    variant="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Enrollments Table */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden border-2 border-slate-100 dark:border-zinc-800">
                        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/20 flex justify-between items-center">
                            <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                                Matrículas Recentes
                            </h3>
                            <Link href="/matriculas" className="text-[10px] font-bold text-blue-600 uppercase hover:underline">
                                Ver todas
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">
                                        <th className="px-6 py-4">Aluno</th>
                                        <th className="px-6 py-4">Curso / Turma</th>
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4 text-right">Acções</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                                    {data.recentMatriculas.map((m) => (
                                        <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black text-[10px]">
                                                        {m.aluno.nome_completo.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-[var(--text-primary)]">{m.aluno.nome_completo}</p>
                                                        <p className="text-[9px] text-slate-400 font-medium tracking-tighter uppercase">{m.aluno.bi_documento}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{m.turma.curso.nome}</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Turma: {m.turma.codigo_turma}</p>
                                            </td>
                                            <td className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">
                                                {new Date(m.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/alunos/${m.aluno.id}`}
                                                    className="inline-flex p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                                >
                                                    <ArrowRight size={14} className="text-slate-400" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.recentMatriculas.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center italic text-slate-400 text-xs uppercase font-bold">
                                                Nenhuma matrícula recente encontrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Performance by Course */}
                <div className="space-y-4">
                    <Card className="p-6 border-2 border-slate-100 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-900">
                        <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-6 flex items-center gap-2">
                            <TrendingUp size={16} className="text-blue-600" />
                            Matrículas por Curso
                        </h3>
                        <div className="space-y-5">
                            {data.matriculasPorCurso.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] font-black text-slate-500 uppercase truncate pr-4">{item.curso}</p>
                                        <p className="text-xs font-black text-blue-600">{item.total}</p>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full"
                                            style={{ width: `${Math.min(100, (item.total / (data.totalAlunos || 1)) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Access */}
                    <Card className="p-4 border-l-4 border-blue-600 bg-blue-50/20 dark:bg-blue-900/10">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-600 text-white rounded shadow-md">
                                <Award size={18} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dica de Performance</h4>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                    Acompanhe o preenchimento das turmas para otimizar o planejamento de novos cursos.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
