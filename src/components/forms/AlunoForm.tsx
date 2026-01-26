'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { alunoSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Alert } from '@/components/ui/Alert'
import { Save, ArrowLeft, Loader2, UserPlus, FileText, MapPin, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { z } from 'zod'

type AlunoFormData = z.infer<typeof alunoSchema>

interface AlunoFormProps {
    initialData?: AlunoFormData & { id: string }
}

export function AlunoForm({ initialData }: AlunoFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<AlunoFormData>({
        resolver: zodResolver(alunoSchema) as any,
        defaultValues: initialData || {
            nome_completo: '',
            bi_documento: '',
            data_nascimento: '',
            genero: '',
            telefone: '',
            email: '',
            Endereco: '',
            escolaAcademica: '',
            escolaridade: ''
        }
    })

    const generoValue = watch('genero')

    async function onSubmit(data: AlunoFormData) {
        setLoading(true)

        try {
            const url = initialData ? `/api/alunos/${initialData.id}` : '/api/alunos'
            const method = initialData ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || 'Falha ao salvar aluno')
            }

            toast.success(initialData ? 'Aluno Atualizado!' : 'Aluno Cadastrado!', {
                description: `${data.nome_completo} foi ${initialData ? 'atualizado' : 'adicionado'} com sucesso.`
            })

            router.push('/alunos')
            router.refresh()
        } catch (err: any) {
            toast.error('Erro na Operação', {
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Link href="/alunos" className="text-app-muted hover:text-app-text mb-6 inline-flex items-center gap-2 text-sm transition-colors group">
                <div className="w-8 h-8 rounded-full bg-surface-hover/50 flex items-center justify-center group-hover:bg-surface-hover transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Voltar para lista de alunos
            </Link>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-app-text tracking-tight flex items-center gap-3">
                            <UserPlus className="text-blue-500" size={32} />
                            {initialData ? 'Editar Estudante' : 'Novo Estudante'}
                        </h1>
                        <p className="text-app-muted mt-1">
                            {initialData
                                ? 'Atualize os dados do aluno abaixo.'
                                : 'Preencha os dados abaixo para registar um novo aluno no sistema.'}
                        </p>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2 px-8 h-12 shadow-xl shadow-blue-500/10">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {initialData ? 'Atualizar Registo' : 'Salvar Registo'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Informação Pessoal */}
                    <div className="glass-card border border-border bg-card-bg p-8 space-y-6">
                        <div className="flex items-center gap-2 text-blue-500 font-bold mb-2 uppercase text-xs tracking-widest">
                            <FileText size={14} />
                            Informação Pessoal
                        </div>

                        <Input
                            label="Nome Completo"
                            placeholder="Ex: António Manuel Garcia"
                            {...register('nome_completo')}
                            error={errors.nome_completo?.message}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="BI / Documento"
                                placeholder="000123456BA012"
                                {...register('bi_documento')}
                                error={errors.bi_documento?.message}
                            />
                            <Input
                                label="Data de Nascimento"
                                type="date"
                                {...register('data_nascimento')}
                                error={errors.data_nascimento?.message}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label="Género"
                                value={generoValue}
                                onChange={(val) => setValue('genero', val)}
                                options={[
                                    { value: '', label: 'Selecionar' },
                                    { value: 'Masculino', label: 'Masculino' },
                                    { value: 'Feminino', label: 'Feminino' },
                                    { value: 'Outro', label: 'Outro' },
                                ]}
                                error={errors.genero?.message}
                            />
                            <Input
                                label="Telefone"
                                placeholder="+244 9XX XXX XXX"
                                {...register('telefone')}
                                error={errors.telefone?.message}
                            />
                        </div>

                        <Input
                            label="Email (Opcional)"
                            type="email"
                            placeholder="aluno@exemplo.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                    </div>

                    <div className="space-y-8">
                        {/* Residência e Académico */}
                        <div className="glass-card border border-border bg-card-bg p-8 space-y-6">
                            <div className="flex items-center gap-2 text-blue-500 font-bold mb-2 uppercase text-xs tracking-widest">
                                <MapPin size={14} />
                                Localização e Académico
                            </div>

                            <Input
                                label="Endereço de Residência"
                                placeholder="Bairro, Rua, Casa nº"
                                {...register('Endereco')}
                                error={errors.Endereco?.message}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    label="Escola Anterior"
                                    placeholder="Nome da Instituição"
                                    {...register('escolaAcademica')}
                                    error={errors.escolaAcademica?.message}
                                />
                                <Select
                                    label="Escolaridade"
                                    onChange={(val) => setValue('escolaridade', val)}
                                    options={[
                                        { value: '', label: 'Selecionar' },
                                        { value: '6ª Classe', label: '6ª Classe' },
                                        { value: '9ª Classe', label: '9ª Classe' },
                                        { value: '12ª Classe', label: '12ª Classe' },
                                        { value: 'Licenciatura', label: 'Licenciatura' },
                                        { value: 'Mestrado', label: 'Mestrado' },
                                    ]}
                                    error={errors.escolaridade?.message}
                                />
                            </div>
                        </div>

                        {/* Card Informativo das Regras */}
                        <Alert
                            variant="info"
                            title="Regra de Cadastro Único"
                            message="O número de BI é o identificador único do aluno. Não é permitido criar múltiplos registos com o mesmo documento de identificação."
                        />

                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 h-fit">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h4 className="text-app-text font-bold mb-1">Próximo Passo</h4>
                                <p className="text-sm text-app-muted leading-relaxed">
                                    Após criar o perfil do aluno, você será redirecionado para a lista geral onde poderá efetuar a sua <strong>Inscrição em Cursos</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
