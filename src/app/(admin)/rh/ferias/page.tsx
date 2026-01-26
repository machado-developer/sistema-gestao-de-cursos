"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Input } from "@/components/ui/Input";
import {
    Plus,
    Umbrella,
    Clock,
    CheckCircle,
    Search,
    Building2,
    Briefcase,
    X,
    MoreHorizontal,
    Calendar,
    Plane,
    Trash2,
    Eye
} from "lucide-react";
import { toast } from "sonner";
import { Select } from "@/components/ui/Select";
import { VacationModal } from "@/components/rh/VacationModal";
import { VacationDetailModal } from "@/components/rh/VacationDetailModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function FeriasPage() {
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedVacation, setSelectedVacation] = useState<any>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; id: string | null; loading: boolean }>({
        isOpen: false,
        id: null,
        loading: false
    });

    // Filters
    const [search, setSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [deptRes, cargoRes, feriasRes, funcRes] = await Promise.all([
                fetch("/api/rh/departamentos"),
                fetch("/api/rh/cargos"),
                fetch("/api/rh/ferias"),
                fetch("/api/rh/funcionarios")
            ]);

            const [deptData, cargoData, feriasData, funcData] = await Promise.all([
                deptRes.json(),
                cargoRes.json(),
                feriasRes.json(),
                funcRes.json()
            ]);

            setDepts(deptData);
            setCargos(cargoData);
            setSolicitacoes(feriasData);
            setFuncionarios(funcData);
        } catch (error) {
            toast.error("Erro de Carregamento", {
                description: "Não foi possível sincronizar o mapa de férias."
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/rh/ferias/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) throw new Error();

            toast.success(`Pedido ${newStatus.toLowerCase()} com sucesso`);
            fetchData();
        } catch (error) {
            toast.error("Erro ao atualizar estado do pedido");
        }
    };

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return;
        setConfirmDelete(prev => ({ ...prev, loading: true }));
        try {
            const res = await fetch(`/api/rh/ferias/${confirmDelete.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success("Solicitação removida");
            fetchData();
            setConfirmDelete({ isOpen: false, id: null, loading: false });
        } catch (error) {
            toast.error("Erro ao remover solicitação");
            setConfirmDelete(prev => ({ ...prev, loading: false }));
        }
    };

    const columns: Column<any>[] = [
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-purple-50 dark:bg-purple-900/10 rounded-lg flex items-center justify-center text-purple-600 border border-purple-100 dark:border-purple-800/20">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-primary)] uppercase tracking-tight text-xs">{item.funcionario.nome}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.funcionario.cargo?.nome || 'Geral'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "periodo",
            header: "Período Solicitado",
            render: (item) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-[var(--text-secondary)]">
                            {new Date(item.inicio).toLocaleDateString()} ▸ {new Date(item.fim).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-500 uppercase">
                            {item.dias} Dias Úteis
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "tipo",
            header: "Tipo / Natureza",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <Plane size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.tipo || 'GOZO_FERIAS'}</span>
                </div>
            )
        },
        {
            key: "status",
            header: "Estado do Pedido",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.status === "APROVADO" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : item.status === "PENDENTE" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-slate-400"}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === "APROVADO" ? "text-emerald-600" : item.status === "PENDENTE" ? "text-amber-600" : "text-slate-500"}`}>
                        {item.status}
                    </span>
                </div>
            ),
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                <div className="flex justify-end pr-2 gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                        onClick={() => {
                            setSelectedVacation(item);
                            setIsDetailModalOpen(true);
                        }}
                        title="Ver Detalhes"
                    >
                        <Eye size={20} />
                    </Button>
                    {item.status === "PENDENTE" && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10"
                                onClick={() => handleStatusUpdate(item.id, "APROVADO")}
                                title="Aprovar Gozo"
                            >
                                <CheckCircle size={20} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10"
                                onClick={() => handleStatusUpdate(item.id, "REPROVADO")}
                                title="Recusar Pedido"
                            >
                                <X size={20} />
                            </Button>
                        </>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800"
                        onClick={() => setConfirmDelete({ isOpen: true, id: item.id, loading: false })}
                        title="Eliminar Registro"
                    >
                        <Trash2 size={20} />
                    </Button>
                </div>
            ),
            className: "w-10"
        },
    ];

    const filteredData = solicitacoes.filter((s: any) => {
        const matchesSearch = s.funcionario.nome.toLowerCase().includes(search.toLowerCase()) ||
            s.funcionario.bi_documento?.toLowerCase().includes(search.toLowerCase());
        const matchesDept = !selectedDept || s.funcionario.departamentoId === selectedDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                        Gestão de Férias e Ausências
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Planeamento e Aprovação de Licenças</p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[var(--accent-primary)] text-sm font-medium h-10 px-6 text-white shadow-sm hover:opacity-90 transition-opacity"
                >
                    <Plus size={18} className="mr-2" /> Nova Solicitação
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Média de Saldo"
                    value="18 Dias"
                    icon={Umbrella}
                    variant="blue"
                    subStats={[{ label: 'Saldo global equipa', value: 'Regular' }]}
                />
                <StatCard
                    title="Pendentes"
                    value={solicitacoes.filter(s => s.status === "PENDENTE").length}
                    icon={Clock}
                    variant="orange"
                    subStats={[{ label: 'Aguardando revisão', value: 'Urgente' }]}
                />
                <StatCard
                    title="Em Gozo Hoje"
                    value={1}
                    icon={CheckCircle}
                    variant="green"
                    subStats={[{ label: 'Ausências planeadas', value: '1' }]}
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR POR COLABORADOR..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 text-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 relative group">
                        <Select
                            value={selectedDept}
                            onChange={setSelectedDept}
                            options={depts.map(d => ({ value: d.id, label: d.nome }))}
                            placeholder="FILTRAR POR DEPARTAMENTO"
                            className="h-11"
                        />
                    </div>

                    {(search || selectedDept) && (
                        <Button
                            variant="outline"
                            onClick={() => { setSearch(""); setSelectedDept(""); }}
                            className="h-11 px-4 border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={16} />
                        </Button>
                    )}
                </div>
            </Card>

            {/* Table Area */}
            <Card className="p-1 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800">
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Histórico de Solicitações</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    loading={loading}
                    className="border-none shadow-none"
                    emptyState={
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <Umbrella size={64} className="opacity-10" />
                            <p className="text-xs font-medium text-slate-500">Nenhum registo de férias</p>
                        </div>
                    }
                />
            </Card>

            <VacationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchData}
                funcionarios={funcionarios}
            />

            <VacationDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedVacation(null);
                }}
                vacation={selectedVacation}
            />

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                title="Eliminar Solicitação"
                message="Tem a certeza que deseja remover esta solicitação de ausência? Esta ação não pode ser desfeita."
                type="danger"
                confirmText="Confirmar Eliminação"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null, loading: false })}
                isLoading={confirmDelete.loading}
            />
        </div >
    );
}
