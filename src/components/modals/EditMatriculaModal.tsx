'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface EditMatriculaModalProps {
    matricula: any
    isOpen: boolean
    onClose: () => void
}

export function EditMatriculaModal({ matricula, isOpen, onClose }: EditMatriculaModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [statusAcademico, setStatusAcademico] = useState(matricula.status_academico)
    const [estadoPagamento, setEstadoPagamento] = useState(matricula.estado_pagamento)

    const handleSave = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/matriculas/${matricula.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status_academico: statusAcademico,
                    estado_pagamento: estadoPagamento
                })
            })

            if (!res.ok) throw new Error('Erro ao atualizar matrícula')

            toast.success('Matrícula atualizada com sucesso')
            router.refresh()
            onClose()
        } catch (error) {
            toast.error('Falha ao atualizar matrícula')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Editar Matrícula - ${matricula.aluno.nome_completo}`}
        >
            <div className="space-y-6">
                <Select
                    label="Status Académico"
                    value={statusAcademico}
                    onChange={(e) => setStatusAcademico(e.target.value)}
                    options={[
                        { value: 'Cursando', label: 'Cursando' },
                        { value: 'Aprovado', label: 'Aprovado' },
                        { value: 'Reprovado', label: 'Reprovado' }
                    ]}
                />

                <Select
                    label="Estado do Pagamento"
                    value={estadoPagamento}
                    onChange={(e) => setEstadoPagamento(e.target.value)}
                    options={[
                        { value: 'Pendente', label: 'Pendente' },
                        { value: 'Parcial', label: 'Parcial' },
                        { value: 'Pago', label: 'Pago' },
                        { value: 'Isento', label: 'Isento' }
                    ]}
                />

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
