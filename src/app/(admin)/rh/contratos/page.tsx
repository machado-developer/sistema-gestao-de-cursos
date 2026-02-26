"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import {
    FileText,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    Calendar,
    Search,
    X,
    UserCircle,
    Eye,
    Loader2,
    Plus,
    Edit,
    Trash2,
    XCircle,
    BadgeCheck
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const emptyForm = {
    funcionarioId: "",
    tipo: "DETERMINADO",
    data_inicio: new Date().toISOString().slice(0, 10),
    data_fim: "",
    renovacao_automatica: false,
    salario_base: 0,
    subsidio_alimentacao: 0,
    subsidio_transporte: 0,
    subsidio_residencia: 0,
    outros_subsidios: 0,
};

export default function ContratosPage() {
    const [contratos, setContratos] = useState<any[]>([]);
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ ...emptyForm });

    // Action states
    const [renewingId, setRenewingId] = useState<string | null>(null);

    // Confirm modal
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        id: string | null;
        action: "encerrar" | "cancelar" | "delete" | null;
    }>({ isOpen: false, id: null, action: null });

    // Filters
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("VIGENTE");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contratosRes, funcsRes] = await Promise.all([
                fetch("/api/rh/contratos"),
                fetch("/api/rh/funcionarios")
            ]);
            if (contratosRes.ok) setContratos(await contratosRes.json());
            if (funcsRes.ok) {
                const data = await funcsRes.json();
                if (Array.isArray(data)) setFuncionarios(data.filter((f: any) => f.status === "ATIVO"));
            }
        } catch {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const openCreate = () => {
        setForm({ ...emptyForm });
        setEditingId(null);
        setIsModalOpen(true);
    };

    const openEdit = (item: any) => {
        setForm({
            funcionarioId: item.funcionarioId,
            tipo: item.tipo,
            data_inicio: item.data_inicio?.slice(0, 10) ?? "",
            data_fim: item.data_fim?.slice(0, 10) ?? "",
            renovacao_automatica: item.renovacao_automatica,
            salario_base: Number(item.salario_base),
            subsidio_alimentacao: Number(item.subsidio_alimentacao),
            subsidio_transporte: Number(item.subsidio_transporte),
            subsidio_residencia: Number(item.subsidio_residencia),
            outros_subsidios: Number(item.outros_subsidios),
        });
        setEditingId(item.id);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.funcionarioId || !form.tipo || !form.data_inicio || form.salario_base <= 0) {
            toast.error("Preencha os campos obrigatórios (colaborador, tipo, data início, salário base)");
            return;
        }

        setSubmitting(true);
        try {
            const url = editingId ? `/api/rh/contratos/${editingId}` : "/api/rh/contratos";
            const method = editingId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error();
            toast.success(editingId ? "Contrato actualizado" : "Contrato criado com sucesso");
            setIsModalOpen(false);
            fetchData();
        } catch {
            toast.error(editingId ? "Erro ao actualizar" : "Erro ao criar contrato");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRenovar = async (id: string) => {
        setRenewingId(id);
        try {
            const res = await fetch("/api/rh/contratos/renovar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (!res.ok) throw new Error();
            toast.success("Contrato renovado com sucesso");
            fetchData();
        } catch {
            toast.error("Falha ao renovar contrato");
        } finally {
            setRenewingId(null);
        }
    };

    const handleConfirmAction = async () => {
        const { id, action } = confirmModal;
        if (!id || !action) return;
        setConfirmModal({ isOpen: false, id: null, action: null });

        try {
            if (action === "delete") {
                const res = await fetch(`/api/rh/contratos/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error();
                toast.success("Contrato eliminado");
            } else if (action === "encerrar") {
                const res = await fetch("/api/rh/contratos/encerrar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                if (!res.ok) throw new Error();
                toast.warning("Contrato encerrado manualmente");
            } else if (action === "cancelar") {
                const res = await fetch(`/api/rh/contratos/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "ENCERRADO" })
                });
                if (!res.ok) throw new Error();
                toast.warning("Contrato cancelado");
            }
            fetchData();
        } catch {
            toast.error("Erro ao executar operação");
        }
    };

    const filteredData = contratos.filter((c: any) => {
        const matchesSearch = c.funcionario.nome.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !selectedStatus || c.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const activeCount = contratos.filter(c => c.status === "VIGENTE").length;
    const expiredCount = contratos.filter(c => c.status === "CADUCADO").length;
    const expiringSoonCount = contratos.filter(c => {
        if (!c.data_fim || c.status !== "VIGENTE") return false;
        const diffDays = Math.ceil((new Date(c.data_fim).getTime() - Date.now()) / 86400000);
        return diffDays >= 0 && diffDays <= 30;
    }).length;

    const confirmMessages: Record<string, string> = {
        encerrar: "Tem a certeza que deseja encerrar este contrato? O colaborador deixará de ter vínculo activo.",
        cancelar: "Tem a certeza que deseja cancelar este contrato?",
        delete: "Tem a certeza que deseja eliminar permanentemente este contrato? Esta acção não pode ser desfeita."
    };

    const columns: Column<any>[] = [
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-slate-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 dark:border-zinc-700">
                        <UserCircle size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-[11px] text-[var(--text-primary)] uppercase tracking-tight">{item.funcionario.nome}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{item.funcionario.cargo?.nome || 'Geral'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "tipo",
            header: "Tipo",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.tipo === 'INDETERMINADO' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                        item.tipo === 'DETERMINADO' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                            'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                        }`}>
                        {item.tipo}
                    </span>
                    {item.renovacao_automatica && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full font-bold" title="Renovação Automática">↻</span>
                    )}
                </div>
            ),
        },
        {
            key: "salario",
            header: "Salário Base",
            render: (item) => (
                <span className="text-[12px] font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(Number(item.salario_base))}</span>
            ),
        },
        {
            key: "periodo",
            header: "Período",
            render: (item) => (
                <div className="text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" />
                        <span>{new Date(item.data_inicio).toLocaleDateString()}</span>
                        {item.data_fim && (
                            <>
                                <span className="text-slate-300">→</span>
                                <span className={item.status === 'CADUCADO' ? 'text-rose-500 font-bold' : ''}>
                                    {new Date(item.data_fim).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "status",
            header: "Estado",
            render: (item) => (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${item.status === 'VIGENTE' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/10' :
                    item.status === 'CADUCADO' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/10' :
                        'bg-slate-100 text-slate-600 dark:bg-zinc-800'
                    }`}>
                    {item.status}
                </span>
            ),
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                <div className="flex justify-end items-center gap-1 pr-1">
                    {/* View */}
                    <Link href={`/rh/funcionarios/${item.funcionarioId}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" title="Ver Funcionário">
                            <Eye size={14} />
                        </Button>
                    </Link>

                    {/* Edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-amber-600"
                        onClick={() => openEdit(item)}
                        title="Editar Contrato"
                    >
                        <Edit size={14} />
                    </Button>

                    {/* Renew */}
                    {(item.status === 'CADUCADO' || (item.tipo !== 'INDETERMINADO' && item.status === 'VIGENTE')) && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-emerald-600"
                            onClick={() => handleRenovar(item.id)}
                            disabled={renewingId === item.id}
                            title="Renovar"
                        >
                            {renewingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        </Button>
                    )}

                    {/* Activate (for cancelled/closed ones) */}
                    {(item.status === 'ENCERRADO' || item.status === 'CADUCADO') && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-emerald-600"
                            title="Reactivar"
                            onClick={async () => {
                                const res = await fetch(`/api/rh/contratos/${item.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ status: "VIGENTE" })
                                });
                                if (res.ok) { toast.success("Contrato reactivado"); fetchData(); }
                                else toast.error("Erro ao reactivar");
                            }}
                        >
                            <BadgeCheck size={14} />
                        </Button>
                    )}

                    {/* Close */}
                    {item.status === 'VIGENTE' && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-orange-600"
                            onClick={() => setConfirmModal({ isOpen: true, id: item.id, action: "encerrar" })}
                            title="Encerrar"
                        >
                            <XCircle size={14} />
                        </Button>
                    )}

                    {/* Delete */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                        onClick={() => setConfirmModal({ isOpen: true, id: item.id, action: "delete" })}
                        title="Eliminar"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
            className: "w-48"
        },
    ];

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Gestão de Contratos de Trabalho</h1>
                    <p className="text-sm font-medium text-slate-400">Controlo de vigência, renovações e conformidade legal</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg gap-2"
                    onClick={openCreate}
                >
                    <Plus size={16} /> Novo Contrato
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Contratos Vigentes" value={activeCount} icon={CheckCircle} variant="blue" />
                <StatCard title="Expiram em 30 Dias" value={expiringSoonCount} icon={AlertTriangle} variant="orange" />
                <StatCard title="Contratos Caducados" value={expiredCount} icon={FileText} variant="red" />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="PESQUISAR COLABORADOR..."
                            className="w-full h-11 pl-10 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <select
                            className="w-full h-11 pl-4 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">TODOS OS ESTADOS</option>
                            <option value="VIGENTE">VIGENTES</option>
                            <option value="CADUCADO">CADUCADOS</option>
                            <option value="RENOVADO">RENOVADOS (HISTÓRICO)</option>
                            <option value="ENCERRADO">ENCERRADOS</option>
                        </select>
                    </div>
                    {(search || selectedStatus !== "VIGENTE") && (
                        <Button variant="outline" onClick={() => { setSearch(""); setSelectedStatus("VIGENTE"); }} className="h-11 px-4 border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500">
                            <X size={16} />
                        </Button>
                    )}
                </div>
            </Card>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                keyExtractor={(item) => item.id}
                loading={loading}
                className="group border border-slate-200 dark:border-zinc-800 shadow-sm"
                emptyState={
                    <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <FileText size={64} className="opacity-10" />
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Nenhum contrato encontrado</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Ajuste os filtros de pesquisa</p>
                        </div>
                    </div>
                }
            />

            {/* Create / Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Editar Contrato" : "Novo Contrato"}
            >
                <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1 custom-scrollbar">
                    {!editingId && (
                        <Select
                            label="Colaborador *"
                            value={form.funcionarioId}
                            onChange={(val) => setForm({ ...form, funcionarioId: val })}
                            options={funcionarios.map(f => ({ value: f.id, label: f.nome }))}
                            placeholder="Selecione o colaborador"
                        />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Tipo de Contrato *"
                            value={form.tipo}
                            onChange={(val) => setForm({ ...form, tipo: val })}
                            options={[
                                { value: "DETERMINADO", label: "A Termo Certo (Determinado)" },
                                { value: "INDETERMINADO", label: "Sem Termo (Indeterminado)" },
                                { value: "ESTAGIO", label: "Estágio Profissional" },
                            ]}
                        />
                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                id="renovacao_auto"
                                checked={form.renovacao_automatica}
                                onChange={(e) => setForm({ ...form, renovacao_automatica: e.target.checked })}
                                className="h-4 w-4 rounded border-2 border-[var(--border-color)]"
                            />
                            <label htmlFor="renovacao_auto" className="text-sm font-semibold text-[var(--text-secondary)] cursor-pointer">
                                Renovação Automática
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Data de Início *" type="date" value={form.data_inicio} onChange={(e) => setForm({ ...form, data_inicio: e.target.value })} />
                        <Input label="Data de Fim (opcional)" type="date" value={form.data_fim} onChange={(e) => setForm({ ...form, data_fim: e.target.value })} />
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Remuneração</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CurrencyInput label="Salário Base *" value={form.salario_base} onChange={(val) => setForm({ ...form, salario_base: val })} />
                            <CurrencyInput label="Subsídio de Alimentação" value={form.subsidio_alimentacao} onChange={(val) => setForm({ ...form, subsidio_alimentacao: val })} />
                            <CurrencyInput label="Subsídio de Transporte" value={form.subsidio_transporte} onChange={(val) => setForm({ ...form, subsidio_transporte: val })} />
                            <CurrencyInput label="Subsídio de Residência" value={form.subsidio_residencia} onChange={(val) => setForm({ ...form, subsidio_residencia: val })} />
                            <CurrencyInput label="Outros Subsídios" value={form.outros_subsidios} onChange={(val) => setForm({ ...form, outros_subsidios: val })} />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 sticky bottom-0 bg-[var(--surface-color)] dark:bg-zinc-900 pb-1">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button className="bg-blue-600 text-white" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "A processar..." : (editingId ? "Actualizar" : "Criar Contrato")}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.action === 'delete' ? "Eliminar Contrato" : confirmModal.action === 'encerrar' ? "Encerrar Contrato" : "Cancelar Contrato"}
                message={confirmMessages[confirmModal.action ?? ""] ?? ""}
                type="danger"
                confirmText={confirmModal.action === 'delete' ? "Sim, Eliminar" : confirmModal.action === 'encerrar' ? "Sim, Encerrar" : "Sim, Cancelar"}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmModal({ isOpen: false, id: null, action: null })}
            />
        </div>
    );
}
