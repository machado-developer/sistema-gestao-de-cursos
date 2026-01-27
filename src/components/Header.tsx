'use client'

import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Settings, LogOut, User, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/logo2.png'

interface HeaderProps {
    onMenuToggle: () => void
    isMenuOpen: boolean
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
    const { data: session } = useSession()
    const { theme, toggleTheme } = useTheme()
    const { language, setLanguage, t } = useLanguage()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Sync language with URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const currentLang = params.get('lang')

        if (currentLang !== language) {
            params.set('lang', language)
            router.replace(`?${params.toString()}`)
        }
    }, [language])

    const handleLanguageChange = (newLang: 'pt' | 'en') => {
        setLanguage(newLang)
        const params = new URLSearchParams(searchParams.toString())
        params.set('lang', newLang)
        router.replace(`?${params.toString()}`)
    }

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] z-50 flex">
            {/* Sidebar Section - Fixed width matching sidebar */}
            <div className={`flex items-center px-6 border-r border-[var(--border-color)] transition-all duration-300 ${isMenuOpen ? 'w-72' : 'w- px-0 overflow-hidden'
                }`}>
                <Image
                    src={Logo}
                    alt="Logo"
                    width={50}
                    height={50}
                    className="cover"
                    priority
                    quality={100}
                />
            </div>

            {/* Main Header Section */}
            <div className="flex-1 flex items-center px-6 gap-6">
                {/* Menu Toggle - Always visible */}
                <button
                    onClick={onMenuToggle}
                    className="p-2 hover:bg-[var(--surface-hover)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                    aria-label={mounted ? t('header.toggle_menu') : 'Toggle Menu'}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right Section: Settings & User */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-[var(--surface-hover)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                        aria-label={mounted ? t('header.toggle_theme') : 'Toggle Theme'}
                    >
                        {mounted && theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {/* Language Selector */}
                    <div className="flex items-center gap-1 p-1 bg-[var(--surface-color)] border border-[var(--border-color)]">
                        <button
                            onClick={() => handleLanguageChange('pt')}
                            className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${mounted && language === 'pt' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            PT
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${mounted && language === 'en' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-[var(--border-color)]" />

                    {/* User Menu */}
                    {session?.user && (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 p-2 hover:bg-[var(--surface-hover)] transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-black border border-white/20 rounded-full overflow-hidden">
                                    {(session.user as any).image ? (
                                        <Image
                                            src={(session.user as any).image}
                                            alt={session.user.name || ''}
                                            width={32}
                                            height={32}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : session.user.name ? (
                                        session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-[var(--text-primary)]">{session.user.name}</p>
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">
                                        {(session.user as any).role === 'ADMIN' ? (mounted ? t('header.administrator') : 'Admin') : ((session.user as any).role || 'User')}
                                    </p>
                                </div>
                                <ChevronDown size={16} className={`text-[var(--text-muted)] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && mounted && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--card-bg)] border border-[var(--border-color)] overflow-hidden z-50 shadow-xl rounded-lg">
                                        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--surface-color)]/50 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-lg font-black border-2 border-white/20 rounded-full overflow-hidden shrink-0">
                                                {(session.user as any).image ? (
                                                    <Image
                                                        src={(session.user as any).image}
                                                        alt={session.user.name || ''}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : session.user.name ? (
                                                    session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                                                ) : (
                                                    <User size={24} />
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-bold text-[var(--text-primary)] truncate">{session.user.name}</p>
                                                <p className="text-xs text-[var(--text-muted)] truncate mb-1">{session.user.email}</p>
                                                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase rounded shadow-sm">
                                                    {(session.user as any).role === 'ADMIN' ? (mounted ? t('header.administrator') : 'Admin') : ((session.user as any).role || 'User')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <Link
                                                href="/perfil"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-colors rounded-md"
                                            >
                                                <User size={16} />
                                                {t('common.profile')}
                                            </Link>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-hover)] transition-colors rounded-md">
                                                <Settings size={16} />
                                                {t('sidebar.settings')}
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-[var(--border-color)]">
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                {t('common.sign_out')}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
