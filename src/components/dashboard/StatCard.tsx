import React from 'react'
import { LucideIcon } from 'lucide-react'

interface SubStat {
    label: string
    value: string | number
}

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    variant?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'cyan'
    subStats?: SubStat[]
    className?: string
}

export function StatCard({
    title,
    value,
    icon: Icon,
    variant = 'blue',
    subStats,
    className = ''
}: StatCardProps) {
    const variants = {
        orange: {
            bg: 'bg-[#FF8A00]',
            sidebar: 'bg-[#E67C00]',
            subBg: 'bg-black/10'
        },
        green: {
            bg: 'bg-[#00C853]',
            sidebar: 'bg-[#00A846]',
            subBg: 'bg-black/10'
        },
        red: {
            bg: 'bg-[#D50000]',
            sidebar: 'bg-[#B70000]',
            subBg: 'bg-black/10'
        },
        blue: {
            bg: 'bg-[#2962FF]',
            sidebar: 'bg-[#1E4BDD]',
            subBg: 'bg-black/10'
        },
        purple: {
            bg: 'bg-[#AA00FF]',
            sidebar: 'bg-[#8F00D6]',
            subBg: 'bg-black/10'
        },
        cyan: {
            bg: 'bg-[#00B8D4]',
            sidebar: 'bg-[#009BB3]',
            subBg: 'bg-black/10'
        }
    }

    const style = variants[variant]

    return (
        <div className={`relative overflow-hidden rounded-sm shadow-md group ${className}`}>
            <div className={`flex h-full min-h-[100px] ${style.bg} text-white`}>
                {/* Icon Sidebar */}
                <div className={`w-24 flex items-center justify-center ${style.sidebar} transition-transform group-hover:scale-105 duration-500`}>
                    <Icon size={40} strokeWidth={1.5} className="opacity-90" />
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider opacity-90 mb-0.5">
                        {title}
                    </div>
                    <div className="text-3xl font-black tracking-tight leading-none mb-1">
                        {value}
                    </div>

                    {subStats && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {subStats.map((sub, idx) => (
                                <div key={idx} className={`${style.subBg} px-2 py-0.5 rounded text-[10px] font-bold border border-white/10`}>
                                    <span className="opacity-70 mr-1">{sub.label}:</span>
                                    <span>{sub.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
        </div>
    )
}
