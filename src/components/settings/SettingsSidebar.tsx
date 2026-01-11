'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, User, Palette, LucideIcon } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface SettingsMenuItem {
    key: string
    href: string
    icon: LucideIcon
    labelKey: string
}

export function SettingsSidebar() {
    const pathname = usePathname()
    const { t } = useLanguage()

    const menuItems: SettingsMenuItem[] = [
        {
            key: 'company',
            href: '/configuracoes/empresa',
            icon: Building2,
            labelKey: 'settings.menu.company'
        },
        {
            key: 'admin',
            href: '/configuracoes/administrador',
            icon: User,
            labelKey: 'settings.menu.administrator'
        },
        {
            key: 'appearance',
            href: '/configuracoes/aparencia',
            icon: Palette,
            labelKey: 'settings.menu.appearance'
        }
    ]

    return (
        <aside className="w-60 border-r border-white/10 p-6 space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-4 px-3">
                {t('settings.title')}
            </h2>
            {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon size={18} />
                        {t(item.labelKey)}
                    </Link>
                )
            })}
        </aside>
    )
}
