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
    X
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export default function FuncionariosPage() {
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
                    <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-800/20">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-primary)] uppercase tracking-tight leading-none mb-1">{item.nome}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.email || 'Sem e-mail'}</p>
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
                        <span className="text-[10px] font-black bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-500">BI</span>
                        <span className="text-xs font-bold text-[var(--text-secondary)]">{item.bi_documento}</span>
                    </div>
                    {item.nif && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-900/10 px-1.5 py-0.5 rounded text-emerald-600">NIF</span>
                            <span className="text-xs font-bold text-[var(--text-secondary)]">{item.nif}</span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "alocacao",
            header: "Alocação / Cargo",
            render: (item) => (
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-[var(--text-primary)]">
                            {item.departamento?.nome || 'Geral'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
                    <div className={`w-2 h-2 rounded-full ${item.status === "ATIVO" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-400"}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === "ATIVO" ? "text-emerald-600" : "text-slate-500"}`}>
                        {item.status}
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
                        <p className="text-sm font-black text-emerald-600">{formatCurrency(salario)}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Base Mensal</p>
                    </div>
                );
            },
            className: "text-right"
        },
        {
            key: "acoes",
            header: "",
            render: (item) => (
                <div className="flex justify-end pr-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-zinc-800">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            ),
            className: "w-10"
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
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                        Quadro de Colaboradores
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestão Integral de Capital Humano</p>
                </div>
                <Link href="/rh/funcionarios/novo">
                    <Button className="bg-blue-600 text-[10px] font-black uppercase tracking-widest h-9 border-b-2 border-blue-800">
                        <Plus size={16} className="mr-2" /> Novo Funcionário
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR NOME, BI OU EMAIL..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 flex-1 md:flex-[2]">
                        <div className="flex-1 relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <select
                                className="w-full h-11 pl-9 pr-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="">TODOS DEPARTAMENTOS</option>
                                {depts.map(d => <option key={d.id} value={d.id}>{d.nome.toUpperCase()}</option>)}
                            </select>
                        </div>

                        <div className="flex-1 relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <select
                                className="w-full h-11 pl-9 pr-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                value={selectedCargo}
                                onChange={(e) => setSelectedCargo(e.target.value)}
                            >
                                <option value="">TODOS OS CARGOS</option>
                                {cargos.filter(c => !selectedDept || c.departamentoId === selectedDept).map(c => (
                                    <option key={c.id} value={c.id}>{c.nome.toUpperCase()}</option>
                                ))}
                            </select>
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
        </div>
    );
}
