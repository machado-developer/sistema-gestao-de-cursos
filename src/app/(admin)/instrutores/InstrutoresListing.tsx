'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Mail, GraduationCap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface InstrutoresListingProps {
    instrutores: any[]
}

export function InstrutoresListing({ instrutores }: InstrutoresListingProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instrutores.map((instrutor) => (
                <Card key={instrutor.id} className="group hover:border-blue-500/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <User size={24} />
                        </div>
                        <div className="px-2 py-1 rounded-md bg-zinc-800 text-[10px] font-bold uppercase text-zinc-400">
                            Ativo
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-1 truncate">{instrutor.nome}</h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                        <Mail size={14} />
                        <span className="truncate">{instrutor.email}</span>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <GraduationCap size={14} className="text-blue-500" />
                            <span>Corpo Docente</span>
                        </div>
                        <Link href={`/instrutores/${instrutor.id}`}>
                            <Button variant="ghost" size="sm" className="gap-2 group-hover:text-blue-400">
                                Perfil <ChevronRight size={14} />
                            </Button>
                        </Link>
                    </div>
                </Card>
            ))}

            {instrutores.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
                    <User size={48} className="mx-auto text-zinc-700 mb-4" />
                    <h3 className="text-lg font-bold text-zinc-300">Nenhum instrutor cadastrado</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-1 mb-6">
                        Você ainda não registou nenhum docente no sistema para gerir turmas.
                    </p>
                    <Link href="/instrutores/novo">
                        <Button className="gap-2">
                            Registar Primeiro Instrutor
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
