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
    TrendingDown,
    Eye,
    Plus,
    Mail,
    Send
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import { EmailRecipientsModal } from "@/components/rh/EmailRecipientsModal";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import Link from "next/link";
import { DocumentService, DocumentType, ExportFormat } from "@/services/DocumentService";

export default function ProcessamentoPage() {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [relatorio, setRelatorio] = useState<any>(null);
    const [empresa, setEmpresa] = useState<any>(null);

    // Quick Deduction State
    const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
    const [selectedFuncionario, setSelectedFuncionario] = useState<any>(null);
    const [submittingDeduction, setSubmittingDeduction] = useState(false);
    const [deductionData, setDeductionData] = useState({
        valor: 0,
        tipo: "OUTRO",
        motivo: "",
        numeroDiasFalta: 0
    });

    const [selectedFolhaIds, setSelectedFolhaIds] = useState<string[]>([]);
    const [sendingEmails, setSendingEmails] = useState(false);
    const [downloadingReceipts, setDownloadingReceipts] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailRecipientsData, setEmailRecipientsData] = useState<any[]>([]);

    // Adjustment State
    const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
    const [selectedFolha, setSelectedFolha] = useState<any>(null);
    const [submittingAdjustment, setSubmittingAdjustment] = useState(false);
    const [ajustes, setAjustes] = useState<any>({
        salario_base: 0,
        total_subsidios_tributaveis: 0,
        total_subsidios_isentos: 0,
        total_horas_extras: 0,
        total_faltas: 0,
        total_adiantamentos: 0,
        outros_descontos: 0,
        motivo: ""
    });

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

    const handleOpenEmailModal = (folhas?: any[]) => {
        const targetFolhas = folhas || relatorio?.folhas.filter((f: any) => selectedFolhaIds.includes(f.id)) || [];

        if (targetFolhas.length === 0) {
            toast.error("Nenhum funcionário selecionado");
            return;
        }

        const data = targetFolhas.map((f: any) => ({
            folhaId: f.id,
            nome: f.funcionario.nome,
            email: f.funcionario.email || ""
        }));

        setEmailRecipientsData(data);
        setIsEmailModalOpen(true);
    };

    const handleSendEmailsWithOverrides = async (recipients: { folhaId: string, email: string }[]) => {
        setSendingEmails(true);
        try {
            const res = await fetch("/api/rh/folhas/bulk-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    folhaIds: recipients.map(r => r.folhaId),
                    recipients
                }),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success("E-mails agendados", {
                    description: `${data.jobsCount} comprovativos foram adicionados à fila de envio.`
                });
                setSelectedFolhaIds([]);
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Erro ao agendar e-mails");
            throw error;
        } finally {
            setSendingEmails(false);
        }
    };

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

    const handleQuickDeduction = async () => {
        if (!selectedFuncionario) return;

        const isFalta = deductionData.tipo === "FALTA";

        if (isFalta && (deductionData.numeroDiasFalta <= 0 || deductionData.numeroDiasFalta > 30)) {
            toast.error("Número de dias inválido (1-30)");
            return;
        }

        if (!isFalta && deductionData.valor <= 0) {
            toast.error("Preencha o valor do desconto");
            return;
        }

        setSubmittingDeduction(true);
        try {
            const res = await fetch("/api/rh/descontos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcionarioId: selectedFuncionario.id,
                    valor: isFalta ? 0 : deductionData.valor, // API calcula se for FALTA
                    numeroDiasFalta: isFalta ? deductionData.numeroDiasFalta : undefined,
                    mes_referencia: mes,
                    ano_referencia: ano,
                    tipo: deductionData.tipo,
                    motivo: isFalta ? `Faltas: ${deductionData.numeroDiasFalta} dias. ${deductionData.motivo}` : deductionData.motivo,
                    status: "APROVADO" // Auto-aprovado via quick action
                })
            });

            if (!res.ok) throw new Error();

            toast.success("Desconto aplicado com sucesso");
            setIsDeductionModalOpen(false);
            setDeductionData({ valor: 0, tipo: "OUTRO", motivo: "", numeroDiasFalta: 0 });
            fetchRelatorio();
        } catch (error) {
            toast.error("Erro ao aplicar desconto");
        } finally {
            setSubmittingDeduction(false);
        }
    };

    const handleBulkDownload = async () => {
        if (selectedFolhaIds.length === 0) return;

        setDownloadingReceipts(true);
        try {
            const receiptsData = [];
            for (const id of selectedFolhaIds) {
                const res = await fetch(`/api/rh/processamento/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    receiptsData.push(data);
                }
            }

            if (receiptsData.length > 0) {
                await DocumentService.generate(
                    DocumentType.PAYROLL_RECEIPT_BULK as any,
                    ExportFormat.PDF,
                    receiptsData,
                    { companyInfo: relatorio?.companyInfo }
                );
                toast.success(`${receiptsData.length} recibos processados para download`);
            }
        } catch (error) {
            toast.error("Erro ao gerar recibos em lote");
        } finally {
            setDownloadingReceipts(false);
        }
    };

    const handleOpenAdjustmentModal = async (folha: any) => {
        try {
            const res = await fetch(`/api/rh/processamento/${folha.id}`);
            if (res.ok) {
                const data = await res.json();
                setSelectedFolha(data);
                setAjustes({
                    salario_base: Number(data.salario_base),
                    total_subsidios_tributaveis: Number(data.total_subsidios_tributaveis),
                    total_subsidios_isentos: Number(data.total_subsidios_isentos),
                    total_horas_extras: Number(data.total_horas_extras),
                    total_faltas: Number(data.total_faltas),
                    total_adiantamentos: Number(data.total_adiantamentos),
                    outros_descontos: Number(data.outros_descontos),
                    motivo: ""
                });
                setIsAdjustmentModalOpen(true);
            }
        } catch (error) {
            toast.error("Erro ao carregar detalhes da folha");
        }
    };

    const handleAdjustmentSubmit = async () => {
        if (!ajustes.motivo) {
            toast.error("O motivo é obrigatório para registar o ajuste");
            return;
        }

        setSubmittingAdjustment(true);
        try {
            const camposParaAjustar = [
                "salario_base", "total_subsidios_tributaveis", "total_subsidios_isentos",
                "total_horas_extras", "total_faltas", "total_adiantamentos", "outros_descontos"
            ];

            const listaAjustes = camposParaAjustar
                .filter(campo => Number(selectedFolha[campo]) !== Number(ajustes[campo]))
                .map(campo => ({
                    campo,
                    valorNovo: Number(ajustes[campo]),
                    motivo: ajustes.motivo
                }));

            if (listaAjustes.length === 0) {
                toast.error("Nenhuma alteração detectada");
                return;
            }

            const res = await fetch(`/api/rh/folhas/${selectedFolha.id}/ajustar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ajustes: listaAjustes })
            });

            if (!res.ok) throw new Error();

            toast.success("Folha ajustada com sucesso");
            setIsAdjustmentModalOpen(false);
            fetchRelatorio();
        } catch (error) {
            toast.error("Erro ao processar ajuste");
        } finally {
            setSubmittingAdjustment(false);
        }
    };



    const columns: Column<any>[] = [
        {
            key: "selection",
            header: (
                <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-2 border-[var(--border-color)] bg-transparent"
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedFolhaIds(relatorio?.folhas.map((f: any) => f.id) || []);
                        } else {
                            setSelectedFolhaIds([]);
                        }
                    }}
                    checked={selectedFolhaIds.length > 0 && selectedFolhaIds.length === relatorio?.folhas?.length}
                />
            ),
            render: (item) => (
                <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-2 border-[var(--border-color)] bg-transparent"
                    checked={selectedFolhaIds.includes(item.id)}
                    onChange={() => {
                        setSelectedFolhaIds(prev =>
                            prev.includes(item.id)
                                ? prev.filter(id => id !== item.id)
                                : [...prev, item.id]
                        );
                    }}
                />
            ),
            className: "w-10 px-4"
        },
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center relative">
                        <User size={14} className="text-slate-500" />
                        {item.ajustes?.length > 0 && (
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" title="Possui ajustes manuais" />
                        )}
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
            key: "faltas",
            header: "Faltas",
            render: (item: any) => (
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-rose-600">
                        {formatCurrency(item.total_faltas)}
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">
                        {item.faltas_count || 0} Dias
                    </span>
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
                <div className="flex justify-end gap-1 px-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        title="Ajustar Manualmente"
                        onClick={() => handleOpenAdjustmentModal(item)}
                    >
                        <Calculator size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        title="Registar Desconto Ágil"
                        onClick={() => {
                            setSelectedFuncionario(item.funcionario);
                            setIsDeductionModalOpen(true);
                        }}
                    >
                        <TrendingDown size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="Enviar por E-mail"
                        onClick={() => handleOpenEmailModal([item])}
                    >
                        <Send size={16} />
                    </Button>
                    <Link href={`/rh/processamento/recibo/${item.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Ver Recibo">
                            <Eye size={18} />
                        </Button>
                    </Link>
                </div>
            ),
            className: "w-40"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-[var(--border-color)] pb-4 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
                <div>
                    <h1 className="text-xl font-black text-app-text tracking-tighter uppercase leading-none mb-1">
                        Gestão de Processamento Salarial
                    </h1>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest leading-none">Calculo Integral • Legislação Angolana 🇦🇴</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">
                    <div className="flex gap-1 w-full sm:w-auto">
                        <select
                            value={mes}
                            onChange={(e) => setMes(Number(e.target.value))}
                            className="h-9 px-3 bg-[var(--surface-color)] border-2 border-[var(--border-color)] rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
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

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            options={exportOptions}
                            placeholder="Exportar Dados..."
                            onChange={handleExport}
                            className="w-full sm:w-48 h-9 [&>button]:h-9 [&>button]:text-[10px] [&>button]:font-black [&>button]:uppercase"
                        />

                        <Button
                            onClick={handleProcessar}
                            disabled={loading}
                            className="bg-blue-600 h-9 px-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-blue-800 gap-2 flex-1 sm:flex-none"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                            {loading ? "..." : "EXECUTAR"}
                        </Button>
                    </div>
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
                    <div className="flex items-center gap-3">
                        {selectedFolhaIds.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-[9px] font-black uppercase text-blue-600 border-blue-500/30 bg-blue-500/5 gap-2 hover:bg-blue-500/10"
                                    onClick={() => handleOpenEmailModal()}
                                    disabled={sendingEmails}
                                >
                                    {sendingEmails ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                                    {sendingEmails ? "PROCESSANDO..." : `ENVIAR (${selectedFolhaIds.length})`}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-3 text-[9px] font-black uppercase text-emerald-600 border-emerald-500/30 bg-emerald-500/5 gap-2 hover:bg-emerald-500/10"
                                    onClick={handleBulkDownload}
                                    disabled={downloadingReceipts}
                                >
                                    {downloadingReceipts ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    {downloadingReceipts ? "GERANDO..." : `BAIXAR RECIBOS (${selectedFolhaIds.length})`}
                                </Button>
                            </div>
                        )}
                        <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Período: {meses.find(m => m.value === mes)?.label} / {ano}</p>
                    </div>
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

            {/* Adjustment Modal */}
            <Modal
                isOpen={isAdjustmentModalOpen}
                onClose={() => setIsAdjustmentModalOpen(false)}
                title={`Ajuste Manual: ${selectedFolha?.funcionario?.nome}`}
            >
                <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CurrencyInput
                            label="Salário Base"
                            value={ajustes.salario_base}
                            onChange={(val) => setAjustes({ ...ajustes, salario_base: val })}
                        />
                        <CurrencyInput
                            label="Subsídios Tributáveis"
                            value={ajustes.total_subsidios_tributaveis}
                            onChange={(val) => setAjustes({ ...ajustes, total_subsidios_tributaveis: val })}
                        />
                        <CurrencyInput
                            label="Subsídios Isentos"
                            value={ajustes.total_subsidios_isentos}
                            onChange={(val) => setAjustes({ ...ajustes, total_subsidios_isentos: val })}
                        />
                        <CurrencyInput
                            label="Horas Extras"
                            value={ajustes.total_horas_extras}
                            onChange={(val) => setAjustes({ ...ajustes, total_horas_extras: val })}
                        />
                        <CurrencyInput
                            label="Faltas"
                            value={ajustes.total_faltas}
                            onChange={(val) => setAjustes({ ...ajustes, total_faltas: val })}
                        />
                        <CurrencyInput
                            label="Adiantamentos"
                            value={ajustes.total_adiantamentos}
                            onChange={(val) => setAjustes({ ...ajustes, total_adiantamentos: val })}
                        />
                        <CurrencyInput
                            label="Outros Descontos"
                            value={ajustes.outros_descontos}
                            onChange={(val) => setAjustes({ ...ajustes, outros_descontos: val })}
                        />
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg">
                        <h4 className="text-[10px] font-black uppercase text-blue-600 mb-2">Resumo do Ajuste</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Novo Bruto:</span>
                                <span className="font-bold text-[var(--text-primary)]">
                                    {formatCurrency(Number(ajustes.salario_base) + Number(ajustes.total_subsidios_tributaveis) + Number(ajustes.total_horas_extras) - Number(ajustes.total_faltas))}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Estimativa Líquido:</span>
                                <span className="font-bold text-emerald-600">
                                    {/* Simplificação visual; o cálculo real será feito no backend */}
                                    ~ {formatCurrency(Number(ajustes.salario_base) + Number(ajustes.total_subsidios_tributaveis) + Number(ajustes.total_horas_extras) - Number(ajustes.total_faltas) - Number(ajustes.outros_descontos) - Number(ajustes.total_adiantamentos))}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Input
                        label="Motivo do Ajuste (Obrigatório)"
                        value={ajustes.motivo}
                        onChange={(e) => setAjustes({ ...ajustes, motivo: e.target.value })}
                        placeholder="Ex: Correção de bónus de desempenho, ajuste de faltas justificadas..."
                        required
                    />

                    {/* History */}
                    {selectedFolha?.ajustes?.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 mb-3">
                                <Calculator size={14} /> Histórico de Ajustes
                            </h4>
                            <div className="space-y-3">
                                {selectedFolha.ajustes.map((h: any) => (
                                    <div key={h.id} className="text-[9px] p-2 bg-slate-50 dark:bg-zinc-800/50 rounded border border-slate-100 dark:border-zinc-800">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-blue-600 uppercase tracking-tighter">Campo: {h.campo}</span>
                                            <span className="text-slate-400">{new Date(h.createdAt).toLocaleString()}</span>
                                        </div>
                                        <p className="mb-1"><span className="text-slate-500">De:</span> {formatCurrency(h.valorAnterior)} <span className="text-slate-500 mx-1">→</span> <span className="text-slate-500">Para:</span> <span className="font-bold">{formatCurrency(h.valorNovo)}</span></p>
                                        <p className="italic text-slate-500 underline underline-offset-2 tracking-tight">Motivo: {h.motivo}</p>
                                        <p className="mt-1 text-[8px] text-slate-400 font-bold">Por: {h.alteradoPor?.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-6 flex justify-end gap-2 sticky bottom-0 bg-[var(--surface-color)] dark:bg-zinc-900 pb-2">
                        <Button variant="ghost" onClick={() => setIsAdjustmentModalOpen(false)}>Sair</Button>
                        <Button
                            className="bg-amber-600 text-white hover:bg-amber-700"
                            onClick={handleAdjustmentSubmit}
                            disabled={submittingAdjustment}
                        >
                            {submittingAdjustment ? "Processando..." : "Confirmar e Recalcular"}
                        </Button>
                    </div>
                </div>
            </Modal>



            {/* Quick Deduction Modal */}
            <Modal
                isOpen={isDeductionModalOpen}
                onClose={() => setIsDeductionModalOpen(false)}
                title={`Desconto Rápido: ${selectedFuncionario?.nome}`}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Tipo de Desconto"
                            value={deductionData.tipo}
                            onChange={(val) => setDeductionData({ ...deductionData, tipo: val })}
                            options={[
                                { value: "FALTA", label: "Faltas (Por Dia)" },
                                { value: "DISCIPLINAR", label: "Sancção Disciplinar" },
                                { value: "DANO", label: "Dano Material" },
                                { value: "OUTRO", label: "Outro" }
                            ]}
                        />

                        {deductionData.tipo === "FALTA" ? (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Número de Dias</label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={deductionData.numeroDiasFalta}
                                    onChange={(e) => setDeductionData({ ...deductionData, numeroDiasFalta: Number(e.target.value) })}
                                    placeholder="Ex: 2"
                                />
                            </div>
                        ) : (
                            <CurrencyInput
                                label="Valor do Desconto"
                                value={deductionData.valor}
                                onChange={(val) => setDeductionData({ ...deductionData, valor: val })}
                            />
                        )}
                    </div>

                    {deductionData.tipo === "FALTA" && deductionData.numeroDiasFalta > 0 && selectedFuncionario && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg">
                            <p className="text-[10px] uppercase font-black text-amber-600 mb-1">Impacto Estimado</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 font-bold">Valor a Descontar:</span>
                                <span className="text-sm font-black text-rose-600">
                                    {(() => {
                                        const folha = relatorio?.folhas.find((f: any) => f.funcionarioId === selectedFuncionario.id);
                                        const base = folha ? Number(folha.salario_base) : 0;
                                        return formatCurrency((base / 30) * deductionData.numeroDiasFalta);
                                    })()}
                                </span>
                            </div>
                        </div>
                    )}

                    <Input
                        label="Motivo / Descrição"
                        value={deductionData.motivo}
                        onChange={(e) => setDeductionData({ ...deductionData, motivo: e.target.value })}
                        placeholder="Ex: Atraso recorrente, Dano em equipamento..."
                    />

                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsDeductionModalOpen(false)}>Cancelar</Button>
                        <Button
                            className="bg-rose-600 text-white"
                            onClick={handleQuickDeduction}
                            disabled={submittingDeduction}
                        >
                            {submittingDeduction ? "Processando..." : "Confirmar Desconto"}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Email Recipients Modal */}
            {isEmailModalOpen && (
                <EmailRecipientsModal
                    isOpen={isEmailModalOpen}
                    onClose={() => setIsEmailModalOpen(false)}
                    initialRecipients={emailRecipientsData}
                    onConfirm={handleSendEmailsWithOverrides}
                />
            )}
        </div>
    );
}
