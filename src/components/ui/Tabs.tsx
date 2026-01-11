'use client'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface TabsProps {
    tabs: { id: string; label: string; icon?: React.ReactNode }[]
    activeTab: string
    onTabChange: (id: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                        activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                    )}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
