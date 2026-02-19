'use client'

import { useState } from 'react'
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
import { useRouter } from 'next/navigation'

type DepartamentoFormData = z.infer<typeof departamentoSchema>;

interface DepartamentosClientProps {
    initialDepts: any[]
}

export default function DepartamentosClient({ initialDepts }: DepartamentosClientProps) {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    // Confirmation State
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; id: string | null }>({
        isOpen: false,
        id: null
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<DepartamentoFormData>({
        resolver: zodResolver(departamentoSchema)
    })

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
            router.refresh()
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

    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) return

        setIsDeleting(true)
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

            setConfirmDelete({ isOpen: false, id: null })
            router.refresh()
        } catch (error: any) {
            toast.error("Erro ao Remover", {
                description: error.message || "Não foi possível eliminar este departamento."
            })
        } finally {
            setIsDeleting(false)
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
                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{dept.nome}</p>
                        <p className="text-[10px] text-slate-400 font-medium">#{dept.id.slice(0, 8)}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'descricao',
            header: 'Missão / Descrição',
            render: (dept) => (
                <p className="text-xs text-slate-500 line-clamp-1 max-w-[300px]">
                    {dept.descricao || '---'}
                </p>
            )
        },
        {
            key: 'colaboradores',
            header: 'Efetivo',
            render: (dept) => (
                <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                        {dept._count?.funcionarios || 0} Colaboradores
                    </div>
                </div>
            )
        },
        {
            key: 'actions',
            header: '',
            className: 'text-right w-[100px]',
            render: (dept) => (
                <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(dept)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => setConfirmDelete({ isOpen: true, id: dept.id })} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all">
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ]

    const filteredData = initialDepts.filter(d =>
        d.nome.toLowerCase().includes(search.toLowerCase()) ||
        d.descricao?.toLowerCase().includes(search.toLowerCase())
    )

    const totalFuncionarios = initialDepts.reduce((acc, curr) => acc + (curr._count?.funcionarios || 0), 0)

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-100 dark:border-zinc-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Estrutura por Departamentos
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Gestão de unidades organizativas e centros de custo</p>
                </div>
                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-sm font-bold h-11 px-6 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                >
                    <Plus size={18} className="mr-2" /> Novo Departamento
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Unidades Ativas"
                    value={initialDepts.length}
                    icon={Building2}
                    variant="blue"
                    subStats={[{ label: 'Departamentos registados', value: initialDepts.length }]}
                />
                <StatCard
                    title="Efetivo Total"
                    value={totalFuncionarios}
                    icon={Users}
                    variant="purple"
                    subStats={[{ label: 'Média por unidade', value: initialDepts.length ? (totalFuncionarios / initialDepts.length).toFixed(1) : 0 }]}
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
            <Card className="p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <Input
                        placeholder="Pesquisar por nome ou descrição da unidade..."
                        className="pl-11 h-12 bg-slate-50 dark:bg-zinc-800/30 border-slate-200 dark:border-zinc-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                    keyExtractor={(d) => d.id}
                    className="border-none"
                    emptyState={
                        <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-full">
                                <Building2 size={40} className="opacity-20" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold uppercase tracking-widest">Sem unidades</p>
                                <p className="text-xs text-slate-500">Nenhum departamento corresponde à sua pesquisa</p>
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
                                {editingId ? 'Editar Unidade' : 'Configurar Unidade'}
                            </h2>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-slate-400">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300">Nome do Departamento</label>
                                <Input
                                    {...register("nome")}
                                    placeholder="Ex: Direção de Operações"
                                    className={`bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 font-medium h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20 ${errors.nome ? 'border-red-500' : ''}`}
                                />
                                {errors.nome && <p className="text-xs font-medium text-red-500">{errors.nome.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300">Missão / Descritivo Curto</label>
                                <textarea
                                    {...register("descricao")}
                                    placeholder="Defina o propósito desta unidade..."
                                    className={`w-full min-h-[120px] p-4 text-sm font-medium bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white transition-all resize-none ${errors.descricao ? 'border-red-500' : ''}`}
                                />
                                {errors.descricao && <p className="text-xs font-medium text-red-500">{errors.descricao.message}</p>}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="ghost" onClick={handleCloseModal} className="flex-1 font-bold h-12 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50">Cancelar</Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 font-bold h-12 rounded-xl text-white gap-2 shadow-lg shadow-blue-500/20 active:scale-95 ${isSubmitting ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    {isSubmitting ? 'A gravar...' : (editingId ? 'Guardar' : 'Confirmar')}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmDelete.isOpen}
                title="Eliminar Unidade Orgânica?"
                message="Tem a certeza que deseja remover este departamento? Esta ação é irreversível e afetará a hierarquia dos colaboradores vinculados."
                type="danger"
                confirmText="Sim, Eliminar Permanentemente"
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete({ isOpen: false, id: null })}
                isLoading={isDeleting}
            />
        </div>
    )
}

function Save(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    )
}
