"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import {
    FileText,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    Building2,
    Calendar,
    Search,
    X,
    UserCircle,
    Eye,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function ContratosPage() {
    const [contratos, setContratos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [renewingId, setRenewingId] = useState<string | null>(null);
    const [terminatingId, setTerminatingId] = useState<string | null>(null);
    const [confirmTerminate, setConfirmTerminate] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    });

    // Filters
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("VIGENTE");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/rh/contratos");
            const data = await res.json();
            setContratos(data);
        } catch (error) {
            toast.error("Erro ao carregar contratos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRenovar = async (id: string) => {
        setRenewingId(id);
        try {
            const res = await fetch("/api/rh/contratos/renovar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (!res.ok) throw new Error("Falha na renovação");

            toast.success("Contrato Renovado com sucesso");
            fetchData();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setRenewingId(null);
        }
    };

    const handleEncerrar = async (id: string) => {
        setConfirmTerminate({ isOpen: true, id });
    };

    const confirmHandleEncerrar = async () => {
        if (!confirmTerminate.id) return;

        const id = confirmTerminate.id;
        setConfirmTerminate({ isOpen: false, id: null });
        setTerminatingId(id);

        try {
            const res = await fetch("/api/rh/contratos/encerrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (!res.ok) throw new Error("Falha ao encerrar contrato");

            toast.warning("Contrato Encerrado manualmente");
            fetchData();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setTerminatingId(null);
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
        const hoje = new Date();
        const dataFim = new Date(c.data_fim);
        const diffTime = dataFim.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 30; // 30 days
    }).length;

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
            header: "Tipo / Renovação",
            render: (item) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.tipo === 'INDETERMINADO' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                            item.tipo === 'DETERMINADO' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                            }`}>
                            {item.tipo}
                        </span>
                        {item.renovacao_automatica && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full font-bold" title="Renovação Automática">
                                ↻
                            </span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "periodo",
            header: "Período de Vigência",
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
                <div className="flex justify-end gap-2 pr-2">
                    <Link href={`/rh/funcionarios/${item.funcionarioId}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-colors">
                            <Eye size={14} />
                        </Button>
                    </Link>
                    {item.status === 'VIGENTE' && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3 text-[9px] font-bold uppercase tracking-widest gap-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 border-rose-200"
                            onClick={() => handleEncerrar(item.id)}
                            disabled={terminatingId === item.id}
                        >
                            {terminatingId === item.id ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                            Encerrar
                        </Button>
                    )}
                    {(item.status === 'CADUCADO' || (item.tipo !== 'INDETERMINADO' && item.status === 'VIGENTE')) && (
                        <Button
                            variant="primary"
                            size="sm"
                            className="h-8 px-3 text-[9px] font-bold uppercase tracking-widest gap-1.5"
                            onClick={() => handleRenovar(item.id)}
                            disabled={renewingId === item.id}
                        >
                            {renewingId === item.id ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                            Renovar
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2">
                <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    Gestão de Contratos de Trabalho
                </h1>
                <p className="text-sm font-medium text-slate-400">Controlo de vigência, renovações e conformidade legal</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Contratos Vigentes"
                    value={activeCount}
                    icon={CheckCircle}
                    variant="blue"
                />
                <StatCard
                    title="Expiram em 30 Dias"
                    value={expiringSoonCount}
                    icon={AlertTriangle}
                    variant="orange"
                />
                <StatCard
                    title="Contratos Caducados"
                    value={expiredCount}
                    icon={FileText}
                    variant="red"
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="PESQUISAR COLABORADOR..."
                            className="w-full h-11 pl-10 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 relative group">
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
                        <Button
                            variant="outline"
                            onClick={() => { setSearch(""); setSelectedStatus("VIGENTE"); }}
                            className="h-11 px-4 border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={16} />
                        </Button>
                    )}
                </div>
            </Card>

            {/* Attendance Table */}
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

            {/* Modals */}
            <ConfirmModal
                isOpen={confirmTerminate.isOpen}
                title="Encerrar Contrato"
                message="Tem a certeza que deseja encerrar este contrato manualmente? O colaborador deixará de ter um vínculo ativo."
                type="danger"
                confirmText="Sim, Encerrar"
                onConfirm={confirmHandleEncerrar}
                onCancel={() => setConfirmTerminate({ isOpen: false, id: null })}
            />
        </div>
    );
}
