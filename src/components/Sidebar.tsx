'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Logo from '@/assets/logo.png'
import Logo2 from '@/assets/logo2.png'
import {
    LayoutDashboard,
    Users,
    BookOpen,
    School,
    ClipboardList,
    Wallet,
    LogOut,
    User as UserIcon,
    ChevronDown,
    ChevronRight,
    Award,
    X,
    Languages,
    Sun,
    Moon,
    Settings,
    History
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTheme } from '@/components/ThemeProvider'
import Image from 'next/image'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const { language, setLanguage, t } = useLanguage()
    const { theme, toggleTheme } = useTheme()
    const [openSections, setOpenSections] = useState<string[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleSection = (name: string) => {
        setOpenSections(prev =>
            prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
        )
    }

    const menuGroups = [
        {
            id: 'main',
            name: t('sidebar.dashboard'),
            items: [
                { name: t('sidebar.dashboard'), href: '/', icon: LayoutDashboard },
            ]
        },
        {
            id: 'academic',
            name: t('sidebar.students'),
            items: [
                { name: t('sidebar.students'), href: '/alunos', icon: Users },
                { name: t('sidebar.courses'), href: '/cursos', icon: BookOpen },
                { name: t('sidebar.classes'), href: '/turmas', icon: School },
                { name: t('sidebar.instructors'), href: '/instrutores', icon: UserIcon },
            ]
        },
        {
            id: 'admin',
            name: t('sidebar.enrollments'),
            items: [
                { name: t('sidebar.enrollments'), href: '/matriculas', icon: ClipboardList },
                { name: t('sidebar.certificates'), href: '/certificados', icon: Award },
            ]
        },
        {
            id: 'finance',
            name: t('sidebar.finance'),
            items: [
                { name: t('sidebar.finance'), href: '/financeiro', icon: Wallet },
            ]
        },
        {
            id: 'audit',
            name: t('sidebar.audit'),
            items: [
                { name: t('sidebar.audit'), href: '/audit', icon: History },
            ]
        },
        {
            id: 'settings',
            name: t('sidebar.settings'),
            items: [
                { name: t('sidebar.settings'), href: '/configuracoes', icon: Settings },
            ]
        },
    ]

    useEffect(() => {
        const activeGroups = menuGroups
            .filter(group => group.items.some(item => pathname === item.href))
            .map(group => group.id)

        setOpenSections(prev => Array.from(new Set([...prev, ...activeGroups])))

        if (onClose) onClose()
    }, [pathname])

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`w-72 h-screen fixed left-0 top-0 glass border-r border-white/10 p-6 flex flex-col z-[70] overflow-y-auto custom-scrollbar transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-[var(--sidebar-bg)]`}>
                <div className="flex items-center justify-between mb-10">
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
                        <button onClick={onClose} className="lg:hidden p-2 text-zinc-900 hover:text-white">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex flex-col gap-6 flex-1 text-zinc-900">
                    {mounted ? menuGroups.map(group => {
                        const isOpenSection = openSections.includes(group.id)
                        const hasActiveChild = group.items.some(item => pathname === item.href)

                        return (
                            <div key={group.id} className="flex flex-col gap-2">
                                <button
                                    onClick={() => toggleSection(group.id)}
                                    className={`flex items-center justify-between px-2 text-[10px] font-black uppercase tracking-widest transition-colors ${hasActiveChild ? 'text-blue-500' : 'text-zinc-900 hover:text-zinc-800 opacity-70'
                                        }`}
                                >
                                    {group.name}
                                    {isOpenSection ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>

                                <div className={`accordion-content ${isOpenSection ? 'open' : ''}`}>
                                    <div className="accordion-inner flex flex-col gap-1">
                                        {group.items.map(item => {
                                            const Icon = item.icon
                                            const isActive = pathname === item.href

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`p-3 transition-all text-sm font-bold flex items-center gap-3 ${isActive
                                                        ? 'bg-blue-600 text-white translate-x-1'
                                                        : 'text-zinc-900 hover:text-blue-500 hover:bg-blue-500/5'
                                                        }`}
                                                >
                                                    <Icon size={18} />
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        // Fallback skeleton or loading state to prevent mismatch
                        <div className="animate-pulse space-y-4 px-2">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
