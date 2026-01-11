'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pagamentoSchema } from '@/lib/schemas'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CurrencyInput } from '@/components/ui/CurrencyInput'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Banknote, Loader2, Info } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

type PagamentoFormData = z.infer<typeof pagamentoSchema>

interface PaymentFormProps {
    matricula: any
    onSuccess: () => void
}

export function PaymentForm({ matricula, onSuccess }: PaymentFormProps) {
    const [loading, setLoading] = useState(false)
    const saldoPendente = Number(matricula.valor_total) - Number(matricula.valor_pago)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control
    } = useForm<PagamentoFormData>({
        resolver: zodResolver(pagamentoSchema),
        defaultValues: {
            matriculaId: matricula.id,
            valor: undefined,
            metodo_pagamento: 'Dinheiro'
        }
    })

    const metodoPagamento = watch('metodo_pagamento')

    const onSubmit = async (data: PagamentoFormData) => {
        setLoading(true)

        try {
            const response = await fetch('/api/pagamentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Erro ao processar pagamento')
            }

            toast.success('Pagamento Registrado!', {
                description: `O valor de ${data.valor.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} foi creditado na conta do aluno.`
            })

            onSuccess()
        } catch (err: any) {
            toast.error('Falha no Pagamento', {
                description: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Banknote size={48} />
                </div>
                <p className="text-xs text-zinc-500 uppercase font-black tracking-widest mb-1">Saldo Devedor Atual</p>
                <p className="text-3xl font-black text-white">
                    {saldoPendente.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold uppercase text-xs">
                        {matricula.aluno.nome_completo.charAt(0)}
                    </div>
                    {matricula.aluno.nome_completo}
                </div>
            </div>

            <Alert
                variant="info"
                title="Regra de Negócio: Quitação"
                message="O certificado de conclusão só será emitido após a quitação total do saldo devedor. Pagamentos parciais são permitidos."
            />

            <div className="space-y-4">
                <Controller
                    name="valor"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <CurrencyInput
                            label="Valor do Pagamento (AOA)"
                            placeholder="0.00"
                            value={value}
                            onChange={onChange}
                            error={errors.valor?.message}
                        />
                    )}
                />

                <Select
                    label="Método de Pagamento"
                    value={metodoPagamento}
                    onChange={(e) => setValue('metodo_pagamento', e.target.value as any)}
                    options={[
                        { value: 'Dinheiro', label: 'Dinheiro' },
                        { value: 'Transferência', label: 'Transferência' },
                        { value: 'Multicaixa', label: 'Multicaixa' },
                        { value: 'TPA', label: 'TPA' },
                    ]}
                    error={errors.metodo_pagamento?.message}
                />
            </div>

            <Button className="w-full h-12 gap-2 text-base font-bold shadow-lg shadow-blue-500/20" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Processando...
                    </>
                ) : (
                    <>
                        <Banknote size={20} />
                        Confirmar Pagamento
                    </>
                )}
            </Button>

            <p className="text-[10px] text-center text-zinc-500 uppercase tracking-tighter">
                Operação registrada por: {matricula.usuario_logs || 'Sistema Principal'}
            </p>
        </form>
    )
}
