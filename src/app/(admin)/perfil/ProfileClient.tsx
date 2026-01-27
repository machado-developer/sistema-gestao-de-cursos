'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { User, Mail, Shield, Lock, Eye, EyeOff, Building2, Briefcase, Camera, Loader2 } from 'lucide-react'
import { updatePassword } from './actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

interface ProfileClientProps {
    user: any
}

export function ProfileClient({ user }: ProfileClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [showPasswords, setShowPasswords] = useState(false)
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await updatePassword(passwords)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
            setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
        setLoading(false)
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!user.funcionario?.id) {
            toast.error("Vínculo de funcionário não encontrado para upload")
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('tipo', 'Foto')

        try {
            const res = await fetch(`/api/rh/funcionarios/${user.funcionario.id}/documentos`, {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error("Falha no upload")

            toast.success("Foto atualizada com sucesso!")
            router.refresh() // Refresh to get the new session/image data
        } catch (error) {
            toast.error("Erro ao carregar a foto")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const initials = user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    const photoUrl = user.funcionario?.documentos?.[0]?.url

    return (
        <div className="max-w-5xl mx-auto p-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hidden Input */}
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
            />

            {/* Header / Intro */}
            <div className="border-b-2 border-slate-200 dark:border-zinc-800 pb-4">
                <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                    O Meu Perfil
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Gestão de informações pessoais e segurança da conta
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Info & Photo */}
                <div className="space-y-6">
                    <Card className="p-8 flex flex-col items-center text-center border-2 border-slate-100 dark:border-zinc-800 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black border-4 border-white dark:border-zinc-900 shadow-xl overflow-hidden relative">
                                {photoUrl ? (
                                    <Image src={photoUrl} alt={user.name} width={128} height={128} className="object-cover w-full h-full" />
                                ) : (
                                    initials
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                        <Loader2 className="text-white animate-spin" size={32} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="absolute bottom-1 right-1 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg text-blue-600 border border-slate-100 dark:border-zinc-700 hover:scale-110 transition-transform disabled:opacity-50"
                            >
                                <Camera size={18} />
                            </button>
                        </div>

                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">{user.name}</h2>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase rounded shadow-sm mb-6">
                            {user.role}
                        </span>

                        <div className="w-full space-y-4 pt-4 border-t border-slate-50 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded text-slate-400">
                                    <Mail size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{user.email}</p>
                                </div>
                            </div>

                            {user.funcionario && (
                                <>
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded text-slate-400">
                                            <Briefcase size={16} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cargo</p>
                                            <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                {user.funcionario.cargo?.nome || 'Não definido'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded text-slate-400">
                                            <Building2 size={16} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Departamento</p>
                                            <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                {user.funcionario.departamento?.nome || 'Não definido'}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-amber-500 bg-amber-500/5">
                        <div className="flex gap-4">
                            <div className="text-amber-500">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-amber-600 tracking-widest mb-1">Dica de Segurança</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Nunca partilhe a sua senha com ninguém. Use uma senha forte com letras, números e símbolos.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 border-2 border-slate-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50 dark:border-zinc-800">
                            <div className="p-2 bg-blue-600 text-white rounded shadow-md shadow-blue-600/20">
                                <Lock size={20} />
                            </div>
                            <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
                                Alterar Senha
                            </h3>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senha Atual</label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords ? 'text' : 'password'}
                                            required
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            className="h-12 border-2 focus:border-blue-500 pr-10"
                                            placeholder="Digite a senha atual"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords(!showPasswords)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                                        >
                                            {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nova Senha</label>
                                    <Input
                                        type={showPasswords ? 'text' : 'password'}
                                        required
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        className="h-12 border-2 focus:border-blue-500"
                                        placeholder="No mínimo 6 caracteres"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirmar Nova Senha</label>
                                    <Input
                                        type={showPasswords ? 'text' : 'password'}
                                        required
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                        className="h-12 border-2 focus:border-blue-500"
                                        placeholder="Repita a nova senha"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 disabled:opacity-50"
                            >
                                {loading ? 'Actualizando...' : 'Actualizar Senha'}
                            </Button>
                        </form>
                    </Card>

                    <Card className="p-8 border-2 border-slate-100 dark:border-zinc-800 overflow-hidden relative">
                        <div className="absolute right-[-20px] top-[-20px] opacity-10">
                            <Shield size={120} />
                        </div>
                        <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-4">
                            Privacidade da Conta
                        </h3>
                        <p className="text-xs text-slate-500 mb-6 max-w-lg leading-relaxed">
                            Controlamos o acesso à sua conta através de cookies de sessão seguros e encriptação de ponta a ponta para as suas credenciais. Se notar alguma atividade suspeita, informe imediatamente o suporte técnico.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 text-[10px] font-black uppercase rounded">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Ligação Segura
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase rounded">
                                Sessão Activa
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
