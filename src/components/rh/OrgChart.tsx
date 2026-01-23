'use client'

import { Card } from "@/components/ui/Card"
import { Building2, Briefcase, Users, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"

interface OrgNodeProps {
    title: string
    subtitle?: string
    icon: any
    color: string
    isRoot?: boolean
    isSubNode?: boolean
    children?: React.ReactNode
}

function OrgNode({ title, subtitle, icon: Icon, color, isRoot, isSubNode, children }: OrgNodeProps) {
    const [expanded, setExpanded] = useState(true)

    return (
        <div className="flex flex-col items-center">
            {/* The Node Card */}
            <div className={`
                relative p-4 rounded-xl border-2 transition-all duration-500
                ${isRoot
                    ? 'w-64 bg-slate-900 border-slate-700 shadow-2xl scale-110 mb-8'
                    : isSubNode
                        ? 'w-48 bg-slate-50 dark:bg-zinc-800/50 border-slate-100 dark:border-zinc-800 shadow-sm scale-90'
                        : 'w-56 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-lg group hover:border-blue-500'}
            `}>
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isRoot ? 'bg-blue-600 text-white shadow-blue-600/20 shadow-lg' : isSubNode ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
                        <Icon size={isRoot ? 24 : 18} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className={`font-black uppercase tracking-tighter truncate ${isRoot ? 'text-white text-sm' : isSubNode ? 'text-[var(--text-secondary)] text-[10px]' : 'text-[var(--text-primary)] text-xs'}`}>
                            {title}
                        </p>
                        {subtitle && (
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest truncate">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {children && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors shadow-sm z-10"
                    >
                        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
            </div>

            {/* Vertical Line Connector */}
            {children && expanded && (
                <div className="w-px h-12 bg-slate-200 dark:bg-zinc-800 relative">
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-auto flex gap-6 pt-5 items-start">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export function OrgChart({ data }: { data: any[] }) {
    return (
        <div className="flex justify-center p-12 min-w-max overflow-visible">
            <OrgNode
                title="Conselho de Administração"
                subtitle="Newtech Angola - Global"
                icon={Building2}
                color="blue"
                isRoot
            >
                {data.map(dept => (
                    <OrgNode
                        key={dept.id}
                        title={dept.nome}
                        subtitle={`${dept._count?.funcionarios || 0} Colaboradores`}
                        icon={Users}
                        color="blue"
                    >
                        {dept.cargos?.map((cargo: any) => (
                            <OrgNode
                                key={cargo.id}
                                title={cargo.nome}
                                subtitle={`${cargo._count?.funcionarios || 0} Ativos`}
                                icon={Briefcase}
                                color="emerald"
                                isSubNode
                            />
                        ))}
                    </OrgNode>
                ))}
            </OrgNode>
        </div>
    )
}
