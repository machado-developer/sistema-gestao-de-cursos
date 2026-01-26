'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PaymentForm } from '@/components/forms/PaymentForm'
import { User, School, Banknote, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/lib/utils'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'

interface MatriculasClientProps {
    initialMatriculas: any[]
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function MatriculasClient({ initialMatriculas, pagination }: MatriculasClientProps) {
    const [selectedMatricula, setSelectedMatricula] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const pathname = window.location.pathname
    const searchParams = new URLSearchParams(window.location.search)

    const handleOpenPayment = (matricula: any) => {
        setSelectedMatricula(matricula)
        setIsModalOpen(true)
    }

    const handlePaymentSuccess = () => {
        setIsModalOpen(false)
        setSelectedMatricula(null)
        router.refresh()
    }

    const onPageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set('page', page.toString())
        router.push(`${window.location.pathname}?${params.toString()}`)
    }

    const handleExport = () => {
        const columns = [
            'Aluno',
            'Curso',
            'Turma',
            'Status',
            'Estado Pagamento',
            'Valor Pago'
        ]

        const data = initialMatriculas.map(m => [
            m.aluno.nome_completo,
            m.turma.curso.nome,
            m.turma.codigo_turma,
            m.status_academico,
            m.estado_pagamento,
            formatCurrency(Number(m.valor_pago))
        ])

        DocumentService.generate(DocumentType.ENROLLMENT_LIST, ExportFormat.PDF, data, {
            title: 'Relatório de Matrículas',
            columns,
            filename: 'lista_matriculas'
        })
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button variant="outline" className="gap-2" onClick={handleExport}>
                    <Download size={18} />
                    Exportar PDF
                </Button>
            </div>
            <div className="glass-card border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-zinc-900/40 min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 text-zinc-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Aluno / Curso</th>
                                <th className="px-6 py-4 font-medium">Turma</th>
                                <th className="px-6 py-4 font-medium">Status Académico</th>
                                <th className="px-6 py-4 font-medium">Financeiro</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {initialMatriculas.length > 0 ? (
                                initialMatriculas.map((m: any) => (
                                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{m.aluno.nome_completo}</p>
                                                    <p className="text-xs text-zinc-500">{m.turma.curso.nome}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-zinc-300">
                                                <School size={14} className="text-zinc-500" />
                                                <span>{m.turma.codigo_turma}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${m.status_academico === 'Aprovado'
                                                ? 'text-green-400 border-green-500/20 bg-green-500/10'
                                                : m.status_academico === 'Reprovado'
                                                    ? 'text-red-400 border-red-500/20 bg-red-500/10'
                                                    : 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                                                }`}>
                                                {m.status_academico}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${m.estado_pagamento === 'Pago'
                                                    ? 'text-green-400 border-green-500/20 bg-green-500/10'
                                                    : m.estado_pagamento === 'Parcial'
                                                        ? 'text-orange-400 border-orange-500/20 bg-orange-500/10'
                                                        : 'text-zinc-400 border-white/10 bg-white/5'
                                                    }`}>
                                                    {m.estado_pagamento}
                                                </span>
                                                <p className="text-[10px] text-zinc-500 mt-1">
                                                    Pago: {formatCurrency(Number(m.valor_pago))}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 px-2 text-xs"
                                                    onClick={() => DocumentService.generate(DocumentType.MATRICULA_CONFIRMATION, ExportFormat.PDF, m)}
                                                    title="Baixar Confirmação de Matrícula"
                                                >
                                                    <Download size={12} className="mr-1" />
                                                    Confirmação
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    className="h-8 px-2 text-xs gap-1"
                                                    onClick={() => handleOpenPayment(m)}
                                                    disabled={m.estado_pagamento === 'Pago'}
                                                >
                                                    <Banknote size={12} />
                                                    Pagar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-zinc-500">
                                        Nenhuma matrícula encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between px-2 mt-4">
                <div className="text-sm text-zinc-500">
                    Página <span className="font-medium text-zinc-300">{pagination.currentPage}</span> de{' '}
                    <span className="font-medium text-zinc-300">{pagination.totalPages}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage <= 1}
                        className="px-3 py-1.5 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage >= pagination.totalPages}
                        className="px-3 py-1.5 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                        Próxima
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registar Pagamento"
            >
                {selectedMatricula && (
                    <PaymentForm
                        matricula={selectedMatricula}
                        onSuccess={handlePaymentSuccess}
                    />
                )}
            </Modal>
        </>
    )
}
