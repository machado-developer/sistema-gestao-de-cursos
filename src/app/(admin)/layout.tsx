'use client'

import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { FloatingClock } from '@/components/FloatingClock'
import { useEffect, useState } from 'react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    useEffect
    return (
        <div className="flex min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <div className="flex-1 flex flex-col min-h-screen relative">
                <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
                <main className={`flex-1 w-full max-w-[100vw] overflow-x-hidden pt-24 p-8 min-h-screen relative z-0 transition-all duration-300 ${isMenuOpen ? 'lg:pl-80' : 'lg:pl-8'
                    }`}>
                    {/* Background gradient overlay - Only visible in Dark Mode */}
                    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-0 dark:opacity-100 transition-opacity duration-1000 bg-[var(--bg-gradient)]" />

                    {children}
                </main>
            </div>
            <FloatingClock />
        </div>
    )
}
