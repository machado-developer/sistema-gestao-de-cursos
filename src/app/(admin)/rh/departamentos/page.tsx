'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { DataTable, Column } from "@/components/ui/DataTable"
import { StatCard } from "@/components/dashboard/StatCard"
import { Plus, Building2, Trash2, Edit2, Users, PieChart, Activity, Search, X } from "lucide-react"
import { toast } from "sonner"

export default function DepartamentosPage() {
    const [depts, setDepts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ id: '', nome: '', descricao: '' })
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchDepts()
    }, [])

    const fetchDepts = async () => {
        try {
            const res = await fetch('/api/rh/departamentos')
            const data = await res.json()
            setDepts(data)
        } catch (error) {
            toast.error("Erro ao carregar departamentos")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const method = formData.id ? 'PUT' : 'POST'
            const url = formData.id ? `/api/rh/departamentos/${formData.id}` : '/api/rh/departamentos'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: formData.nome,
                    descricao: formData.descricao
                })
            })
            if (!res.ok) throw new Error()
            toast.success(formData.id ? "Departamento atualizado" : "Departamento criado")
            setShowModal(false)
            setFormData({ id: '', nome: '', descricao: '' })
            fetchDepts()
        } catch (error) {
            toast.error("Erro ao salvar departamento")
        }
    }

    const handleEdit = (dept: any) => {
        setFormData({ id: dept.id, nome: dept.nome, descricao: dept.descricao || '' })
        setShowModal(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Confirmar eliminação?")) return
        try {
            const res = await fetch(`/api/rh/departamentos/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error()
            toast.success("Departamento removido")
            fetchDepts()
        } catch (error) {
            toast.error("Erro ao remover departamento")
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
                    <button onClick={() => handleDelete(dept.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-all">
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
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                        Estrutura por Departamentos
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Níveis de Organização e Unidades de Negócio</p>
                </div>
                <Button onClick={() => { setFormData({ id: '', nome: '', descricao: '' }); setShowModal(true); }} className="bg-blue-600 text-[10px] font-black uppercase tracking-widest h-9 border-b-2 border-blue-800">
                    <Plus size={16} className="mr-2" /> Novo Departamento
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                        <Input
                            placeholder="PESQUISAR DEPARTAMENTO OU UNIDADE..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest"
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
                            <h2 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tighter">
                                {formData.id ? 'Editar Unidade' : 'Configurar Nova Unidade'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Departamento</label>
                                <Input
                                    value={formData.nome}
                                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                    placeholder="Ex: Direção de Operações"
                                    className="bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 font-bold h-11"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Missão / Descritivo Curto</label>
                                <textarea
                                    value={formData.descricao}
                                    onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                                    placeholder="Defina o propósito desta unidade escolar ou administrativa..."
                                    className="w-full min-h-[100px] p-3 text-sm font-bold bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[var(--text-primary)] transition-all"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 font-black uppercase tracking-widest text-[10px] h-11">Cancelar</Button>
                                <Button type="submit" className="flex-1 bg-blue-600 font-black uppercase tracking-widest text-[10px] h-11 border-b-4 border-blue-800">
                                    {formData.id ? 'Guardar Alterações' : 'Confirmar Registo'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
