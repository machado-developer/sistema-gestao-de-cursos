"use client";

import { useState, useEffect } from "react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import {
    Calendar as CalendarIcon,
    Save,
    Loader2,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    Building2,
    Briefcase,
    Filter,
    X,
    UserCircle
} from "lucide-react";
import { toast } from "sonner";

export default function PresencasPage() {
    const [data, setData] = useState(new Date().toISOString().split("T")[0]);
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [depts, setDepts] = useState<any[]>([]);
    const [cargos, setCargos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Filters
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

            setFuncionarios(funcData.map((f: any) => ({
                ...f,
                currentStatus: "PRESENTE",
                he50: 0,
                he100: 0
            })));
            setDepts(deptData);
            setCargos(cargoData);
        } catch (error) {
            toast.error("Erro ao carregar dados de presença");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = (id: string, status: string) => {
        setFuncionarios((prev: any) => prev.map((f: any) => f.id === id ? { ...f, currentStatus: status } : f));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Batch upsert logic would go here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            toast.success("Registo de presenças concluído com sucesso!");
        } catch (error) {
            toast.error("Erro ao guardar presenças");
        } finally {
            setSaving(false);
        }
    };

    const filteredData = funcionarios.filter((f: any) => {
        const matchesDept = !selectedDept || f.departamentoId === selectedDept;
        const matchesCargo = !selectedCargo || f.cargoId === selectedCargo;
        return matchesDept && matchesCargo;
    });

    const columns: Column<any>[] = [
        {
            key: "colaborador",
            header: "Colaborador",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-blue-50 dark:bg-blue-900/10 rounded-lg flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-800/20">
                        <UserCircle size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-primary)] uppercase tracking-tight text-xs">{item.nome}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.cargo?.nome || 'Geral'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "status",
            header: "Registo de Assiduidade",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <select
                        value={item.currentStatus}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`
                            h-9 min-w-[160px] px-3 rounded-md text-[10px] font-black uppercase tracking-widest border-2 transition-all appearance-none cursor-pointer
                            ${item.currentStatus === 'PRESENTE' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800' :
                                item.currentStatus.startsWith('FALTA') ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800' :
                                    'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800'}
                        `}
                    >
                        <option value="PRESENTE">✓ PRESENTE</option>
                        <option value="FALTA_J">⚠ FALTA JUSTIFICADA</option>
                        <option value="FALTA_I">✖ FALTA INJUSTIFICADA</option>
                        <option value="FERIAS">✈ EM FÉRIAS</option>
                        <option value="FOLGA">○ FOLGA</option>
                    </select>
                </div>
            ),
        },
        {
            key: "extras",
            header: "Horas Extraordinárias",
            render: (item) => (
                <div className="flex gap-2">
                    <div className="relative group">
                        <span className="absolute -top-4 left-0 text-[8px] font-black text-slate-400 uppercase tracking-widest">50%</span>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-16 h-9 px-3 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 rounded-md text-xs font-bold text-center group-hover:border-blue-500 transition-colors"
                            value={item.he50}
                            onChange={(e) => setFuncionarios((prev: any) => prev.map((f: any) => f.id === item.id ? { ...f, he50: e.target.value } : f))}
                        />
                    </div>
                    <div className="relative group">
                        <span className="absolute -top-4 left-0 text-[8px] font-black text-slate-400 uppercase tracking-widest">100%</span>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-16 h-9 px-3 bg-slate-50 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 rounded-md text-xs font-bold text-center group-hover:border-blue-500 transition-colors"
                            value={item.he100}
                            onChange={(e) => setFuncionarios((prev: any) => prev.map((f: any) => f.id === item.id ? { ...f, he100: e.target.value } : f))}
                        />
                    </div>
                </div>
            ),
        },
    ];

    const presentCount = filteredData.filter(f => f.currentStatus === "PRESENTE").length;
    const absenceCount = filteredData.filter(f => f.currentStatus.startsWith("FALTA")).length;

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                        Controlo de Assiduidade
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registo Diário e Gestão de Horas Extras</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        className="h-9 px-3 border-2 border-slate-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-900 text-[10px] font-black uppercase tracking-widest"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                    <Button
                        onClick={handleSave}
                        disabled={saving || filteredData.length === 0}
                        className="bg-emerald-600 text-[10px] font-black uppercase tracking-widest h-9 border-b-2 border-emerald-800 gap-2"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Confirmar Registo
                    </Button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Presentes"
                    value={presentCount}
                    icon={CheckCircle}
                    variant="green"
                    subStats={[{ label: 'Taxa de presença', value: filteredData.length ? `${((presentCount / filteredData.length) * 100).toFixed(0)}%` : '0%' }]}
                />
                <StatCard
                    title="Faltas / Ausências"
                    value={absenceCount}
                    icon={XCircle}
                    variant="red"
                    subStats={[{ label: 'Justificadas/Injust', value: absenceCount }]}
                />
                <StatCard
                    title="Efetivo Escalonado"
                    value={filteredData.length}
                    icon={Users}
                    variant="blue"
                    subStats={[{ label: 'Total para hoje', value: filteredData.length }]}
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative group">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                        <select
                            className="w-full h-11 pl-9 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                            <option value="">FILTRAR POR DEPARTAMENTO</option>
                            {depts.map(d => <option key={d.id} value={d.id}>{d.nome.toUpperCase()}</option>)}
                        </select>
                    </div>

                    <div className="flex-1 relative group">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                        <select
                            className="w-full h-11 pl-9 pr-3 bg-slate-50 dark:bg-zinc-800/50 border-2 border-slate-200 dark:border-zinc-800 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            value={selectedCargo}
                            onChange={(e) => setSelectedCargo(e.target.value)}
                        >
                            <option value="">FILTRAR POR CATEGORIA</option>
                            {cargos.filter(c => !selectedDept || c.departamentoId === selectedDept).map(c => (
                                <option key={c.id} value={c.id}>{c.nome.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {(selectedDept || selectedCargo) && (
                        <Button
                            variant="outline"
                            onClick={() => { setSelectedDept(""); setSelectedCargo(""); }}
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
                        <Clock size={64} className="opacity-10" />
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Nenhum colaborador alocado</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Ajuste os filtros de departamento ou cargo</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
