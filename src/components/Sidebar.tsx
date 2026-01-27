'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Logo from '@/assets/logo.png'
import Logo2 from '@/assets/logo2.png'
import {
    LayoutDashboard,
    LogOut,
    ChevronDown,
    ChevronRight,
    X,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTheme } from '@/components/ThemeProvider'
import Image from 'next/image'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

import { MODULE_PERMISSION_MAP, hasPermission } from '@/lib/rbac'

import { getNavigation } from '@/config/navigation'

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const userRole = session?.user?.role || 'USER'
    const { language, setLanguage, t } = useLanguage()
    const { theme, toggleTheme } = useTheme()
    const [openSections, setOpenSections] = useState<string[]>([])
    const [mounted, setMounted] = useState(false)

    const modules = getNavigation(t)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleSection = (name: string) => {
        setOpenSections(prev =>
            prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
        )
    }

    const filteredModules = modules.filter(module => {
        const requiredPermission = MODULE_PERMISSION_MAP[module.id]
        if (!requiredPermission) return true // Módulos sem permissão mapeada (como dashboard) são públicos
        return hasPermission(userRole, requiredPermission)
    })

    useEffect(() => {
        const activeSections: string[] = []
        filteredModules.forEach(module => {
            module.submodules.forEach(sub => {
                if (sub.items.some(item => pathname === item.href)) {
                    activeSections.push(module.id)
                    activeSections.push(sub.id)
                }
            })
        })

        setOpenSections(prev => Array.from(new Set([...prev, ...activeSections])))
    }, [pathname, userRole])

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`w-72 h-screen
             fixed left-0 top-0 glass p-6 flex flex-col
              z-[70] overflow-y-auto custom-scrollbar
               transition-transform duration-300 
               ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-[var(--sidebar-bg)]`}>
                <div className="flex items-center justify-between mb-10 pb-4">
                    <div className="flex items-center gap-3">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={200}
                            height={100}
                            className="object-contain"
                            priority
                            quality={100}
                        />
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="lg:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent-primary)]">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex flex-col gap-1.5 flex-1 p-1">
                    {mounted ? filteredModules.map(module => {
                        const isModuleOpen = openSections.includes(module.id)
                        const hasActiveSub = module.submodules.some(sub =>
                            sub.items.some(item => pathname === item.href)
                        )
                        const ModuleIcon = module.icon

                        return (
                            <div key={module.id} className="flex flex-col">
                                <button
                                    onClick={() => toggleSection(module.id)}
                                    className={`flex items-center justify-between p-2 rounded-md group transition-all border-none outline-none ring-0 ${isModuleOpen || hasActiveSub
                                        ? 'bg-[var(--surface-color)] text-[var(--accent-primary)]'
                                        : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-color)]'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`transition-transform group-hover:scale-110 ${isModuleOpen || hasActiveSub ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
                                            }`}>
                                            <ModuleIcon size={20} strokeWidth={1.5} />
                                        </div>
                                        <span className="font-medium text-[14px] leading-tight">{module.name}</span>
                                    </div>
                                    <div className="opacity-40">
                                        {isModuleOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${isModuleOpen ? 'max-h-[1000px] mt-1' : 'max-h-0'}`}>
                                    <div className="flex flex-col gap-1.5 border-l-2 border-[var(--border-color)] ml-6 py-1">
                                        {module.submodules.map(sub => {
                                            const isSubOpen = openSections.includes(sub.id)
                                            const hasActiveItem = sub.items.some(item => pathname === item.href)

                                            return (
                                                <div key={sub.id} className="flex flex-col px-2">
                                                    <button
                                                        onClick={() => toggleSection(sub.id)}
                                                        className={`flex items-center justify-between py-1.5 px-3 rounded text-[12px] font-medium transition-all border-none outline-none ring-0 ${hasActiveItem ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                                            }`}
                                                    >
                                                        {sub.name}
                                                        <div className="opacity-40">
                                                            {isSubOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                                        </div>
                                                    </button>

                                                    <div className={`overflow-hidden transition-all duration-300 ${isSubOpen ? 'max-h-[500px] mt-0.5' : 'max-h-0'}`}>
                                                        <div className="flex flex-col gap-0.5 pl-2">
                                                            {sub.items.map(item => {
                                                                const Icon = item.icon
                                                                const isActive = pathname === item.href

                                                                return (
                                                                    <Link
                                                                        key={item.href}
                                                                        href={item.href}
                                                                        className={`py-2 px-3 rounded-md transition-all text-[13px] font-medium flex items-center gap-3 ${isActive
                                                                            ? 'bg-[var(--surface-color)] text-[var(--accent-primary)]'
                                                                            : 'text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)]'
                                                                            }`}
                                                                    >
                                                                        <Icon size={18} strokeWidth={1.5} />
                                                                        {item.name}
                                                                    </Link>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="animate-pulse space-y-4 px-2">
                            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                            <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                        </div>
                    )}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-[10px] text-zinc-600 px-2 text-center font-bold tracking-widest opacity-50 uppercase">
                        Newtech Angola
                    </p>
                </div>
            </aside>
        </>
    )
}
