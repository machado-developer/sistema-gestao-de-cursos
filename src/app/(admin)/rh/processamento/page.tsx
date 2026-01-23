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
    User
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function ProcessamentoPage() {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [relatorio, setRelatorio] = useState<any>(null);

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
            if (!res.ok) throw new Error();

            toast.success("Processamento concluído", {
                description: `A folha salarial de ${meses.find(m => m.value === mes)?.label} / ${ano} foi gerada e validada.`,
                icon: <Wallet className="text-emerald-500" size={16} />,
                duration: 5000
            });
            fetchRelatorio();
        } catch (error) {
            toast.error("Erro no Cálculo", {
                description: "Não foi possível processar a folha salarial. Verifique as presenças e cargos."
            });
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = (data: any[], type: 'IRT' | 'INSS') => {
        if (!data.length) return toast.error("Sem dados para exportar");

        let csvContent = "data:text/csv;charset=utf-8,";
        if (type === 'IRT') {
            csvContent += "NOME,BI,BASE IRT,IRT DEVIDO\n";
            data.forEach(f => {
                csvContent += `${f.funcionario.nome},${f.funcionario.bi_documento},${f.base_irt},${f.irt_devido}\n`;
            });
        } else {
            csvContent += "NOME,NUMERO INSS,BASE INSS,TRABALHADOR(3%),EMPRESA(8%)\n";
            data.forEach(f => {
                csvContent += `${f.funcionario.nome},${f.funcionario.numero_inss || ''},${f.base_inss},${f.inss_trabalhador},${f.inss_empresa}\n`;
            });
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `MAPA_${type}_${mes}_${ano}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                <div className="flex justify-end gap-1">
                    <Link href={`/rh/processamento/recibo/${item.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Ver Recibo">
                            <Receipt size={14} className="text-blue-500" />
                        </Button>
                    </Link>
                    <Link href={`/rh/processamento/recibo/${item.id}?print=true`}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Imprimir">
                            <Printer size={14} className="text-slate-400" />
                        </Button>
                    </Link>
                </div>
            ),
            className: "w-20"
        }
    ];

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter text-blue-600">
                        Gestão de Processamento Salarial
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculo Integral • Legislação Angolana 🇦🇴</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <select
                            value={mes}
                            onChange={(e) => setMes(Number(e.target.value))}
                            className="h-9 px-3 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest"
                        >
                            {meses.map(m => <option key={m.value} value={m.value}>{m.label.toUpperCase()}</option>)}
                        </select>
                        <select
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                            className="h-9 px-3 bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest"
                        >
                            {anos.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Folha Líquida"
                    value={formatCurrency(relatorio?.resumo?.totalLiquid || 0)}
                    icon={Wallet}
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
                <Card className="p-4 border-2 border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 flex flex-col justify-between">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Mapas Obrigatórios</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <Button
                            variant="outline" size="sm"
                            className="h-8 justify-start text-[9px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-900"
                            onClick={() => exportToCSV(relatorio?.folhas || [], 'IRT')}
                        >
                            <Download size={12} className="text-blue-500" /> Exportar Mapa IRT
                        </Button>
                        <Button
                            variant="outline" size="sm"
                            className="h-8 justify-start text-[9px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-900"
                            onClick={() => exportToCSV(relatorio?.folhas || [], 'INSS')}
                        >
                            <Download size={12} className="text-emerald-500" /> Exportar Mapa INSS
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Processed List */}
            <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <h2 className="text-[10px] font-black uppercase tracking-widest">Detalhamento da Folha Salarial</h2>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Período: {meses.find(m => m.value === mes)?.label} / {ano}</p>
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
