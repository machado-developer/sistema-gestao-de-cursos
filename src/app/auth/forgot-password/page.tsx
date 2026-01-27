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
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

            <Card className="w-full max-w-md p-8 border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-xl relative z-10 shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                        <Mail className="text-blue-500" size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Esqueceu a senha?</h1>
                    <p className="text-sm text-zinc-400 mt-2 font-medium">Insira o seu email para recuperar o acesso.</p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Endereço de Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="exemplo@newtech.ao"
                                    className="h-14 pl-12 bg-zinc-950/50 border-2 border-zinc-800 focus:border-blue-600 transition-all rounded-xl text-white font-bold"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20 group transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <span className="group-hover:scale-105 transition-transform">Recuperar Senha</span>
                            )}
                        </Button>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Voltar para o Login
                        </Link>
                    </form>
                ) : (
                    <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <div className="flex items-center gap-3 text-green-500 mb-2 justify-center">
                                <ShieldCheck size={20} />
                                <span className="text-sm font-black uppercase tracking-widest">E-mail Enviado</span>
                            </div>
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                                Se o e-mail <strong>{email}</strong> estiver registado, receberá um link de recuperação em poucos minutos.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                        >
                            Voltar para o Login
                        </Link>
                    </div>
                )}
            </Card>
        </div>
    )
}
