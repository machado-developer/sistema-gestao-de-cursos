'use client'

import { useState, useEffect } from 'react'
import { OrgChart } from "@/components/rh/OrgChart"
import { Button } from "@/components/ui/Button"
import { Download, Maximize2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function OrganogramaPage() {
    const [depts, setDepts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/rh/departamentos')
            const data = await res.json()
            setDepts(data)
        } catch (error) {
            toast.error("Erro ao carregar estrutura")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-1 min-h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-1000">
            {/* Header */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-2 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                        Organograma Institucional
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estrutura Hierárquica e Funcional</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchData} className="text-[10px] font-black uppercase tracking-widest h-9">
                        <RefreshCw size={14} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Sincronizar
                    </Button>
                    <Button className="bg-slate-900 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest h-9">
                        <Download size={14} className="mr-2" /> Exportar PDF
                    </Button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-zinc-950/30 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800 p-8 custom-scrollbar relative">
                <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-400 uppercase bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 shadow-sm z-20">
                    Interactível - Clique para Expandir
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mapeando Hierarquia...</p>
                    </div>
                ) : depts.length > 0 ? (
                    <OrgChart data={depts} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Nenhuma estrutura detectada</p>
                    </div>
                )}
            </div>

            {/* Legend / Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Nível Estratégico (Adm)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Nível Tático (Departamentos)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Nível Operacional (Funcionários)</span>
                </div>
            </div>
        </div>
    )
}
