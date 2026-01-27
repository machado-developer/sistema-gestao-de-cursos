'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    FileText,
    Download,
    Printer,
    Search,
    School,
    BookOpen,
    Users,
    Filter,
    Calendar,
    ChevronRight,
    Award
} from 'lucide-react'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'
import { formatCurrency } from '@/lib/utils'
import { getTurmaForReport } from './actions'
import { toast } from 'sonner'

interface AcademicReportsClientProps {
    data: any[] // List of classes with counts
}

export function AcademicReportsClient({ data }: AcademicReportsClientProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState<string | null>(null)

    const filteredTurmas = data.filter(t =>
        t.codigo_turma.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.curso.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleExport = async (type: DocumentType, format: ExportFormat, itemData: any) => {
        setLoading(itemData.id);
        try {
            const fullTurma = await getTurmaForReport(itemData.id);

            if (!fullTurma || !fullTurma.matriculas) {
                toast.error("Erro ao buscar dados da turma");
                return;
            }

            const tableRows = fullTurma.matriculas.map((m: any) => [
                m.aluno.nome_completo.toUpperCase(),
                m.aluno.bi_documento,
                m.status_academico.toUpperCase()
            ]);

            await DocumentService.generate(type, format, tableRows, {
                title: `LISTA DE ALUNOS - TURMA ${itemData.codigo_turma}`,
                columns: ["NOME", "BI", "STATUS"],
                filename: `Turma_${itemData.codigo_turma}_Lista`
            });

            toast.success("Relatório gerado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar relatório");
        } finally {
            setLoading(null);
        }
    }

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-tighter">
                        Relatórios Académicos
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Emissão de Mapas, Pautas e Listagens Oficiais
                    </p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="PESQUISAR TURMA OU CURSO..."
                        className="w-full h-10 pl-10 pr-4 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-widest focus:border-blue-500 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Quick Map Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportActionCard
                    title="Lista Geral de Alunos"
                    desc="Exportar todos os alunos por curso ou data."
                    icon={Users}
                    onExport={(format: any) => {
                        // This would need a specific Documentservice handler
                        console.log('Export general list', format);
                    }}
                />
                <ReportActionCard
                    title="Mapa de Inscrições"
                    desc="Consolidado de matrículas por período."
                    icon={Calendar}
                    onExport={(format: any) => {
                        console.log('Export enrollment map', format);
                    }}
                />
                <ReportActionCard
                    title="Emissão de Diplomas"
                    desc="Relatório de aprovados e certificação."
                    icon={Award}
                    onExport={(format: any) => {
                        console.log('Export diplomas map', format);
                    }}
                />
            </div>

            {/* Turma Specific Reports Table */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-blue-600 rounded-full" />
                    <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Listagens por Turma</h2>
                </div>

                <Card className="overflow-hidden border-2 border-slate-100 dark:border-zinc-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-zinc-800 font-black uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 text-[9px]">
                                <tr>
                                    <th className="px-6 py-4">Código / Curso</th>
                                    <th className="px-6 py-4">Instrutor</th>
                                    <th className="px-6 py-4">Data Início</th>
                                    <th className="px-6 py-4 text-center">Inscritos</th>
                                    <th className="px-6 py-4 text-right">Exportar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                                {filteredTurmas.map((turma) => (
                                    <tr key={turma.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-black text-[var(--text-primary)] uppercase">{turma.codigo_turma}</p>
                                            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">{turma.curso.nome}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-slate-500">{turma.instrutor?.nome || 'Não atribuído'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Calendar size={12} />
                                                <span className="text-[10px] font-bold uppercase">{new Date(turma.data_inicio).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-blue-600/10 text-blue-600 text-xs font-black px-3 py-1 rounded-full border border-blue-600/20">
                                                {turma._count.matriculas} Alunos
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleExport(DocumentType.STUDENT_LIST, ExportFormat.PDF, turma)}
                                                    className="p-2 hover:text-blue-600 transition-colors bg-slate-100 dark:bg-zinc-900 rounded"
                                                    title="Exportar PDF"
                                                >
                                                    <FileText size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleExport(DocumentType.STUDENT_LIST, ExportFormat.XLSX, turma)}
                                                    className="p-2 hover:text-emerald-600 transition-colors bg-slate-100 dark:bg-zinc-900 rounded"
                                                    title="Exportar Excel"
                                                >
                                                    <Download size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTurmas.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-slate-300">
                                                    <Search size={24} />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nenhuma turma encontrada</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function ReportActionCard({ title, desc, icon: Icon, onExport }: any) {
    return (
        <Card className="p-5 border-b-4 border-blue-600 transition-all hover:translate-y-[-4px] hover:shadow-lg">
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-600 text-white rounded shadow-md">
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">{title}</h3>
                    <p className="text-[10px] font-medium text-slate-400 mt-1">{desc}</p>
                </div>
            </div>
            <div className="flex gap-2 border-t border-slate-50 dark:border-zinc-800 pt-4">
                <Button
                    variant="outline"
                    className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest gap-2"
                    onClick={() => onExport(ExportFormat.PDF)}
                >
                    <FileText size={14} /> PDF
                </Button>
                <Button
                    variant="outline"
                    className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest gap-2"
                    onClick={() => onExport(ExportFormat.XLSX)}
                >
                    <Download size={14} /> EXCEL
                </Button>
            </div>
        </Card>
    )
}
