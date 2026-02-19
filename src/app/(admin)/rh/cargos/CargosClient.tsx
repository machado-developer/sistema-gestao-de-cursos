'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cargoSchema } from '@/lib/schemas'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { CurrencyInput } from "@/components/ui/CurrencyInput"
import { DataTable, Column } from "@/components/ui/DataTable"
import { StatCard } from "@/components/dashboard/StatCard"
import { Plus, Briefcase, Trash2, Edit2, Wallet, TrendingUp, ShieldCheck, Search, Loader2, CheckCircle2, Save } from "lucide-react"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { z } from 'zod'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Select } from "@/components/ui/Select"
import { useRouter } from 'next/navigation'

type CargoFormData = z.infer<typeof cargoSchema>;

interface CargosClientProps {
    initialCargos: any[]
    departamentos: any[]
}

export default function CargosClient({ initialCargos, departamentos }: CargosClientProps) {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
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
            router.refresh()
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
            salario_base_sugerido: Number(cargo.salario_base) || 0
        })
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
        reset({ nome: '', departamentoId: undefined, salario_base_sugerido: 0 })
    }

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return

        setIsDeleting(true)
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

            setConfirmDelete({ isOpen: false, id: null })
            router.refresh()
        } catch (error: any) {
            toast.error("Impossível Eliminar", {
                description: error.message || "Este cargo pode estar vinculado a colaboradores ativos."
            })
        } finally {
            setIsDeleting(false)
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
                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{cargo.nome}</p>
                        <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Nível Profissional</p>
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
                    {formatCurrency(Number(cargo.salario_base) || 0)}
                </span>
            )
        },
        {
            key: 'efetivo',
            header: 'Colaboradores',
            render: (cargo) => (
                <div className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 w-fit">
                    {cargo._count?.funcionarios || 0} Ativos
                </div>
            )
        },
        {
            key: 'actions',
            header: '',
            className: 'text-right w-[100px]',
            render: (cargo) => (
                <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(cargo)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => setConfirmDelete({ isOpen: true, id: cargo.id })} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all">
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ]

    const filteredData = initialCargos.filter(c =>
        c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.departamento?.nome?.toLowerCase().includes(search.toLowerCase())
    )

    const averageSalary = initialCargos.length ? initialCargos.reduce((acc, c) => acc + (Number(c.salario_base) || 0), 0) / initialCargos.length : 0
    const totalStaff = initialCargos.reduce((acc, c) => acc + (c._count?.funcionarios || 0), 0)

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Cargos e Níveis Ocupacionais
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Definição de funções profissionais e grelhas salariais</p>
                </div>
                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-600 text-sm font-bold h-11 px-6 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95"
                >
                    <Plus size={18} className="mr-2" /> Novo Cargo Profissional
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total de Funções"
                    value={initialCargos.length}
                    icon={Briefcase}
                    variant="green"
                    subStats={[{ label: 'Categorias ativas', value: initialCargos.length }]}
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
            <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <Input
                        placeholder="Pesquisar por cargo, função ou departamento..."
                        className="pl-11 h-12 bg-slate-50 dark:bg-zinc-800/30 border-slate-200 dark:border-zinc-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </Card>

            {/* Data Table */}
            <div className="border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 shadow-sm">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    keyExtractor={(c) => c.id}
                    className="border-none"
                    emptyState={
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-full">
                                <Briefcase size={40} className="opacity-20" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold uppercase tracking-widest">Sem resultados</p>
                                <p className="text-xs text-slate-500">Nenhum cargo corresponde aos critérios de pesquisa</p>
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <Card className="w-full max-w-md p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-in zoom-in-95 shadow-2xl rounded-2xl">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4 mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {editingId ? 'Editar Função' : 'Configurar Função'}
                            </h2>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-slate-400">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300">Designação do Cargo</label>
                                <Input
                                    {...register("nome")}
                                    placeholder="Ex: Consultor de Tecnologia"
                                    className={`bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 font-medium h-12 rounded-xl focus:ring-2 focus:ring-emerald-500/20 ${errors.nome ? 'border-red-500' : ''}`}
                                />
                                {errors.nome && <p className="text-xs font-medium text-red-500">{errors.nome.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300">Departamento Relacionado</label>
                                <Controller
                                    name="departamentoId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            options={departamentos.map(d => ({
                                                value: d.id,
                                                label: d.nome
                                            }))}
                                            placeholder="Selecione o Departamento..."
                                            error={errors.departamentoId?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300">Salário de Referência (Kz)</label>
                                <Controller
                                    name="salario_base_sugerido"
                                    control={control}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            {...field}
                                            error={errors.salario_base_sugerido?.message}
                                            disabled={isSubmitting}
                                            placeholder="0,00"
                                            className={`bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 font-black h-12 rounded-xl text-emerald-600 focus:ring-2 focus:ring-emerald-500/20 ${errors.salario_base_sugerido ? 'border-red-500' : ''}`}
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="ghost" onClick={handleCloseModal} className="flex-1 font-bold h-12 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50">Cancelar</Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 font-bold h-12 rounded-xl text-white gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 ${isSubmitting ? 'bg-slate-100 text-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    {isSubmitting ? 'A processar...' : (editingId ? 'Guardar' : 'Confirmar')}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                title="Remover Função Profissional?"
                message="Tem a certeza que deseja eliminar este cargo? Esta ação removerá a definição salarial e a categoria da estrutura organizacional."
                type="danger"
                confirmText="Sim, Eliminar Permanentemente"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null })}
                isLoading={isDeleting}
            />
        </div>
    )
}
