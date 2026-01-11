'use client'

import { Search } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function AlunoSearch({ initialValue }: { initialValue?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="relative flex-1 group">
            <Search className={`absolute left-4 top-3.5 transition-colors ${isPending ? 'text-blue-500 animate-pulse' : 'text-zinc-500 group-hover:text-blue-400'}`} size={18} />
            <input
                type="text"
                defaultValue={initialValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Pesquisar por nome, email ou BI..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm placeholder:text-zinc-600"
            />
        </div>
    )
}
