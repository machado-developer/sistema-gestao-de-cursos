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
        <div className="flex min-h-screen">
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <div className="flex-1 flex flex-col min-h-screen">
                <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
                <main className={`flex-1 w-full max-w-[100vw] overflow-x-hidden pt-24 p-8 min-h-screen relative z-0 transition-all duration-300 ${isMenuOpen ? 'lg:pl-80' : 'lg:pl-8'
                    }`}>
                    {/* Background ambient light - Only visible in Dark Mode */}
                    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden hidden dark:block">
                        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px]" />
                        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px]" />
                    </div>
                    {children}
                </main>
            </div>
            <FloatingClock />
        </div>
    )
}
