'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                throw new Error('Credenciais inválidas.')
            }

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
            {/* Background ambient light */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="glass-card p-10 w-full max-w-md border border-white/5 bg-zinc-900/40">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">Gestão PRO</h1>
                    <p className="text-zinc-400 text-sm">Entre para acessar o sistema</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="admin@gestao.com"
                        required
                        className="bg-gray-100/50"
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-400">Senha</label>
                            <span className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Esqueci a senha</span>
                        </div>
                        <Input
                            name="password"
                            type="password"
                            required
                            className="bg-gray-100/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full py-3 mb-4">
                        {loading ? 'Entrando...' : 'Acessar'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
