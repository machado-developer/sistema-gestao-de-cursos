'use client'

import { Button } from '@/components/ui/Button'
import { History, User as UserIcon, ShieldAlert, Download, Search } from 'lucide-react'
import { DataTable, Column } from '@/components/ui/DataTable'
import { TableFilters, FilterConfig } from '@/components/ui/TableFilters'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface AuditLog {
    id: string
    usuario: string | null
    acao: string
    entidade: string | null
    detalhes: string | null
    createdAt: Date
}

interface AuditTableClientProps {
    logs: AuditLog[]
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function AuditTableClient({ logs, pagination }: AuditTableClientProps) {
    const { t } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
    }

    const onPageChange = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', page.toString()))
    }

    const handleExportPDF = async () => {
        const columns = ["Data/Hora", "Usuário", "Ação", "Entidade"]
        const data = logs.map(log => [
            new Date(log.createdAt).toLocaleString(),
            log.usuario || 'N/A',
            log.acao,
            log.entidade || 'SISTEMA'
        ])

        await DocumentService.generate(DocumentType.ACADEMIC_PAUTA, ExportFormat.PDF, data, {
            title: "REGISTO DE AUDITORIA DO SISTEMA",
            columns,
            filename: `auditoria_${new Date().toISOString().split('T')[0]}`
        })
    }

    const filters: FilterConfig[] = [
        {
            key: 'q',
            label: "Pesquisar",
            type: 'search',
            placeholder: "Pesquisar por ação ou usuário..."
        }
    ]

    const columns: Column<AuditLog>[] = [
        {
            key: 'acao',
            header: "Ação",
            render: (log) => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${log.acao.includes('DELETE') ? 'bg-red-500/10 text-red-500' :
                        log.acao.includes('CREATE') ? 'bg-green-500/10 text-green-500' :
                            'bg-blue-500/10 text-blue-500'
                        }`}>
                        <ShieldAlert size={16} />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider text-app-text">{log.acao}</span>
                </div>
            )
        },
        {
            key: 'usuario',
            header: "Usuário",
            render: (log) => (
                <div className="flex items-center gap-2 text-zinc-300">
                    <UserIcon size={14} className="text-zinc-500" />
                    <span className="text-xs">{log.usuario || 'Sistema'}</span>
                </div>
            )
        },
        {
            key: 'entidade',
            header: "Entidade",
            render: (log) => (
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">
                    {log.entidade || 'SISTEMA'}
                </span>
            )
        },
        {
            key: 'createdAt',
            header: "Data/Hora",
            render: (log) => (
                <span className="text-[10px] font-medium text-zinc-500">
                    {new Date(log.createdAt).toLocaleString()}
                </span>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-app-text tracking-tighter uppercase">Audit Logs</h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-1">
                        Registo de atividades e auditoria do sistema
                    </p>
                </div>
                <Button variant="outline" className="gap-2 uppercase text-[10px] font-black tracking-widest" onClick={handleExportPDF}>
                    <Download size={16} /> Exportar PDF
                </Button>
            </div>

            <div className="glass-card p-6 border border-white/5 bg-[var(--card-bg)]">
                <TableFilters filters={filters} />

                <div className="mt-6">
                    <DataTable
                        columns={columns}
                        data={logs}
                        keyExtractor={(log) => log.id}
                        emptyState={
                            <div className="text-center py-20">
                                <History size={48} className="mx-auto text-zinc-800 mb-4" />
                                <h3 className="text-zinc-400 font-bold uppercase text-sm tracking-widest">Nenhum registo encontrado</h3>
                                <p className="text-zinc-600 text-xs mt-1">Não existem atividades registadas para o período ou filtros selecionais.</p>
                            </div>
                        }
                        pagination={{
                            currentPage: pagination.currentPage,
                            totalPages: pagination.totalPages,
                            onPageChange
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
