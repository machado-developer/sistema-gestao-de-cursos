'use client'

import { useState, Suspense } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { resetPassword } from '../forgot-password/actions'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [success, setSuccess] = useState(false)

    if (!token) {
        return (
            <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100 mx-auto">
                    <ShieldAlert className="text-red-500" size={32} />
                </div>
                <h1 className="text-xl font-black text-zinc-900 uppercase italic">Token Inválido</h1>
                <p className="text-sm text-zinc-500">Este link de recuperação é inválido ou expirou.</p>
                <Link href="/forgot-password" className="inline-block text-blue-600 font-bold uppercase tracking-widest text-xs border-b border-blue-600 hover:text-blue-800 hover:border-blue-800 transition-colors">
                    Solicitar novo link
                </Link>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (form.newPassword !== form.confirmPassword) {
            return toast.error('As senhas não coincidem')
        }

        setLoading(true)
        const result = await resetPassword(token, form.newPassword)

        if (result.error) {
            toast.error(result.error)
        } else {
            setSuccess(true)
            toast.success(result.success)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 border border-green-100 mx-auto">
                    <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h1 className="text-2xl font-black text-zinc-900 uppercase italic">Senha Alterada!</h1>
                <p className="text-sm text-zinc-500">A sua senha foi redefinida com sucesso. Agora pode utilizar as novas credenciais.</p>
                <Link
                    href="/login"
                    className="w-full inline-flex py-4 bg-blue-900 hover:bg-blue-800 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-900/20 justify-center transition-all"
                >
                    Fazer Login
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                    <Lock className="text-blue-600" size={32} />
                </div>
                <h1 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter italic">Nova Senha</h1>
                <p className="text-sm text-zinc-500 mt-2 font-medium">Defina a sua nova credencial de acesso.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Nova Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <Input
                                type={showPassword ? "text" : "password"}
                                required
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                placeholder="Pelo menos 6 caracteres"
                                className="h-14 pl-12 pr-12 bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all rounded-xl font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Confirmar Senha</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            required
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            placeholder="Sincronize as senhas"
                            className="h-14 border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all rounded-xl font-medium px-6"
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
                        <span className="group-hover:scale-105 transition-transform">REDEFINIR SENHA</span>
                    )}
                </Button>
            </form>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600" size={40} /></div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}
