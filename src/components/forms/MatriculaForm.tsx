'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { matriculaSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Alert } from '@/components/ui/Alert'
import { ArrowLeft, Loader2, BookOpen, GraduationCap, DollarSign, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { z } from 'zod'

type MatriculaFormData = z.infer<typeof matriculaSchema>

export function MatriculaForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [alunos, setAlunos] = useState<{ id: string, nome_completo: string }[]>([])
    const [turmas, setTurmas] = useState<{ id: string, codigo_turma: string, curso: { nome: string, preco_base: number } }[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<MatriculaFormData>({
        resolver: zodResolver(matriculaSchema) as any,
        defaultValues: {
            alunoId: '',
            turmaId: '',
            valor_total: 0,
            desconto: 0
        }
    })

    const selectedTurmaId = watch('turmaId')
    const selectedAlunoId = watch('alunoId')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [alunosRes, turmasRes] = await Promise.all([
                    fetch('/api/alunos').then(r => r.json()),
                    fetch('/api/turmas').then(r => r.json())
                ])
                setAlunos(alunosRes)
                setTurmas(turmasRes)
            } catch (err) {
                toast.error('Erro de Conexão', { description: 'Não foi possível carregar os dados de alunos e turmas.' })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const selectedTurma = turmas.find(t => t.id === selectedTurmaId)
        if (selectedTurma) {
            setValue('valor_total', Number(selectedTurma.curso.preco_base))
        }
    }, [selectedTurmaId, turmas, setValue])

    async function onSubmit(data: MatriculaFormData) {
        setLoading(true)

        try {
            const res = await fetch('/api/matriculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || 'Falha ao registrar matrícula')
            }

            toast.success('Matrícula Confirmada!', {
                description: 'O aluno foi vinculado à turma com sucesso.'
            })

            router.push('/matriculas')
            router.refresh()
        } catch (err: any) {
            toast.error('Erro na Matrícula', {
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Link href="/matriculas" className="text-zinc-400 hover:text-white mb-6 inline-flex items-center gap-2 text-sm transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Voltar para lista de matrículas
            </Link>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <BookOpen className="text-blue-500" size={32} />
                            Nova Matrícula
                        </h1>
                        <p className="text-zinc-500 mt-1">Efetue a inscrição de um estudante num curso e defina as condições financeiras.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-card border border-white/5 bg-zinc-900/40 p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase text-xs tracking-widest">
                            <UserCheck size={14} />
                            Seleção de Estudante e Turma
                        </div>

                        <Select
                            label="Estudante"
                            value={selectedAlunoId}
                            onChange={(val) => setValue('alunoId', val)}
                            options={[
                                { value: '', label: 'Selecionar Aluno' },
                                ...alunos.map(a => ({ value: a.id, label: a.nome_completo }))
                            ]}
                            error={errors.alunoId?.message}
                        />

                        <Select
                            label="Turma Disponível"
                            value={selectedTurmaId}
                            onChange={(val) => setValue('turmaId', val)}
                            options={[
                                { value: '', label: 'Selecionar Turma' },
                                ...turmas.map(t => ({
                                    value: t.id,
                                    label: `${t.codigo_turma} - ${t.curso.nome}`
                                }))
                            ]}
                            error={errors.turmaId?.message}
                        />

                        <div className="pt-4">
                            <Alert
                                variant="info"
                                title="Atenção à Lotação"
                                message="Verifique se a turma ainda possui vagas disponíveis antes de confirmar. O sistema impedirá matrículas em turmas lotadas."
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="glass-card border border-white/5 bg-zinc-900/40 p-6 sm:p-8 space-y-6">
                            <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase text-xs tracking-widest">
                                <DollarSign size={14} />
                                Condições Financeiras
                            </div>

                            <Input
                                label="Valor Total da Formação (AOA)"
                                type="number"
                                {...register('valor_total', { valueAsNumber: true })}
                                error={errors.valor_total?.message}
                                placeholder="0.00"
                            />

                            <Input
                                label="Desconto Aplicado (AOA)"
                                type="number"
                                {...register('desconto', { valueAsNumber: true })}
                                error={errors.desconto?.message}
                                placeholder="0.00"
                            />

                            <div className="p-4 rounded-xl bg-blue-500/5 border border-white/5">
                                <div className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Líquido</div>
                                <div className="text-xl sm:text-2xl font-black text-white">
                                    {(watch('valor_total') - (watch('desconto') || 0)).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button type="submit" disabled={loading} className="w-full h-14 gap-2 text-lg font-black shadow-xl shadow-blue-500/20">
                                {loading ? <Loader2 className="animate-spin" size={24} /> : <GraduationCap size={24} />}
                                Confirmar Matrícula
                            </Button>

                            <p className="text-[10px] text-center text-zinc-500 uppercase tracking-widest leading-relaxed">
                                Esta operação irá gerar um débito pendente na conta do aluno.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
