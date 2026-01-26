'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { departamentoSchema } from '@/lib/schemas'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { DataTable, Column } from "@/components/ui/DataTable"
import { StatCard } from "@/components/dashboard/StatCard"
import { Plus, Building2, Trash2, Edit2, Users, Activity, Search, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from 'zod'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

type DepartamentoFormData = z.infer<typeof departamentoSchema>;

export default function DepartamentosPage() {
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
        formState: { errors, isSubmitting }
    } = useForm<DepartamentoFormData>({
        resolver: zodResolver(departamentoSchema)
    })

    useEffect(() => {
        fetchDepts()
    }, [])

    const fetchDepts = async () => {
        try {
            const res = await fetch('/api/rh/departamentos')
            const data = await res.json()
            setDepts(data)
        } catch (error) {
            toast.error("Erro ao carregar departamentos", {
                description: "Não foi possível estabelecer ligação com o servidor."
            })
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data: DepartamentoFormData) => {
        try {
            const method = editingId ? 'PUT' : 'POST'
            const url = editingId ? `/api/rh/departamentos/${editingId}` : '/api/rh/departamentos'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error()

            toast.success(editingId ? "Unidade Atualizada" : "Nova Unidade Criada", {
                description: `O departamento "${data.nome}" foi salvo com sucesso no sistema.`,
                duration: 4000
            })

            handleCloseModal()
            fetchDepts()
        } catch (error) {
            toast.error("Falha na Operação", {
                description: "Ocorreu um erro ao tentar salvar os dados do departamento."
            })
        }
    }

    const handleEdit = (dept: any) => {
        setEditingId(dept.id)
        reset({
            nome: dept.nome,
            descricao: dept.descricao || ''
        })
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
        reset({ nome: '', descricao: '' })
    }

    const handleOpenDelete = (id: string) => {
        setConfirmDelete({ isOpen: true, id, loading: false })
    }

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return

        setConfirmDelete(prev => ({ ...prev, loading: true }))
        try {
            const res = await fetch(`/api/rh/departamentos/${confirmDelete.id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Falha na comunicação com o servidor.")
            }

            toast.success("Registo Eliminado", {
                description: "O departamento foi removido permanentemente da estrutura orgânica.",
                icon: <Trash2 size={16} className="text-emerald-500" />
            })

            setConfirmDelete({ isOpen: false, id: null, loading: false })
            fetchDepts()
        } catch (error: any) {
            toast.error("Erro ao Remover", {
                description: error.message || "Não foi possível eliminar este departamento."
            })
            setConfirmDelete(prev => ({ ...prev, loading: false }))
        }
    }

    const columns: Column<any>[] = [
        {
            key: 'nome',
            header: 'Departamento',
            render: (dept) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-sm">
                        <Building2 size={16} />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-primary)] uppercase tracking-tight">{dept.nome}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-medium">#{dept.id.slice(0, 8)}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'descricao',
            header: 'Missão / Descrição',
            render: (dept) => (
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1 max-w-[300px]">
                    {dept.descricao || '---'}
                </p>
            )
        },
        {
            key: 'colaboradores',
            header: 'Efetivo',
            render: (dept) => (
                <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-[var(--text-secondary)] border border-slate-200 dark:border-zinc-700">
                        {dept._count?.funcionarios || 0} Colaboradores
                    </div>
                </div>
            )
        },
        {
            key: 'actions',
            header: '',
            className: 'text-right',
            render: (dept) => (
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(dept)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleOpenDelete(dept.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-all">
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ]

    const filteredData = depts.filter(d =>
        d.nome.toLowerCase().includes(search.toLowerCase()) ||
        d.descricao?.toLowerCase().includes(search.toLowerCase())
    )

    const totalFuncionarios = depts.reduce((acc, curr) => acc + (curr._count?.funcionarios || 0), 0)

    return (
        <div className="p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                        Estrutura por Departamentos
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Níveis de Organização e Unidades de Negócio</p>
                </div>
                <Button onClick={() => setShowModal(true)} className="bg-[var(--accent-primary)] text-sm font-medium h-10 px-6 text-white shadow-sm hover:opacity-90 transition-opacity">
                    <Plus size={18} className="mr-2" /> Novo Departamento
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Unidades Ativas"
                    value={depts.length}
                    icon={Building2}
                    variant="blue"
                    subStats={[{ label: 'Departamentos registados', value: depts.length }]}
                />
                <StatCard
                    title="Efetivo Total"
                    value={totalFuncionarios}
                    icon={Users}
                    variant="purple"
                    subStats={[{ label: 'Média por unidade', value: depts.length ? (totalFuncionarios / depts.length).toFixed(1) : 0 }]}
                />
                <StatCard
                    title="Cobertura"
                    value="100%"
                    icon={Activity}
                    variant="green"
                    subStats={[{ label: 'Estado estrutural', value: 'Regularizado' }]}
                />
            </div>

            {/* Filter Toolbar */}
            <Card className="p-4 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm overflow-visible">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-primary)] transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR DEPARTAMENTO OU UNIDADE..."
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
                keyExtractor={(d) => d.id}
                loading={loading}
                className="group border border-slate-200 dark:border-zinc-800 shadow-sm"
                emptyState={
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <Building2 size={48} className="opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">Nenhum departamento encontrado</p>
                    </div>
                }
            />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-in zoom-in-95 shadow-xl">
                        <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-2 mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                                {editingId ? 'Editar Unidade' : 'Configurar Nova Unidade'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Nome do Departamento</label>
                                <Input
                                    {...register("nome")}
                                    placeholder="Ex: Direção de Operações"
                                    className={`bg-slate-50 dark:bg-zinc-800/50 border-[var(--border-color)] dark:border-zinc-800 font-medium h-11 ${errors.nome ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {errors.nome && <p className="text-xs font-medium text-red-500">{errors.nome.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Missão / Descritivo Curto</label>
                                <textarea
                                    {...register("descricao")}
                                    placeholder="Defina o propósito desta unidade escolar ou administrativa..."
                                    className={`w-full min-h-[100px] p-3 text-sm font-medium bg-slate-50 dark:bg-zinc-800/50 border border-[var(--border-color)] dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] text-[var(--text-primary)] transition-all ${errors.descricao ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {errors.descricao && <p className="text-xs font-medium text-red-500">{errors.descricao.message}</p>}
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
                title="Eliminar Departamento"
                message="Tem a certeza que deseja remover este departamento? Esta ação não pode ser revertida e pode afetar o histórico dos colaboradores vinculados."
                type="danger"
                confirmText="Eliminar Permanentemente"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null, loading: false })}
                isLoading={confirmDelete.loading}
            />
        </div>
    )
}
