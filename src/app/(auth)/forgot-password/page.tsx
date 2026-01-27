'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { forgotPassword } from './actions'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await forgotPassword(email)

        if (result.error) {
            toast.error(result.error)
        } else {
            setSubmitted(true)
            toast.success('Pedido enviado com sucesso')
        }
        setLoading(false)
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                    <Mail className="text-blue-600" size={32} />
                </div>
                <h1 className="text-3xl font-extrabold text-zinc-900 mb-2 tracking-tight">Recuperar Acesso</h1>
                <p className="text-zinc-500 text-sm font-medium">Insira o seu email para receber as instruções.</p>
            </div>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Endereço de Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemplo@newtech.ao"
                                className="h-14 pl-12 bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all rounded-xl font-medium"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-900/20 group transition-all flex items-center justify-center gap-3"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-white" size={20} />
                        ) : (
                            <span className="group-hover:scale-105 transition-transform">ENVIAR INSTRUÇÕES</span>
                        )}
                    </Button>

                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest mt-6"
                    >
                        <ArrowLeft size={16} />
                        Voltar para o Login
                    </Link>
                </form>
            ) : (
                <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
                        <div className="flex items-center gap-3 text-green-600 mb-3 justify-center">
                            <ShieldCheck size={24} />
                            <span className="text-sm font-black uppercase tracking-widest">E-mail Enviado</span>
                        </div>
                        <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                            Se o e-mail <strong className="text-zinc-900">{email}</strong> estiver registado, receberá um link de recuperação em poucos minutos.
                        </p>
                    </div>

                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Voltar para o Login
                    </Link>
                </div>
            )}
        </div>
    )
}
