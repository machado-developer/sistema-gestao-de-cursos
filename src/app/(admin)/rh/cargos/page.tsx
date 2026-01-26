'use client'

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cargoSchema } from '@/lib/schemas'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { DataTable, Column } from "@/components/ui/DataTable"
import { StatCard } from "@/components/dashboard/StatCard"
import { Plus, Briefcase, Trash2, Edit2, Wallet, TrendingUp, ShieldCheck, Search, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { z } from 'zod'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Select } from "@/components/ui/Select"
import { Controller } from "react-hook-form"

type CargoFormData = z.infer<typeof cargoSchema>;

export default function CargosPage() {
    const [cargos, setCargos] = useState<any[]>([])
    const [depts, setDepts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    // Confirmation State
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; id: string | null; loading: boolean }>({
        isOpen: false,
        id: null,
        loading: false
    })

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting }
    } = useForm<CargoFormData>({
        resolver: zodResolver(cargoSchema) as any
    })

    const selectedDeptId = useWatch({
        control,
        name: "departamentoId"
    });

    useEffect(() => {
        fetchCargos()
        fetchDepts()
    }, [])

    const fetchCargos = async () => {
        try {
            const res = await fetch('/api/rh/cargos')
            const data = await res.json()
            setCargos(data)
        } catch (error) {
            toast.error("Erro de Ligação", {
                description: "Não foi possível carregar a lista de cargos profissionais."
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchDepts = async () => {
        try {
            const res = await fetch('/api/rh/departamentos')
            const data = await res.json()
            setDepts(data)
        } catch (error) {
            console.error("Erro ao carregar departamentos:", error)
        }
    }

    const onSubmit = async (data: CargoFormData) => {
        try {
            const method = editingId ? 'PUT' : 'POST'
            const url = editingId ? `/api/rh/cargos/${editingId}` : '/api/rh/cargos'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error()

            toast.success(editingId ? "Cargo Atualizado" : "Cargo Registado", {
                description: `A função "${data.nome}" está agora disponível no sistema.`,
                duration: 4000
            })

            handleCloseModal()
            fetchCargos()
        } catch (error) {
            toast.error("Falha ao Salvar", {
                description: "Ocorreu um problema ao processar o registo do cargo."
            })
        }
    }

    const handleEdit = (cargo: any) => {
        setEditingId(cargo.id)
        reset({
            nome: cargo.nome,
            departamentoId: cargo.departamentoId || '',
            salario_base_sugerido: cargo.salario_base || 0
        })
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
        reset({ nome: '', departamentoId: undefined, salario_base_sugerido: 0 })
    }

    const handleOpenDelete = (id: string) => {
        setConfirmDelete({ isOpen: true, id, loading: false })
    }

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return

        setConfirmDelete(prev => ({ ...prev, loading: true }))
        try {
            const res = await fetch(`/api/rh/cargos/${confirmDelete.id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Falha na comunicação com o servidor.")
            }

            toast.success("Registo Removido", {
                description: "O cargo profissional foi eliminado com sucesso.",
                icon: <CheckCircle2 size={16} className="text-emerald-500" />
            })

            setConfirmDelete({ isOpen: false, id: null, loading: false })
            fetchCargos()
        } catch (error: any) {
            toast.error("Impossível Eliminar", {
                description: error.message || "Este cargo pode estar vinculado a colaboradores ativos."
            })
            setConfirmDelete(prev => ({ ...prev, loading: false }))
        }
    }

    const columns: Column<any>[] = [
        {
            key: 'nome',
            header: 'Cargo / Função',
            render: (cargo) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-sm">
                        <Briefcase size={16} />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-primary)] uppercase tracking-tight">{cargo.nome}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-medium">Nível Profissional</p>
                    </div>
                </div>
            )
        },
        {
            key: 'departamento',
            header: 'Departamento',
            render: (cargo) => (
                <div className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/10 rounded-sm text-[10px] font-bold text-blue-600 border border-blue-100 dark:border-blue-800/20 uppercase w-fit">
                    {cargo.departamento?.nome || 'Geral'}
                </div>
            )
        },
        {
            key: 'salario',
            header: 'Salário Base',
            render: (cargo) => (
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-500">
                    {formatCurrency(cargo.salario_base || 0)}
                </span>
            )
        },
        {
            key: 'efetivo',
            header: 'Colaboradores',
            render: (cargo) => (
                <div className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-[var(--text-secondary)] border border-slate-200 dark:border-zinc-700 w-fit">
                    {cargo._count?.funcionarios || 0} Ativos
                </div>
            )
        },
        {
            key: 'actions',
            header: '',
            className: 'text-right',
            render: (cargo) => (
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(cargo)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition-all">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleOpenDelete(cargo.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-all">
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ]

    const filteredData = cargos.filter(c =>
        c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.departamento?.nome?.toLowerCase().includes(search.toLowerCase())
    )

    const averageSalary = cargos.length ? cargos.reduce((acc, c) => acc + (c.salario_base || 0), 0) / cargos.length : 0
    const totalStaff = cargos.reduce((acc, c) => acc + (c._count?.funcionarios || 0), 0)

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                        Cargos e Níveis Ocupacionais
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Definição de Funções e Grelhas Salariais</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-[var(--accent-primary)] text-sm font-medium h-10 px-6 text-white shadow-sm hover:opacity-90 transition-opacity">
                    <Plus size={18} className="mr-2" /> Novo Cargo
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Total de Funções"
                    value={cargos.length}
                    icon={Briefcase}
                    variant="green"
                    subStats={[{ label: 'Níveis ativos', value: cargos.length }]}
                />
                <StatCard
                    title="Média Salarial"
                    value={formatCurrency(averageSalary)}
                    icon={TrendingUp}
                    variant="blue"
                    subStats={[{ label: 'Base de referência', value: 'Mensal' }]}
                />
                <StatCard
                    title="Alocação"
                    value={totalStaff}
                    icon={ShieldCheck}
                    variant="purple"
                    subStats={[{ label: 'Total alocado', value: totalStaff }]}
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR CARGO OU FUNÇÃO..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 text-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                keyExtractor={(c) => c.id}
                loading={loading}
                className="group border border-slate-200 dark:border-zinc-800 shadow-sm"
                emptyState={
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <Briefcase size={48} className="opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">Nenhum cargo encontrado</p>
                    </div>
                }
            />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-in zoom-in-95 shadow-xl">
                        <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-2 mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                                {editingId ? 'Configurar Função' : 'Nova Função Ocupacional'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Designação do Cargo</label>
                                <Input
                                    {...register("nome")}
                                    placeholder="Ex: Consultor de Tecnologia"
                                    className={`bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 font-medium h-11 ${errors.nome ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {errors.nome && <p className="text-xs font-medium text-red-500">{errors.nome.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Controller
                                    name="departamentoId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            options={depts.map(d => ({
                                                value: d.id,
                                                label: d.nome
                                            }))}
                                            label="Departamento Relacionado"
                                            placeholder="Selecione o Departamento..."
                                            error={errors.departamentoId?.message}
                                            loading={loading}
                                        />
                                    )}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Salário de Referência (Kz)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600">Kz</span>
                                    <Input
                                        type="number"
                                        {...register("salario_base_sugerido")}
                                        placeholder="0.00"
                                        className={`pl-10 bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 font-medium h-11 text-emerald-600 ${errors.salario_base_sugerido ? 'border-red-500 ring-red-500' : ''}`}
                                    />
                                </div>
                                {errors.salario_base_sugerido && <p className="text-xs font-medium text-red-500">{errors.salario_base_sugerido.message}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1 font-medium h-11">Cancelar</Button>
                                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-[var(--accent-primary)] font-medium h-11 text-white gap-2">
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {isSubmitting ? 'Processando...' : (editingId ? 'Guardar' : 'Confirmar')}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                title="Remover Função Profissional"
                message="Tem a certeza que deseja eliminar este cargo? Esta ação removerá a definição de salário e categoria da estrutura da empresa."
                type="danger"
                confirmText="Confirmar Eliminação"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null, loading: false })}
                isLoading={confirmDelete.loading}
            />
        </div>
    )
}
