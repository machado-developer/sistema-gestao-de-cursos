'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { User, Mail, FileText, GraduationCap, Banknote, Download } from 'lucide-react'
import { DataTable, Column } from '@/components/ui/DataTable'
import { generatePdfTable } from '@/lib/pdf-export'
import { TableFilters, FilterConfig } from '@/components/ui/TableFilters'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface AlunoWithMatriculas {
    id: string
    nome_completo: string
    email: string | null
    bi_documento: string
    bolseiro: boolean
    matriculas: any[]
}

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface AlunosTableClientProps {
    alunos: AlunoWithMatriculas[]
    cursos: { id: string; nome: string }[]
    turmas: { id: string; codigo_turma: string }[]
    title: string
    subtitle: string
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function AlunosTableClient({ alunos, cursos, turmas, title, subtitle, pagination }: AlunosTableClientProps) {
    const { t } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
    }

    const onPageChange = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', page.toString()))
    }

    const handleExport = () => {
        const columns = [
            t('pages.students.table.student'),
            t('pages.students.table.bi'),
            t('pages.students.table.financial'),
            t('common.status'),
            'Bolseiro'
        ]

        const data = alunos.map(aluno => {
            const financialStatus = getFinancialStatus(aluno.matriculas) || 'N/A'
            const status = aluno.matriculas.length > 0 ? t('status.active') : t('status.no_enrollment')

            return [
                aluno.nome_completo,
                aluno.bi_documento,
                financialStatus,
                status,
                aluno.bolseiro ? 'Sim' : 'Não'
            ]
        })

        generatePdfTable({
            title: t('pages.students.title'),
            subtitle: `Total: ${pagination.totalItems} alunos`,
            columns,
            data,
            filename: 'lista_alunos'
        })
    }

    const filters: FilterConfig[] = [
        {
            key: 'q',
            label: t('common.search'),
            type: 'search',
            placeholder: t('pages.students.filters.search')
        },
        {
            key: 'status',
            label: t('common.status'),
            type: 'select',
            options: [
                { value: 'ativo', label: t('pages.students.filters.status_active') },
                { value: 'sem_matricula', label: t('pages.students.filters.status_no_enrollment') }
            ]
        },
        {
            key: 'bolseiro',
            label: 'Bolseiro',
            type: 'select',
            options: [
                { value: 'true', label: 'Sim' },
                { value: 'false', label: 'Não' }
            ]
        },
        {
            key: 'estado_pagamento',
            label: t('pages.students.filters.financial_status'),
            type: 'select',
            options: [
                { value: 'Pago', label: t('pages.students.filters.financial_paid') },
                { value: 'Parcial', label: t('pages.students.filters.financial_partial') },
                { value: 'Pendente', label: t('pages.students.filters.financial_pending') }
            ]
        },
        {
            key: 'curso_id',
            label: t('pages.students.filters.course'),
            type: 'select',
            options: cursos.map(c => ({ value: c.id, label: c.nome }))
        },
        {
            key: 'turma_id',
            label: t('pages.students.filters.class'),
            type: 'select',
            options: turmas.map(t => ({ value: t.id, label: t.codigo_turma }))
        },
        {
            key: 'data_inicio',
            label: t('pages.students.filters.enrollment_date_from'),
            type: 'date'
        },
        {
            key: 'data_fim',
            label: t('pages.students.filters.enrollment_date_to'),
            type: 'date'
        }
    ]

    // Calculate financial status for each student
    const getFinancialStatus = (matriculas: any[]) => {
        if (matriculas.length === 0) return null

        const statuses = matriculas.map(m => m.estado_pagamento)
        if (statuses.every(s => s === 'Pago')) return t('status.paid')
        if (statuses.some(s => s === 'Parcial' || s === 'Pago')) return t('status.partial')
        return t('status.pending')
    }

    const columns: Column<AlunoWithMatriculas>[] = [
        {
            key: 'aluno',
            header: t('pages.students.table.student'),
            render: (aluno) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <User size={18} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-app-text">{aluno.nome_completo}</p>
                            {aluno.bolseiro && (
                                <span className="bg-blue-500/10 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/20 font-bold uppercase">
                                    Bolseiro
                                </span>
                            )}
                        </div>
                        {aluno.email && (
                            <div className="flex items-center gap-1 text-xs text-app-muted mt-0.5">
                                <Mail size={12} />
                                <span>{aluno.email}</span>
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'bi',
            header: t('pages.students.table.bi'),
            render: (aluno) => (
                <div className="flex items-center gap-2 text-app-text">
                    <FileText size={14} className="text-app-muted" />
                    <span>{aluno.bi_documento}</span>
                </div>
            )
        },
        {
            key: 'matriculas',
            header: t('pages.students.table.enrollments'),
            render: (aluno) => (
                <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-app-muted" />
                    <span className="text-app-text">{aluno.matriculas.length}</span>
                </div>
            )
        },
        {
            key: 'financeiro',
            header: t('pages.students.table.financial'),
            render: (aluno) => {
                const status = getFinancialStatus(aluno.matriculas)
                if (!status) return <span className="text-app-muted text-xs">N/A</span>

                return (
                    <div className="flex items-center gap-2">
                        <Banknote size={14} className="text-app-muted" />
                        <span className={`text-[10px] font-black uppercase px-2 py-1 border ${status === t('status.paid')
                            ? 'border-green-500/20 text-green-400 bg-green-500/10'
                            : status === t('status.partial')
                                ? 'border-orange-500/20 text-orange-400 bg-orange-500/10'
                                : 'border-red-500/20 text-red-400 bg-red-500/10'
                            }`}>
                            {status}
                        </span>
                    </div>
                )
            }
        },
        {
            key: 'status',
            header: t('common.status'),
            render: (aluno) => (
                <span className={`text-[10px] font-black uppercase px-2 py-1 border ${aluno.matriculas.length > 0
                    ? 'border-green-500/20 text-green-400 bg-green-500/10'
                    : 'border-zinc-700 text-zinc-500 bg-zinc-800/50'
                    }`}>
                    {aluno.matriculas.length > 0 ? t('status.active') : t('status.no_enrollment')}
                </span>
            )
        },
        {
            key: 'actions',
            header: t('common.actions'),
            className: 'text-right',
            render: (aluno) => (
                <div className="flex justify-end gap-2">
                    <Link href={`/alunos/${aluno.id}`}>
                        <Button variant="secondary" className="text-xs h-8 px-3">
                            {t('pages.students.view_profile')}
                        </Button>
                    </Link>
                    <Link href={`/alunos/${aluno.id}/editar`}>
                        <Button variant="ghost" className="text-xs h-8 px-3">
                            {t('common.edit')}
                        </Button>
                    </Link>
                </div>
            )
        }
    ]

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-app-text">{title}</h1>
                    <p className="text-app-muted">{subtitle}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2" onClick={handleExport}>
                        <Download size={18} />
                        Exportar PDF
                    </Button>
                    <Link href="/alunos/novo">
                        <Button className="gap-2">
                            <User size={18} /> {t('pages.students.new')}
                        </Button>
                    </Link>
                </div>
            </div>

            <TableFilters filters={filters} />

            <DataTable
                columns={columns}
                data={alunos}
                keyExtractor={(aluno) => aluno.id}
                emptyState={
                    <div className="text-center py-12">
                        <User size={48} className="mx-auto text-zinc-700 mb-4" />
                        <p className="text-zinc-500 font-bold">
                            {t('pages.students.no_students')}
                        </p>
                        <Link href="/alunos/novo" className="text-blue-500 hover:text-blue-400 text-sm mt-2 inline-block">
                            {t('pages.students.create_first')}
                        </Link>
                    </div>
                }
                pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    onPageChange
                }}
            />
        </>
    )
}
