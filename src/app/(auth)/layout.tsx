'use client'

import Image from 'next/image'
import Logo from '@/assets/logo2.png'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">

            {/* Left Column - Form Content */}
            <div className="flex flex-col justify-center p-8 lg:p-24 relative bg-white text-zinc-900">
                {/* Mobile/Desktop Header Logo */}
                <div className="absolute top-8 left-8 lg:left-12 flex items-center gap-3">
                    <Image src={Logo} alt="NewTech Logo" className="w-10 h-10 object-contain" />
                    <span className="text-zinc-900 font-black text-xl tracking-tighter uppercase">NewTech</span>
                </div>

                <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-left-8 duration-700 mt-16 lg:mt-0">
                    {children}
                </div>

                <div className="absolute bottom-8 left-0 w-full text-center lg:text-left lg:pl-12 text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
                    © 2026 NewTech Angola
                </div>
            </div>

            {/* Right Column - Branding and Feature Card */}
            <div className="relative hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[120px]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
                </div>

                <div className="absolute top-8 right-12 z-20 flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors cursor-pointer group">
                    <span className="text-sm font-bold">Suporte</span>
                    <div className="w-8 h-8 rounded-full border border-blue-200/20 flex items-center justify-center group-hover:border-blue-200/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>
                    </div>
                </div>

                {/* Feature Card Mockup */}
                <div className="relative z-10 w-full max-w-lg">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl text-white select-none">
                            7
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white mb-2 leading-tight">Gestão HR <br />Simplificada</h3>
                            <p className="text-blue-100/70 text-sm mb-8 max-w-[280px]">
                                Gestão de recursos humanos e gestao de cursos
                            </p>

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 inline-flex items-center gap-3 shadow-lg shadow-blue-900/50 mb-6">
                                <span className="text-xs font-black text-white uppercase tracking-wider">Nova Versão 2.0</span>
                            </div>

                            <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/5">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-blue-900 flex items-center justify-center text-[8px] text-white">U{i}</div>
                                    ))}
                                </div>
                                <div className="text-xs text-white/50">
                                    <strong className="text-white block">+1.2k</strong> Alunos ativos
                                </div>
                            </div>
                        </div>

                        {/* Floating visual element */}
                        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-b from-blue-500/20 to-indigo-500/20 rounded-2xl rotate-12 blur-sm group-hover:rotate-6 transition-all duration-500" />
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-3">Expandindo Horizontes</h2>
                        <p className="text-blue-200/50 text-sm max-w-md mx-auto leading-relaxed">
                            A plataforma NewTech evolui constantemente .
                        </p>

                        <div className="flex justify-center gap-2 mt-8">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
