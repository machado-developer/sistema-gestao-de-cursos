'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { instrutorSchema } from '@/lib/schemas'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { User, Mail, Loader2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'
import Link from 'next/link'

type InstrutorFormData = z.infer<typeof instrutorSchema>

interface InstrutorFormProps {
    initialData?: InstrutorFormData & { id: string }
}

export function InstrutorForm({ initialData }: InstrutorFormProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InstrutorFormData>({
        resolver: zodResolver(instrutorSchema),
        defaultValues: initialData || {
            nome: '',
            email: '',
            especialidade: '',
            telefone: '',
            bi_documento: '',
            bio: '',
            genero: ''
        }
    })

    const onSubmit = async (data: InstrutorFormData) => {
        setLoading(true)
        try {
            const url = initialData ? `/api/instrutores/${initialData.id}` : '/api/instrutores'
            const method = initialData ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || result.message || 'Erro na operação')
            }

            toast.success(initialData ? 'Instrutor atualizado!' : 'Instrutor criado!', {
                description: `O instrutor ${data.nome} foi ${initialData ? 'atualizado' : 'cadastrado'} com sucesso.`
            })
            router.push('/instrutores')
            router.refresh()
        } catch (err: any) {
            toast.error('Erro na operação', {
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/instrutores">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">{initialData ? 'Editar Instrutor' : 'Novo Instrutor'}</h1>
                    <p className="text-zinc-400">{initialData ? 'Atualize os dados do professor' : 'Cadastre um novo professor no sistema'}</p>
                </div>
            </div>

            <Card className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                                <User size={16} className="text-blue-500" /> Dados Pessoais
                            </h3>
                            <Input
                                label="Nome Completo"
                                placeholder="Ex: Professor Manuel"
                                {...register('nome')}
                                error={errors.nome?.message}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Especialidade"
                                    placeholder="Ex: Matemática"
                                    {...register('especialidade')}
                                    error={errors.especialidade?.message}
                                />
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Gênero</label>
                                    <select
                                        {...register('genero')}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-blue-500 transition-all outline-none"
                                    >
                                        <option value="">Selecionar...</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                    </select>
                                </div>
                            </div>
                            <Input
                                label="NIF / BI"
                                placeholder="Nº do Documento"
                                {...register('bi_documento')}
                                error={errors.bi_documento?.message}
                            />
                        </div>

                        {/* Section 2: Contact & Bio */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                                <Mail size={16} className="text-blue-500" /> Contacto & Bio
                            </h3>
                            <Input
                                label="Email Profissional"
                                type="email"
                                placeholder="email@exemplo.com"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                            <Input
                                label="Telefone"
                                placeholder="+244 ..."
                                {...register('telefone')}
                                error={errors.telefone?.message}
                            />
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Biografia / Observações</label>
                                <textarea
                                    {...register('bio')}
                                    placeholder="Breve descrição do instrutor..."
                                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex gap-4">
                        <Button type="submit" className="flex-1 h-12 gap-2" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Salvar Alterações' : 'Cadastrar Instrutor')}
                        </Button>
                        <Link href="/instrutores" className="flex-1">
                            <Button variant="secondary" type="button" className="w-full h-12" disabled={loading}>
                                Cancelar
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
