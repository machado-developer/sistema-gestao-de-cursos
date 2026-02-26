"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatCard } from "@/components/dashboard/StatCard";
import {
    Plus,
    Search,
    TrendingDown,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Calendar,
    FileText,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

export default function DescontosPage() {
    const [descontos, setDescontos] = useState<any[]>([]);
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Form
    const [formData, setFormData] = useState({
        funcionarioId: "",
        valor: 0,
        mes_referencia: new Date().getMonth() + 1,
        ano_referencia: new Date().getFullYear(),
        tipo: "OUTRO",
        motivo: "",
        numeroDiasFalta: 0
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [descontosRes, funcionariosRes] = await Promise.all([
                fetch("/api/rh/descontos"),
                fetch("/api/rh/funcionarios")
            ]);

            let descontosData = [];
            let funcionariosData = [];

            if (descontosRes.ok) {
                descontosData = await descontosRes.json();
            }

            if (funcionariosRes.ok) {
                funcionariosData = await funcionariosRes.json();
            }

            if (Array.isArray(descontosData)) {
                setDescontos(descontosData);
            }

            if (Array.isArray(funcionariosData)) {
                setFuncionarios(funcionariosData.filter((f: any) => f.status === "ATIVO"));
            }
        } catch (error) {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        if (!formData.funcionarioId || formData.valor <= 0) {
            toast.error("Preencha os campos obrigatórios");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/rh/descontos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error();

            toast.success("Desconto registado com sucesso");
            setIsModalOpen(false);
            setFormData({
                funcionarioId: "",
                valor: 0,
                mes_referencia: new Date().getMonth() + 1,
                ano_referencia: new Date().getFullYear(),
                tipo: "OUTRO",
                motivo: "",
                numeroDiasFalta: 0
            });
            fetchData();
        } catch (error) {
            toast.error("Erro ao registar desconto");
        } finally {
            setSubmitting(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/rh/descontos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            if (!res.ok) throw new Error();

            toast.success(`Desconto ${status.toLowerCase()} com sucesso`);
            fetchData();
        } catch (error) {
            toast.error("Erro ao atualizar status");
        }
    };

    const columns: Column<any>[] = [
        {
            key: "funcionario",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[var(--surface-color)] flex items-center justify-center text-rose-500 border border-[var(--border-color)]">
                        <User size={16} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-[var(--text-primary)]">{item.funcionario?.nome}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                                {item.tipo}
                                {item.tipo === "FALTA" && item.numeroDiasFalta > 0 && ` (${item.numeroDiasFalta} Dias)`}
                            </span>
                            {item.observacao === "GERADO_AUTOMATICAMENTE" && (
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 font-bold uppercase tracking-tighter">Automático</span>
                            )}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "valor",
            header: "Valor do Desconto",
            render: (item) => (
                <div className="font-semibold text-rose-600 dark:text-rose-400">
                    -{formatCurrency(Number(item.valor))}
                </div>
            ),
        },
        {
            key: "referencia",
            header: "Referência",
            render: (item) => (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar size={14} />
                    {item.mes_referencia}/{item.ano_referencia}
                </div>
            ),
        },
        {
            key: "status",
            header: "Estado",
            render: (item) => {
                let colorClass = "";
                let icon = null;

                switch (item.status) {
                    case "PENDENTE":
                        colorClass = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
                        icon = <Clock size={12} />;
                        break;
                    case "APROVADO":
                        colorClass = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
                        icon = <CheckCircle size={12} />;
                        break;
                    case "REJEITADO":
                        colorClass = "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
                        icon = <XCircle size={12} />;
                        break;
                    case "PROCESSADO":
                        colorClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
                        icon = <CheckCircle size={12} />;
                        break;
                }

                return (
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold ${colorClass}`}>
                        {icon}
                        {item.status}
                    </span>
                );
            }
        },
        {
            key: "motivo",
            header: "Motivo",
            render: (item) => (
                <div className="text-sm text-slate-500 max-w-[200px] truncate" title={item.motivo}>
                    {item.motivo || '---'}
                </div>
            ),
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                item.status === "PENDENTE" && item.observacao !== "GERADO_AUTOMATICAMENTE" && (
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200 h-7"
                            onClick={() => handleStatusUpdate(item.id, "APROVADO")}
                            title="Aprovar"
                        >
                            <CheckCircle size={14} />
                        </Button>
                        <Button
                            size="sm"
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200 h-7"
                            onClick={() => handleStatusUpdate(item.id, "REJEITADO")}
                            title="Rejeitar"
                        >
                            <XCircle size={14} />
                        </Button>
                    </div>
                )
            ),
            className: "w-24"
        }
    ];

    const filteredData = descontos.filter((a: any) => {
        const matchesSearch = a.funcionario?.nome.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !statusFilter || a.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <TrendingDown className="text-rose-500" />
                        Descontos Salariais
                    </h1>
                    <p className="text-sm text-slate-500">Gestão de faltas, danos e sanções disciplinares</p>
                </div>
                <Button
                    className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={18} className="mr-2" /> Registar Desconto
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Total em Pendente"
                    value={formatCurrency(descontos.filter(a => a.status === "PENDENTE").reduce((acc, curr) => acc + Number(curr.valor), 0))}
                    icon={Clock}
                    variant="orange"
                    subStats={[{ label: 'Aguardando', value: descontos.filter(a => a.status === 'PENDENTE').length }]}
                />
                <StatCard
                    title="Descontos este Mês"
                    value={formatCurrency(descontos.filter(a => a.status === "APROVADO").reduce((acc, curr) => acc + Number(curr.valor), 0))}
                    icon={AlertCircle}
                    variant="red"
                    subStats={[{ label: 'Aprovados', value: descontos.filter(a => a.status === 'APROVADO').length }]}
                />
                <StatCard
                    title="Total Processado"
                    value={formatCurrency(descontos.filter(a => a.status === "PROCESSADO").reduce((acc, curr) => acc + Number(curr.valor), 0))}
                    icon={FileText}
                    variant="blue"
                    subStats={[{ label: 'Histórico', value: 'Global' }]}
                />
            </div>

            {/* Filters */}
            <Card className="p-4 border border-white/10 bg-zinc-900/50">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                            placeholder="Pesquisar colaborador..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-48">
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={[
                                { value: "PENDENTE", label: "Pendentes" },
                                { value: "APROVADO", label: "Aprovados" },
                                { value: "REJEITADO", label: "Rejeitados" },
                                { value: "PROCESSADO", label: "Processados" }
                            ]}
                            placeholder="Status"
                        />
                    </div>
                </div>
            </Card>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                keyExtractor={(item) => item.id}
                loading={loading}
                emptyState={
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                        <TrendingDown size={48} className="opacity-20 mb-4" />
                        <p>Nenhum desconto registado</p>
                    </div>
                }
            />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registar Novo Desconto"
            >
                <div className="space-y-4">
                    <Select
                        label="Colaborador"
                        value={formData.funcionarioId}
                        onChange={(val) => setFormData({ ...formData, funcionarioId: val })}
                        options={funcionarios.map(f => ({ value: f.id, label: f.nome }))}
                        placeholder="Selecione o colaborador"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Tipo de Desconto"
                            value={formData.tipo}
                            onChange={(val) => setFormData({ ...formData, tipo: val })}
                            options={[
                                { value: "FALTA", label: "Faltas (Por Dia)" },
                                { value: "DISCIPLINAR", label: "Sancção Disciplinar" },
                                { value: "DANO", label: "Dano Material" },
                                { value: "OUTRO", label: "Outro" }
                            ]}
                        />
                        {formData.tipo === "FALTA" ? (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Número de Dias</label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={formData.numeroDiasFalta}
                                    onChange={(e) => setFormData({ ...formData, numeroDiasFalta: Number(e.target.value) })}
                                    placeholder="Ex: 2"
                                />
                            </div>
                        ) : (
                            <CurrencyInput
                                label="Valor do Desconto"
                                value={formData.valor}
                                onChange={(val) => setFormData({ ...formData, valor: val })}
                            />
                        )}
                    </div>

                    {formData.tipo === "FALTA" && formData.numeroDiasFalta > 0 && formData.funcionarioId && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg">
                            <p className="text-[10px] uppercase font-black text-amber-600 mb-1">Impacto Estimado (Calculado)</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 font-bold">Valor a Descontar:</span>
                                <span className="text-sm font-black text-rose-600">
                                    {(() => {
                                        const func = funcionarios.find(f => f.id === formData.funcionarioId);
                                        const salario = func?.contratos?.[0]?.salario_base ? Number(func.contratos[0].salario_base) : 0;
                                        return formatCurrency((salario / 30) * formData.numeroDiasFalta);
                                    })()}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Mês Referência"
                            type="number"
                            min={1} max={12}
                            value={formData.mes_referencia}
                            onChange={(e) => setFormData({ ...formData, mes_referencia: Number(e.target.value) })}
                        />
                        <Input
                            label="Ano Referência"
                            type="number"
                            value={formData.ano_referencia}
                            onChange={(e) => setFormData({ ...formData, ano_referencia: Number(e.target.value) })}
                        />
                    </div>

                    <Input
                        label="Motivo/Descrição"
                        value={formData.motivo}
                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                        placeholder="Ex: Falta dia 15 sem justiticação"
                    />

                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button
                            className="bg-rose-600 text-white"
                            onClick={handleCreate}
                            disabled={submitting}
                        >
                            {submitting ? "Processando..." : "Registar Desconto"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
