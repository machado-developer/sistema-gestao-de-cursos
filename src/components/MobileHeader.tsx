'use client'

import { Menu, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface MobileHeaderProps {
    onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-white/10 flex items-center justify-between px-4 z-40 lg:hidden">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="text-zinc-400 hover:text-white"
                >
                    <Menu size={24} />
                </Button>
                <h1 className="text-lg font-bold text-gradient tracking-tight">
                    Gestão PRO
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-zinc-400">
                    <Bell size={20} />
                </Button>
            </div>
        </header>
    )
}
