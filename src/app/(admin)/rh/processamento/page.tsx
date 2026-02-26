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
            className: "w-32"
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
