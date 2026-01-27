"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    FileText,
    Download,
    Printer,
    ShieldCheck,
    Users,
    Calendar,
    AlertCircle,
    Building2,
    DollarSign,
    ChevronRight,
    Search,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { DocumentService, DocumentType, ExportFormat } from "@/services/DocumentService";

export default function RelatoriosPage() {
    const [activeTab, setActiveTab] = useState("inss");
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const meses = [
        { value: 1, label: "Janeiro" }, { value: 2, label: "Fevereiro" },
        { value: 3, label: "Março" }, { value: 4, label: "Abril" },
        { value: 5, label: "Maio" }, { value: 6, label: "Junho" },
        { value: 7, label: "Julho" }, { value: 8, label: "Agosto" },
        { value: 9, label: "Setembro" }, { value: 10, label: "Outubro" },
        { value: 11, label: "Novembro" }, { value: 12, label: "Dezembro" },
    ];

    const anos = [2024, 2025, 2026];

    const handleGerar = async () => {
        setLoading(true);
        setData(null);
        try {
            const res = await fetch(`/api/rh/relatorios?type=${activeTab}&mes=${mes}&ano=${ano}`);
            if (!res.ok) throw new Error();
            const result = await res.json();
            setData(result);
            toast.success("Relatório gerado com sucesso!");
        } catch (error) {
            toast.error("Erro ao gerar relatório");
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (!data) return;
        let csvContent = "data:text/csv;charset=utf-8,";

        if (activeTab === 'inss') {
            csvContent += "NOME,NUMERO INSS,BASE INCIDENCIA,TRABALHADOR (3%),EMPRESA (8%),TOTAL (11%)\n";
            data.linhas.forEach((l: any) => {
                csvContent += `${l.funcionario.nome},${l.funcionario.numero_inss || ''},${l.base_incidencia},${l.trabalhador_3},${l.empresa_8},${l.total_11}\n`;
            });
        } else if (activeTab === 'irt') {
            csvContent += "NOME,NIF,RENDIMENTO BRUTO,MATERIA COLECTAVEL,IRT RETIDO\n";
            data.linhas.forEach((l: any) => {
                csvContent += `${l.funcionario.nome},${l.funcionario.nif || ''},${l.rendimento_bruto},${l.materia_colectavel},${l.irt_retido}\n`;
            });
        } else if (activeTab === 'ferias') {
            csvContent += "NOME,CARGO,INICIO,FIM,DIAS UTEIS\n";
            data.emFerias?.forEach((f: any) => {
                csvContent += `${f.funcionario.nome},${f.funcionario.cargo?.nome},${f.data_inicio},${f.data_fim},${f.dias_uteis}\n`;
            });
        } else if (activeTab === 'faltas') {
            csvContent += "DATA,NOME,STATUS,OBSERVACAO\n";
            data.faltas?.forEach((f: any) => {
                csvContent += `${f.data},${f.funcionario.nome},${f.status},${f.observacao || ''}\n`;
            });
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `RELATORIO_${activeTab.toUpperCase()}_${mes}_${ano}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                    <h1 className="text-lg font-bold text-blue-600 uppercase tracking-tighter">
                        Emissão de Relatórios Legais
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Conformidade Laboral e Fiscal • ERP Angola 🇦🇴</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="flex gap-1">
                        <select
                            value={mes}
                            onChange={(e) => setMes(Number(e.target.value))}
                            className="h-9 px-3 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-500 transition-colors"
                        >
                            {meses.map(m => <option key={m.value} value={m.value}>{m.label.toUpperCase()}</option>)}
                        </select>
                        <select
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                            className="h-9 px-3 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-500 transition-colors"
                        >
                            {anos.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <Button
                        onClick={handleGerar}
                        disabled={loading}
                        className="bg-blue-600 h-9 px-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-blue-800 gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                        {loading ? "PROCESSANDO..." : "GERAR MAPA"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 py-4 border-b border-slate-100 dark:border-zinc-800">Selecione o Modelo</p>
                    <ReportTab
                        id="inss"
                        label="Mapa de INSS"
                        icon={ShieldCheck}
                        active={activeTab}
                        onClick={setActiveTab}
                        desc="Folha de Segurança Social"
                    />
                    <ReportTab
                        id="irt"
                        label="Mapa de IRT"
                        icon={DollarSign}
                        active={activeTab}
                        onClick={setActiveTab}
                        desc="Retenção Mensal - AGT"
                    />
                    <ReportTab
                        id="ferias"
                        label="Mapa de Férias"
                        icon={Calendar}
                        active={activeTab}
                        onClick={setActiveTab}
                        desc="Plano de Gozo e Saldos"
                    />
                    <ReportTab
                        id="faltas"
                        label="Relatório Faltas"
                        icon={AlertCircle}
                        active={activeTab}
                        onClick={setActiveTab}
                        desc="Ausências e Incidências"
                    />

                    <div className="mt-8 p-4 bg-slate-50 dark:bg-zinc-900/50 rounded border-l-4 border-blue-500">
                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2">Compliance 🇦🇴</p>
                        <p className="text-[10px] font-medium leading-relaxed text-slate-500 dark:text-zinc-400">
                            Estes relatórios são gerados conforme a Lei Geral do Trabalho de Angola e as directrizes da AGT.
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9 space-y-6">
                    {!data && !loading ? (
                        <Card className="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800">
                            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                                <FileText className="text-slate-300" size={32} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pronto para gerar o relatório</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure o período e clique em gerar</p>
                        </Card>
                    ) : loading ? (
                        <Card className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-blue-600" size={32} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consolidando informações...</p>
                        </Card>
                    ) : (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                            {/* Actions Header */}
                            <div className="overflow-hidden rounded-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white">
                                            <FileText size={16} />
                                        </div>
                                        <div>
                                            <h2 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                                                Visualização do Mapa Oficial
                                            </h2>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                                                {meses.find(m => m.value === mes)?.label} / {ano} • {activeTab.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={exportToCSV} className="h-8 gap-2 text-[9px] font-bold uppercase tracking-widest border-2 border-slate-200 dark:border-zinc-700 dark:text-slate-200">
                                            <Download size={14} className="text-blue-500" /> EXPORTAR CSV
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => {
                                            const type = activeTab === 'inss' ? DocumentType.INSS_MAP
                                                : activeTab === 'irt' ? DocumentType.IRT_MAP
                                                    : activeTab === 'ferias' ? DocumentType.VACATION_MAP
                                                        : DocumentType.ABSENCE_REPORT;
                                            DocumentService.generate(type, ExportFormat.XLSX, data, { mes, ano });
                                        }} className="h-8 gap-2 text-[9px] font-bold uppercase tracking-widest border-2 border-slate-200 dark:border-zinc-700 dark:text-emerald-500">
                                            <Download size={14} className="text-emerald-500" /> EXCEL
                                        </Button>
                                        <Button size="sm" onClick={() => {
                                            const type = activeTab === 'inss' ? DocumentType.INSS_MAP
                                                : activeTab === 'irt' ? DocumentType.IRT_MAP
                                                    : activeTab === 'ferias' ? DocumentType.VACATION_MAP
                                                        : DocumentType.ABSENCE_REPORT;
                                            DocumentService.generate(type, ExportFormat.PDF, data, { mes, ano });
                                        }} className="h-8 gap-2 text-[9px] font-bold uppercase tracking-widest bg-blue-600 text-white">
                                            <Download size={14} /> EXPORTAR PDF
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Dynamic Content */}
                                    {activeTab === 'inss' && <INSSView data={data} />}
                                    {activeTab === 'irt' && <IRTView data={data} />}
                                    {activeTab === 'ferias' && <FeriasView data={data} />}
                                    {activeTab === 'faltas' && <FaltasView data={data} />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ReportTab({ id, label, icon: Icon, active, onClick, desc }: any) {
    const isActive = active === id;
    return (
        <button
            onClick={() => onClick(id)}
            className={`w-full group relative text-left p-4 rounded-md transition-all border-l-4 ${isActive
                ? "bg-white dark:bg-zinc-900 border-blue-600 shadow-sm ring-1 ring-slate-200 dark:ring-zinc-800"
                : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-zinc-900/50"
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded flex items-center justify-center transition-colors ${isActive ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-zinc-800 text-slate-400"
                    }`}>
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <p className={`text-[10px] font-black uppercase tracking-tight ${isActive ? "text-blue-600" : "text-slate-600 dark:text-zinc-400"}`}>
                        {label}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-60">
                        {desc}
                    </p>
                </div>
                {isActive && <ChevronRight size={14} className="text-blue-600" />}
            </div>
        </button>
    );
}

// Sub-components for views
function INSSView({ data }: { data: any }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard title="Contribuição Trab. (3%)" value={data.totais?.trabalhador} color="text-amber-600" />
                <MetricCard title="Contribuição Emp. (8%)" value={data.totais?.empresa} color="text-blue-600" />
                <MetricCard title="Montante Total (11%)" value={data.totais?.total} color="text-emerald-600" />
            </div>

            <div className="overflow-hidden border border-slate-100 dark:border-zinc-800 rounded">
                <table className="w-full text-[10px] text-left">
                    <thead className="bg-slate-50 dark:bg-zinc-900 font-black uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">
                        <tr>
                            <th className="py-3 px-4">Funcionário / Nº INSS</th>
                            <th className="py-3 px-4 text-right">Base Incidência</th>
                            <th className="py-3 px-4 text-right">3% (Trab)</th>
                            <th className="py-3 px-4 text-right">8% (Emp)</th>
                            <th className="py-3 px-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {data.linhas?.map((l: any, i: number) => (
                            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                <td className="py-3 px-4">
                                    <p className="font-black uppercase text-[var(--text-primary)]">{l.funcionario.nome}</p>
                                    <p className="text-[8px] font-bold text-slate-400 tracking-widest">{l.funcionario.numero_inss || 'SEM REGISTO'}</p>
                                </td>
                                <td className="py-3 px-4 text-right font-bold text-slate-500">{formatCurrency(l.base_incidencia)}</td>
                                <td className="py-3 px-4 text-right font-black text-amber-600">{formatCurrency(l.trabalhador_3)}</td>
                                <td className="py-3 px-4 text-right font-black text-blue-600">{formatCurrency(l.empresa_8)}</td>
                                <td className="py-3 px-4 text-right font-black text-emerald-600">{formatCurrency(l.total_11)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function IRTView({ data }: { data: any }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard title="Total Retido na Fonte" value={data.totalIRT} color="text-rose-600" />
                <div className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded flex items-center gap-4 border-l-4 border-rose-500">
                    <ShieldCheck className="text-rose-600" size={24} />
                    <div>
                        <p className="text-[10px] font-black uppercase text-rose-600">Confirmação AGT</p>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Valores prontos para liquidação</p>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden border border-slate-100 dark:border-zinc-800 rounded">
                <table className="w-full text-[10px] text-left">
                    <thead className="bg-slate-50 dark:bg-zinc-900 font-black uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">
                        <tr>
                            <th className="py-3 px-4">Funcionário / NIF</th>
                            <th className="py-3 px-4 text-right">Rend. Bruto</th>
                            <th className="py-3 px-4 text-right">Mat. Colectável</th>
                            <th className="py-3 px-4 text-right">IRT Retido</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {data.linhas?.map((l: any, i: number) => (
                            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                <td className="py-3 px-4">
                                    <p className="font-black uppercase text-[var(--text-primary)]">{l.funcionario.nome}</p>
                                    <p className="text-[8px] font-bold text-slate-400 tracking-widest">NIF: {l.funcionario.nif || '999999999'}</p>
                                </td>
                                <td className="py-3 px-4 text-right font-bold text-slate-500">{formatCurrency(l.rendimento_bruto)}</td>
                                <td className="py-3 px-4 text-right font-bold text-slate-500">{formatCurrency(l.materia_colectavel)}</td>
                                <td className="py-3 px-4 text-right font-black text-rose-600">{formatCurrency(l.irt_retido)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function FeriasView({ data }: { data: any }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Planeamento de Gozo do Mês</h3>
            {data.emFerias?.length === 0 ? (
                <div className="py-12 text-center bg-slate-50/50 dark:bg-zinc-900/50 rounded-sm italic text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                    Nenhum colaborador em período de gozo registado.
                </div>
            ) : (
                <div className="overflow-hidden border border-slate-100 dark:border-zinc-800 rounded">
                    <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 dark:bg-zinc-900 font-black uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">
                            <tr>
                                <th className="py-3 px-4">Colaborador</th>
                                <th className="py-3 px-4">Cargo</th>
                                <th className="py-3 px-4">Período</th>
                                <th className="py-3 px-4 text-right">Duração</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            {data.emFerias?.map((f: any, i: number) => (
                                <tr key={i}>
                                    <td className="py-3 px-4 font-black uppercase text-[var(--text-primary)]">{f.funcionario.nome}</td>
                                    <td className="py-3 px-4 text-slate-500 font-bold uppercase">{f.funcionario.cargo?.nome}</td>
                                    <td className="py-3 px-4 text-[9px] font-bold uppercase tracking-tighter">
                                        {new Date(f.data_inicio).toLocaleDateString()} ▸ {new Date(f.data_fim).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-right font-black text-blue-600 uppercase">{f.dias_uteis} Dias Úteis</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

function FaltasView({ data }: { data: any }) {
    const faltas = data?.faltas || [];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Histórico de Incidências e Absenteísmo</h3>
            {faltas.length === 0 ? (
                <div className="py-12 text-center bg-emerald-50/20 dark:bg-emerald-900/10 rounded-sm italic text-emerald-600 text-[10px] uppercase font-bold tracking-widest">
                    Assiduidade perfeita para este período.
                </div>
            ) : (
                <div className="overflow-hidden border border-slate-100 dark:border-zinc-800 rounded">
                    <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 dark:bg-zinc-900 font-black uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">
                            <tr>
                                <th className="py-3 px-4">Data</th>
                                <th className="py-3 px-4">Colaborador</th>
                                <th className="py-3 px-4">Classificação</th>
                                <th className="py-3 px-4">Observações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            {faltas.map((f: any, i: number) => (
                                <tr key={i}>
                                    <td className="py-3 px-4 font-bold text-slate-500">{new Date(f.data).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 font-black uppercase text-[var(--text-primary)]">{f.funcionario.nome}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-[2px] text-[8px] font-black tracking-widest ${f.status === 'FALTA_I' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {f.status === 'FALTA_I' ? 'INJUSTIFICADA' : 'JUSTIFICADA'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 italic text-slate-400 font-medium">{f.observacao || 'SEM ANOTAÇÃO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

function MetricCard({ title, value, color }: any) {
    return (
        <div className="px-5 py-6 rounded border-2 border-slate-50 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5">
                <ShieldCheck size={48} className={color} />
            </div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">{title}</p>
            <p className={`text-xl font-black mt-2 tracking-tighter ${color}`}>{formatCurrency(value || 0)}</p>
        </div>
    )
}
