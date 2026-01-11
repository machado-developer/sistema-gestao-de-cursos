import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { History, User as UserIcon, Calendar, Info, ShieldAlert } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getAuditLogs() {
    return await (prisma as any).auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    })
}

export default async function AuditPage() {
    const logs = await getAuditLogs()

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Audit Logs</h1>
                <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-1">Registo de atividades e auditoria do sistema</p>
            </div>

            <div className="space-y-4">
                {logs.map((log: any) => (
                    <Card key={log.id} className="p-6 group hover:border-white/20 transition-all bg-white/[0.02]">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${log.acao.includes('DELETE') ? 'bg-red-500/10 text-red-500' :
                                log.acao.includes('CREATE') ? 'bg-green-500/10 text-green-500' :
                                    'bg-blue-500/10 text-blue-500'
                                }`}>
                                <ShieldAlert size={24} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-black text-white uppercase text-sm tracking-widest">{log.acao}</h3>
                                    <span className="text-[10px] font-black uppercase text-zinc-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
                                        <UserIcon size={14} className="text-zinc-600" />
                                        <span>{log.usuario}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
                                        <Info size={14} className="text-zinc-600" />
                                        <span className="uppercase tracking-tight">{log.entidade || 'SISTEMA'}</span>
                                    </div>
                                </div>

                                {log.detalhes && (
                                    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-500 overflow-x-auto">
                                        {log.detalhes}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}

                {logs.length === 0 && (
                    <Card className="p-20 text-center border-dashed border-2">
                        <History className="mx-auto text-zinc-800 mb-4" size={48} />
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Nenhum registo de atividade encontrado.</p>
                    </Card>
                )}
            </div>
        </div>
    )
}
