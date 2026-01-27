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
import Link from 'next/link'

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
        <div className="w-full max-w-sm mx-auto">
            <div className="mb-10 text-left">
                <h1 className="text-4xl font-extrabold text-zinc-900 mb-2 tracking-tight">Iniciar Sessão</h1>
                <p className="text-zinc-500 text-sm font-medium">
                    Não tem uma conta? <span className="text-blue-600 font-bold cursor-pointer hover:underline hover:text-blue-700 transition-colors">Contacte o Admin</span>
                </p>
            </div>

            {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-xs font-bold uppercase tracking-wide flex items-center gap-3 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Endereço de Email</label>
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="exemplo@newtech.ao"
                        className={`bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 h-14 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                    />
                    {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase pl-1 mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Chave de Acesso</label>
                    <Input
                        {...register("password")}
                        type="password"
                        placeholder="••••••••"
                        className={`bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 h-14 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
                    />
                    {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase pl-1 mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-5 h-5 border-2 border-zinc-300 rounded bg-zinc-50 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                            {/* Checkbox visual placeholder */}
                        </div>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-800 transition-colors">Lembrar-me</span>
                    </div>
                    <Link href="/forgot-password">
                        <span className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest border-b border-transparent hover:border-blue-600">
                            Esqueci a Senha?
                        </span>
                    </Link>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group transition-all transform active:scale-[0.98]">
                    {isSubmitting ? <Loader2 className="animate-spin text-white" size={20} /> : null}
                    {isSubmitting ? 'VERIFICANDO...' : 'ENTRAR NA PLATAFORMA'}
                </Button>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-zinc-200"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">Ou continue com</span>
                    <div className="flex-grow border-t border-zinc-200"></div>
                </div>
                {/* 
                <div className="space-y-3">
                    <button type="button" className="w-full h-12 border border-zinc-200 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors text-xs font-bold text-zinc-600 group">
                        <div className="w-5 h-5 flex items-center justify-center font-serif font-black text-lg text-blue-600">G</div>
                        CONTINUAR COM GOOGLE
                    </button>
                    <button type="button" className="w-full h-12 border border-zinc-200 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors text-xs font-bold text-zinc-600 group">
                        <div className="w-5 h-5 flex items-center justify-center font-black text-lg text-blue-700">f</div>
                        CONTINUAR COM FACEBOOK
                    </button>
                </div> */}
            </form>
        </div>
    )
}
