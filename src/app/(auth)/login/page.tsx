'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/schemas'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(data: LoginFormData) {
        setServerError(null)

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (res?.error) {
                setServerError('Credenciais inválidas ou conta não autorizada.')
                return
            }

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setServerError('Ocorreu um erro inesperado. Tente novamente.')
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
                    <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Sistema de Gestão Escolar e RH</p>
                </div>

                {serverError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-[10px] font-black uppercase tracking-widest text-center">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Endereço de Email</label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="admin@gestao.com"
                            className={`bg-zinc-800/50 border-white/10 text-white placeholder-zinc-500 h-11 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Chave de Acesso</label>
                            <span className="text-[9px] font-black text-blue-400 cursor-pointer hover:text-blue-300 uppercase tracking-widest">Esqueci a senha</span>
                        </div>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className={`bg-zinc-800/50 border-white/10 text-white placeholder-zinc-500 h-11 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 mb-4 bg-blue-600 hover:bg-blue-700 text-[11px] font-black uppercase tracking-[0.2em] border-b-4 border-blue-800 flex items-center justify-center gap-2">
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                        {isSubmitting ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                        © 2026 MACHA-TECH • SOLUÇÕES CORPORATIVAS
                    </p>
                </div>
            </div>
        </div>
    )
}
