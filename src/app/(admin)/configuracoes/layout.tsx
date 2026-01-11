'use client'

import { SettingsSidebar } from '@/components/settings/SettingsSidebar'

export default function ConfiguracoesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full">
            <SettingsSidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
