import { financialService } from '@/services/financialService'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { Banknote, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function FinanceiroPage() {
    const stats = await financialService.getGlobalStats()
    const courseRevenue = await financialService.getRevenueByCourse()

    const summaryCards = [
        {
            label: 'Receita Total',
            value: formatCurrency(stats.totalRevenue),
            icon: Banknote,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10'
        },
        {
            label: 'Pendente',
            value: formatCurrency(stats.totalPending),
            icon: AlertCircle,
            color: 'text-orange-400',
            bgColor: 'bg-orange-400/10'
        },
        {
            label: 'Matrículas Pagas',
            value: stats.countPaid,
            icon: CheckCircle,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10'
        },
        {
            label: 'Eficiência Financeira',
            value: stats.totalMatriculas > 0 ? `${((stats.totalRevenue / (stats.totalRevenue + stats.totalPending)) * 100).toFixed(1)}%` : '0%',
            icon: TrendingUp,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10'
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
                <p className="text-zinc-400">Visão consolidada de receitas e pendências</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert
                    variant="info"
                    title="Cálculo de Eficiência"
                    message="A Eficiência Financeira representa a percentagem de capital efetivamente recebido em relação ao total faturado (Recebido + Pendente)."
                />
                <Alert
                    variant="warning"
                    title="Controlo de Inadimplência"
                    message="O valor pendente reflete as parcelas de alunos com matrículas ativas que ainda não foram liquidadas."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map((card, i) => (
                    <Card key={i} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center ${card.color}`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">{card.label}</p>
                            <h2 className="text-xl font-bold mt-1">{card.value}</h2>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-8">
                    <h3 className="text-lg font-bold mb-6">Receita por Curso</h3>
                    <div className="space-y-6">
                        {courseRevenue.map(course => (
                            <div key={course.id} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300">{course.nome}</span>
                                    <span className="font-bold">{formatCurrency(course.revenue)}</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full"
                                        style={{ width: stats.totalRevenue > 0 ? `${(course.revenue / stats.totalRevenue) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>
                        ))}
                        {courseRevenue.length === 0 && (
                            <p className="text-center text-zinc-500 py-10">Nenhum dado financeiro disponível.</p>
                        )}
                    </div>
                </Card>

                <Card className="p-8 flex flex-col items-center justify-center text-center">
                    <Banknote size={48} className="text-zinc-700 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Fluxo de Caixa Mensal</h3>
                    <p className="text-zinc-500 text-sm max-w-xs">
                        Funcionalidade de gráficos temporais será integrada com Recharts em breve.
                    </p>
                </Card>
            </div>
        </div>
    )
}
