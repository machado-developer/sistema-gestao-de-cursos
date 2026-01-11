'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, Users, GraduationCap, User } from 'lucide-react'
import { DataTable, Column } from '@/components/ui/DataTable'
import { TableFilters, FilterConfig } from '@/components/ui/TableFilters'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface TurmaWithRelations {
    id: string
    codigo_turma: string
    status: string
    data_inicio: Date
    curso: {
        nome: string
    }
    instrutor: {
        nome: string
    } | null
    matriculas: any[]
}

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface TurmasTableClientProps {
    turmas: TurmaWithRelations[]
    title: string
    subtitle: string
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function TurmasTableClient({ turmas, title, subtitle, pagination }: TurmasTableClientProps) {
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

    const filters: FilterConfig[] = [
        {
            key: 'q',
            label: t('common.search'),
            type: 'search',
            placeholder: t('pages.classes.filters.search')
        },
        {
            key: 'status',
            label: t('common.status'),
            type: 'select',
            options: [
                { value: 'Em Andamento', label: t('pages.classes.filters.status_ongoing') },
                { value: 'Concluída', label: t('pages.classes.filters.status_completed') },
                { value: 'Planejada', label: t('pages.classes.filters.status_planned') }
            ]
        },
        {
            key: 'data_inicio',
            label: t('pages.classes.filters.start_date'),
            type: 'date'
        }
    ]

    const columns: Column<TurmaWithRelations>[] = [
        {
            key: 'codigo',
            header: t('pages.classes.table.code'),
            render: (turma) => (
                <Link href={`/turmas/${turma.id}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1.5 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors cursor-pointer">
                        {turma.codigo_turma}
                    </span>
                </Link>
            )
        },
        {
            key: 'curso',
            header: t('pages.classes.table.course'),
            render: (turma) => (
                <Link href={`/turmas/${turma.id}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <GraduationCap size={16} className="text-blue-400" />
                    <span className="font-medium text-white">{turma.curso.nome}</span>
                </Link>
            )
        },
        {
            key: 'instrutor',
            header: t('pages.classes.table.instructor'),
            render: (turma) => (
                <div className="flex items-center gap-2 text-zinc-300">
                    <User size={14} className="text-zinc-500" />
                    <span>{turma.instrutor?.nome || 'N/A'}</span>
                </div>
            )
        },
        {
            key: 'data_inicio',
            header: t('pages.classes.table.start_date'),
            render: (turma) => (
                <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar size={14} className="text-zinc-500" />
                    <span>{new Date(turma.data_inicio).toLocaleDateString('pt-PT')}</span>
                </div>
            )
        },
        {
            key: 'status',
            header: t('common.status'),
            render: (turma) => {
                const statusMap: Record<string, string> = {
                    'Concluída': t('status.completed'),
                    'Em Andamento': t('status.ongoing'),
                    'Planejada': t('status.planned')
                }

                return (
                    <span className={`text-xs px-2 py-1 border font-bold uppercase ${turma.status === 'Concluída'
                        ? 'text-green-400 border-green-500/20 bg-green-500/10'
                        : turma.status === 'Em Andamento'
                            ? 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                            : 'text-orange-400 border-orange-500/20 bg-orange-500/10'
                        }`}>
                        {statusMap[turma.status] || turma.status}
                    </span>
                )
            }
        },
        {
            key: 'alunos',
            header: t('pages.classes.table.students'),
            render: (turma) => (
                <div className="flex items-center gap-2">
                    <Users size={14} className="text-zinc-500" />
                    <span className="text-zinc-300">{turma.matriculas.length}</span>
                </div>
            )
        },
        {
            key: 'actions',
            header: t('common.actions'),
            className: 'text-right',
            render: (turma) => (
                <div className="flex justify-end gap-2">
                    <Link href={`/turmas/${turma.id}`}>
                        <Button variant="secondary" className="text-xs h-8 px-3">
                            {t('pages.classes.manage_grades')}
                        </Button>
                    </Link>
                    <Link href={`/turmas/${turma.id}/editar`}>
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
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-zinc-400">{subtitle}</p>
                </div>
                <Link href="/turmas/novo">
                    <Button className="gap-2">
                        <GraduationCap size={18} /> {t('pages.classes.new')}
                    </Button>
                </Link>
            </div>

            <TableFilters filters={filters} />

            <DataTable
                columns={columns}
                data={turmas}
                keyExtractor={(turma) => turma.id}
                emptyState={
                    <div className="text-center py-12">
                        <GraduationCap size={48} className="mx-auto text-zinc-700 mb-4" />
                        <p className="text-zinc-500 font-bold">
                            {t('pages.classes.no_classes')}
                        </p>
                        <Link href="/turmas/novo" className="text-blue-500 hover:text-blue-400 text-sm mt-2 inline-block">
                            {t('pages.classes.create_first')}
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
