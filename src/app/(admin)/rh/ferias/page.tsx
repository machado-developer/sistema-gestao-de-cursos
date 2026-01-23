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
    Plane
} from "lucide-react";
import { toast } from "sonner";

export default function FeriasPage() {
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock data for requests since we don't have a full API for this yet
    const [solicitacoes, setSolicitacoes] = useState([
        { id: "1", funcionario: { nome: "António Machado", cargo: { nome: "Diretor Executivo" }, departamentoId: "dept-1" }, inicio: "2025-02-01", fim: "2025-02-22", dias: 22, status: "APROVADO", tipo: "GOZO_FERIAS" },
        { id: "2", funcionario: { nome: "Maria Silva", cargo: { nome: "Consultor Técnico" }, departamentoId: "dept-2" }, inicio: "2025-03-10", fim: "2025-03-24", dias: 10, status: "PENDENTE", tipo: "GOZO_FERIAS" },
    ]);

    // Filters
    const [search, setSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [deptRes, cargoRes] = await Promise.all([
                fetch("/api/rh/departamentos"),
                fetch("/api/rh/cargos")
            ]);

            const [deptData, cargoData] = await Promise.all([
                deptRes.json(),
                cargoRes.json()
            ]);

            setDepts(deptData);
            setCargos(cargoData);
        } catch (error) {
            console.error("Erro ao carregar auxiliares");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <div className="flex justify-end pr-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-zinc-800">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            ),
            className: "w-10"
        },
    ];

    const filteredData = solicitacoes.filter((s: any) => {
        const matchesSearch = s.funcionario.nome.toLowerCase().includes(search.toLowerCase());
        const matchesDept = !selectedDept || s.funcionario.departamentoId === selectedDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                        Gestão de Férias e Ausências
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Planeamento e Aprovação de Licenças</p>
                </div>
                <Button className="bg-purple-600 text-[10px] font-black uppercase tracking-widest h-9 border-b-2 border-purple-800">
                    <Plus size={16} className="mr-2" /> Nova Solicitação
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR POR COLABORADOR..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-purple-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 relative group">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={14} />
                        <select
                            className="w-full h-11 pl-9 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                            <option value="">FILTRAR POR DEPARTAMENTO</option>
                            {depts.map(d => <option key={d.id} value={d.id}>{d.nome.toUpperCase()}</option>)}
                        </select>
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
                    className="border-none shadow-none"
                    emptyState={
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <Umbrella size={64} className="opacity-10" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Nenhum registo de férias</p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
}
