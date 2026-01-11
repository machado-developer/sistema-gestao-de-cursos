'use client'

import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Settings, LogOut, User, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
        <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--sidebar-bg)] border-b border-white/10 z-50 flex">
            {/* Sidebar Section - Fixed width matching sidebar */}
            <div className={`flex items-center px-6 border-r border-white/10 transition-all duration-300 ${isMenuOpen ? 'w-72' : 'w- px-0 overflow-hidden'
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
                    className="p-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
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
                        className="p-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                        aria-label={mounted ? t('header.toggle_theme') : 'Toggle Theme'}
                    >
                        {mounted && theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {/* Language Selector */}
                    <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10">
                        <button
                            onClick={() => handleLanguageChange('pt')}
                            className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${mounted && language === 'pt' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            PT
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${mounted && language === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10" />

                    {/* User Menu */}
                    {session?.user && (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 p-2 hover:bg-white/5 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-black border border-white/20 rounded-full">
                                    <User size={20} />
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-white">{session.user.name}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">{mounted ? t('header.administrator') : 'Admin'}</p>
                                </div>
                                <ChevronDown size={16} className={`text-zinc-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && mounted && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-white/10 overflow-hidden z-50">
                                        <div className="p-4 border-b border-white/10">
                                            <p className="text-sm font-bold text-white">{session.user.name}</p>
                                            <p className="text-xs text-zinc-500">{session.user.email}</p>
                                        </div>

                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                                                <User size={16} />
                                                {t('common.profile')}
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                                                <Settings size={16} />
                                                {t('sidebar.settings')}
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-white/10">
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
