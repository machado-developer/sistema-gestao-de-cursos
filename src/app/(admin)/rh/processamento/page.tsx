"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
import { DataTable, Column } from "@/components/ui/DataTable";
import {
    Play,
    CheckCircle,
    AlertCircle,
    Loader2,
    Calendar,
    Wallet,
    ShieldCheck,
    Receipt,
    FileText,
    Download,
    Printer,
    User,
    FileSpreadsheet,
    Calculator,
    Banknote,
    Eye
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import Link from "next/link";
import { DocumentService, DocumentType, ExportFormat } from "@/services/DocumentService";

export default function ProcessamentoPage() {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [relatorio, setRelatorio] = useState<any>(null);
    const [empresa, setEmpresa] = useState<any>(null);

    useEffect(() => {
        fetch('/api/configuracoes/empresa').then(res => res.json()).then(setEmpresa);
    }, []);

    const exportOptions = [
        { value: "XLSX_FULL", label: "Folha Completa (Excel)" },
        { value: "XLSX_LAYOUT_B", label: "Layout B (Excel Interno)" },
        { value: "PDF_FULL", label: "Folha Completa (PDF)" },
        { value: "CSV_IRT", label: "Mapa IRT (CSV)" },
        { value: "CSV_INSS", label: "Mapa INSS (CSV)" },
    ];

    const handleExport = (value: string) => {
        if (!relatorio) return toast.error("Gere ou carregue o relatório primeiro");

        const options = { mes, ano, companyInfo: empresa };

        switch (value) {
            case "XLSX_FULL":
                DocumentService.generate(DocumentType.PAYROLL_SHEET, ExportFormat.XLSX, relatorio, options);
                break;
            case "PDF_FULL":
                DocumentService.generate(DocumentType.PAYROLL_SHEET, ExportFormat.PDF, relatorio, options);
                break;
            case "CSV_IRT":
                DocumentService.generate(DocumentType.IRT_MAP, ExportFormat.CSV, relatorio, options);
                break;
            case "CSV_INSS":
                DocumentService.generate(DocumentType.INSS_MAP, ExportFormat.CSV, relatorio, options);
                break;
        }
    };

    const meses = [
        { value: 1, label: "Janeiro" }, { value: 2, label: "Fevereiro" },
        { value: 3, label: "Março" }, { value: 4, label: "Abril" },
        { value: 5, label: "Maio" }, { value: 6, label: "Junho" },
        { value: 7, label: "Julho" }, { value: 8, label: "Agosto" },
        { value: 9, label: "Setembro" }, { value: 10, label: "Outubro" },
        { value: 11, label: "Novembro" }, { value: 12, label: "Dezembro" },
    ];

    const anos = [2024, 2025, 2026];

    const fetchRelatorio = async () => {
        try {
            const res = await fetch(`/api/rh/processamento?mes=${mes}&ano=${ano}`);
            if (res.ok) {
                const data = await res.json();
                setRelatorio(data);
            }
        } catch (error) {
            console.error("Erro ao carregar relatório");
        }
    };

    useEffect(() => {
        fetchRelatorio();
    }, [mes, ano]);

    const handleProcessar = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/rh/processamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mes, ano }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Não foi possível processar a folha salarial.");
            }

            toast.success("Processamento concluído", {
                description: `A folha salarial de ${meses.find(m => m.value === mes)?.label} / ${ano} foi gerada e validada.`,
                icon: <Calculator className="text-emerald-500" size={16} />,
                duration: 5000
            });
            fetchRelatorio();
        } catch (error: any) {
            toast.error("Erro no Processamento", {
                description: error.message || "Verifique as presenças e configurações salariais."
            });
        } finally {
            setLoading(false);
        }
    };



    const columns: Column<any>[] = [
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                        <User size={14} className="text-slate-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-tight text-[var(--text-primary)]">
                            {item.funcionario?.nome}
                        </p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.funcionario?.bi_documento}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: "bruto",
            header: "Rendimento Bruto",
            render: (item) => (
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                    {formatCurrency(Number(item.salario_base) + Number(item.total_subsidios_tributaveis) + Number(item.total_horas_extras))}
                </span>
            )
        },
        {
            key: "descontos",
            header: "IRT / INSS",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-rose-500">IRT: {formatCurrency(item.irt_devido)}</span>
                    <span className="text-[9px] font-bold text-amber-600">INSS: {formatCurrency(item.inss_trabalhador)}</span>
                </div>
            )
        },
        {
            key: "liquido",
            header: "Líquido a Receber",
            render: (item) => (
                <span className="text-[11px] font-black text-emerald-600">
                    {formatCurrency(item.liquido_receber)}
                </span>
            )
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                <div className="flex justify-end gap-2 pr-2">
                    <Link href={`/rh/processamento/recibo/${item.id}`}>
                        <Button variant="outline" size="sm" className="h-10 w-10 p-0 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 shadow-sm" title="Ver Recibo">
                            <Eye size={22} className="text-blue-600 dark:text-blue-400" />
                        </Button>
                    </Link>
                </div>
            ),
            className: "w-28"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-[var(--border-color)] pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-app-text tracking-tighter uppercase leading-none mb-1">
                        Gestão de Processamento Salarial
                    </h1>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest leading-none">Calculo Integral • Legislação Angolana 🇦🇴</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <select
                            value={mes}
                            onChange={(e) => setMes(Number(e.target.value))}
                            className="h-9 px-3 bg-[var(--surface-color)] border-2 border-[var(--border-color)] rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {meses.map(m => <option key={m.value} value={m.value} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{m.label.toUpperCase()}</option>)}
                        </select>
                        <select
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                            className="h-9 px-3 bg-[var(--surface-color)] border-2 border-[var(--border-color)] rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {anos.map(a => <option key={a} value={a} className="bg-[var(--card-bg)] text-[var(--text-primary)]">{a}</option>)}
                        </select>
                    </div>

                    <Select
                        options={exportOptions}
                        placeholder="Exportar Dados..."
                        onChange={handleExport}
                        className="w-48 h-9 [&>button]:h-9 [&>button]:text-[10px] [&>button]:font-black [&>button]:uppercase"
                    />

                    <Button
                        onClick={handleProcessar}
                        disabled={loading}
                        className="bg-blue-600 h-9 px-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-blue-800 gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                        {loading ? "PROCESSANDO..." : "EXECUTAR FOLHA"}
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Folha Líquida"
                    value={formatCurrency(relatorio?.resumo?.totalLiquid || 0)}
                    icon={Banknote}
                    variant="blue"
                    subStats={[{ label: 'Colaboradores', value: relatorio?.resumo?.totalColaboradores || 0 }]}
                />
                <StatCard
                    title="Total IRT (AGT)"
                    value={formatCurrency(relatorio?.resumo?.totalIRT || 0)}
                    icon={ShieldCheck}
                    variant="orange"
                    subStats={[{ label: 'Imposto Retido', value: 'Mensal' }]}
                />
                <StatCard
                    title="Total INSS (Seg. Social)"
                    value={formatCurrency(relatorio?.resumo?.totalEncargosSociais || 0)}
                    icon={CheckCircle}
                    variant="green"
                    subStats={[{ label: 'Trabalhador + Empresa', value: '11%' }]}
                />
            </div>

            {/* Processed List */}
            <Card className="border border-[var(--border-color)] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--border-color)] bg-[var(--surface-color)] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-app-text">Detalhamento da Folha Salarial</h2>
                    </div>
                    <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Período: {meses.find(m => m.value === mes)?.label} / {ano}</p>
                </div>
                <DataTable
                    columns={columns}
                    data={relatorio?.folhas || []}
                    keyExtractor={(f) => f.id}
                    loading={loading}
                    className="border-none shadow-none"
                    emptyState={
                        <div className="py-24 text-center">
                            <Loader2 className="mx-auto h-12 w-12 text-slate-200 animate-spin mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aguardando Processamento...</p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
}
