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
    MoreHorizontal,
    User,
    Users,
    ShieldCheck,
    Briefcase,
    Building2,
    Filter,
    X,
    Trash2,
    Edit
} from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import Link from "next/link";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { Select } from "@/components/ui/Select";

export default function FuncionariosPage() {
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; id: string | null; loading: boolean }>({
        isOpen: false,
        id: null,
        loading: false
    });

    // Filters
    const [search, setSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedCargo, setSelectedCargo] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [funcRes, deptRes, cargoRes] = await Promise.all([
                fetch("/api/rh/funcionarios"),
                fetch("/api/rh/departamentos"),
                fetch("/api/rh/cargos")
            ]);

            const [funcData, deptData, cargoData] = await Promise.all([
                funcRes.json(),
                deptRes.json(),
                cargoRes.json()
            ]);

            setFuncionarios(funcData);
            setDepts(deptData);
            setCargos(cargoData);
        } catch (error) {
            toast.error("Erro ao carregar dados dos colaboradores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenDelete = (id: string) => {
        setConfirmDelete({ isOpen: true, id, loading: false });
    };

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return;

        setConfirmDelete(prev => ({ ...prev, loading: true }));
        try {
            const res = await fetch(`/api/rh/funcionarios/${confirmDelete.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();

            toast.success("Registo Eliminado", {
                description: "O colaborador foi removido do sistema com sucesso."
            });

            setConfirmDelete({ isOpen: false, id: null, loading: false });
            fetchData();
        } catch (error) {
            toast.error("Erro ao Remover", {
                description: "Não foi possível eliminar este colaborador."
            });
            setConfirmDelete(prev => ({ ...prev, loading: false }));
        }
    };

    const resetFilters = () => {
        setSearch("");
        setSelectedDept("");
        setSelectedCargo("");
    };

    const columns: Column<any>[] = [
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--surface-color)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--border-color)]">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-[var(--text-primary)] tracking-tight leading-none mb-1">{item.nome}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.email || 'Sem e-mail'}</p>
                    </div>
                </div>
            ),
        } as Column<any>,
        {
            key: "identificacao",
            header: "Identificação",
            render: (item) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-500">BI</span>
                        <span className="text-sm font-medium text-[var(--text-secondary)]">{item.bi_documento}</span>
                    </div>
                    {item.nif && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/10 px-1.5 py-0.5 rounded text-emerald-600">NIF</span>
                            <span className="text-sm font-medium text-[var(--text-secondary)]">{item.nif}</span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "vinculo",
            header: "Vínculo Contratual",
            render: (item) => {
                const contrato = item.contratos?.[0];
                const tipo = contrato?.tipo || 'N/A';
                const dataFim = contrato?.data_fim;
                const autoRenew = contrato?.renovacao_automatica;

                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${tipo === 'INDETERMINADO' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                                tipo === 'DETERMINADO' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                    'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                                }`}>
                                {tipo}
                            </span>
                            {autoRenew && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full font-bold" title="Renovação Automática">
                                    ↻
                                </span>
                            )}
                        </div>
                        {dataFim && contrato?.status === "VIGENTE" && (
                            <p className="text-[10px] font-medium text-rose-500">
                                Expira em: {new Date(dataFim).toLocaleDateString('pt-AO')}
                            </p>
                        )}
                        {contrato?.status === "RENOVADO" && (
                            <p className="text-[10px] font-medium text-emerald-500 italic">Histórico: Renovado</p>
                        )}
                        {contrato?.status === "CADUCADO" && (
                            <p className="text-[10px] text-rose-600 font-bold italic">CADUCADO</p>
                        )}
                    </div>
                );
            }
        },
        {
            key: "alocacao",
            header: "Alocação / Cargo",
            render: (item) => (
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-[var(--accent-primary)]" />
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                            {item.departamento?.nome || 'Geral'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase size={12} className="text-[var(--success)]" />
                        <span className="text-xs text-slate-500 font-medium">
                            {item.cargo?.nome || 'Não Atribuído'}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "estado",
            header: "Estado",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.status === "ATIVO" ? "bg-[var(--success)] shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-slate-400"}`} />
                    <span className={`text-xs font-semibold ${item.status === "ATIVO" ? "text-[var(--success)]" : "text-slate-500"}`}>
                        {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
                    </span>
                </div>
            ),
        },
        {
            key: "remuneracao",
            header: "Remuneração",
            render: (item) => {
                const salario = item.contratos?.[0]?.salario_base || 0;
                return (
                    <div className="text-right">
                        <p className="text-sm font-semibold text-[var(--success)]">{formatCurrency(salario)}</p>
                        <p className="text-[11px] font-medium text-slate-500">Base Mensal</p>
                    </div>
                );
            },
            className: "text-right"
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                <div className="flex justify-end gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/rh/funcionarios/${item.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[var(--accent-primary)] hover:bg-slate-100 dark:hover:bg-zinc-800">
                            <MoreHorizontal size={14} />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10"
                        onClick={() => handleOpenDelete(item.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
            className: "w-24"
        },
    ];

    const filteredData = funcionarios.filter((f: any) => {
        const matchesSearch = f.nome.toLowerCase().includes(search.toLowerCase()) ||
            f.bi_documento.toLowerCase().includes(search.toLowerCase()) ||
            f.email?.toLowerCase().includes(search.toLowerCase());

        const matchesDept = !selectedDept || f.departamentoId === selectedDept;
        const matchesCargo = !selectedCargo || f.cargoId === selectedCargo;

        return matchesSearch && matchesDept && matchesCargo;
    });

    const activeCount = funcionarios.filter(f => f.status === "ATIVO").length;
    const totalPayroll = funcionarios.reduce((acc, f) => acc + Number(f.contratos?.[0]?.salario_base || 0), 0);

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                        Quadro de Colaboradores
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Gestão Integral de Capital Humano</p>
                </div>
                <Link href="/rh/funcionarios/novo">
                    <Button className="bg-[var(--accent-primary)] text-sm font-medium h-10 px-6 text-white shadow-sm hover:opacity-90 transition-opacity">
                        <Plus size={18} className="mr-2" /> Novo Funcionário
                    </Button>
                </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Efetivo Total"
                    value={funcionarios.length}
                    icon={Users}
                    variant="blue"
                    subStats={[{ label: 'Ativos agora', value: activeCount }]}
                />
                <StatCard
                    title="Disponibilidade"
                    value={`${((activeCount / (funcionarios.length || 1)) * 100).toFixed(0)}%`}
                    icon={ShieldCheck}
                    variant="green"
                    subStats={[{ label: 'Status', value: 'Operacional' }]}
                />
                <StatCard
                    title="Folha Prevista"
                    value={formatCurrency(totalPayroll)}
                    icon={Briefcase}
                    variant="purple"
                    subStats={[{ label: 'Média/Colab.', value: formatCurrency(totalPayroll / (funcionarios.length || 1)) }]}
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors" size={16} />
                        <Input
                            placeholder="Pesquisar nome, BI ou email..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 text-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 flex-1 md:flex-[2]">
                        <div className="flex-1 relative group">
                            <Select
                                value={selectedDept}
                                onChange={setSelectedDept}
                                options={depts.map(d => ({ value: d.id, label: d.nome }))}
                                placeholder="Todos Departamentos"
                                className="h-11"
                            />
                        </div>

                        <div className="flex-1 relative group">
                            <Select
                                value={selectedCargo}
                                onChange={setSelectedCargo}
                                options={cargos.filter(c => !selectedDept || c.departamentoId === selectedDept).map(c => ({ value: c.id, label: c.nome }))}
                                placeholder="Todos os Cargos"
                                className="h-11"
                            />
                        </div>

                        {(search || selectedDept || selectedCargo) && (
                            <Button
                                variant="outline"
                                onClick={resetFilters}
                                className="h-11 px-4 border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            {/* Table Area */}
            <DataTable
                columns={columns}
                data={filteredData}
                keyExtractor={(item) => item.id}
                loading={loading}
                className="group border border-slate-200 dark:border-zinc-800 shadow-sm"
                emptyState={
                    <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <Users size={64} className="opacity-10" />
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Nenhum colaborador encontrado</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Tente ajustar seus critérios de filtro</p>
                        </div>
                    </div>
                }
            />

            {/* Modal Area */}
            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                title="Eliminar Colaborador"
                message="Tem a certeza que deseja remover este colaborador? Esta ação é irreversível e removerá todos os dados contratuais associados."
                type="danger"
                confirmText="Confirmar Eliminação"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null, loading: false })}
                isLoading={confirmDelete.loading}
            />
        </div>
    );
}
