'use client'

import { Button } from '@/components/ui/Button'
import { User, Mail, GraduationCap, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { DataTable, Column } from '@/components/ui/DataTable'
import { TableFilters, FilterConfig } from '@/components/ui/TableFilters'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface InstrutorWithTurmas {
    id: string
    nome: string
    email: string
    telefone?: string | null
    especialidade?: string | null
    turmas?: any[]
}

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface InstrutoresTableClientProps {
    instrutores: InstrutorWithTurmas[]
    title: string
    subtitle: string
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function InstrutoresTableClient({ instrutores, title, subtitle, pagination }: InstrutoresTableClientProps) {
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
            placeholder: t('pages.instructors.filters.search')
        }
    ]

    const columns: Column<InstrutorWithTurmas>[] = [
        {
            key: 'instrutor',
            header: t('pages.instructors.table.instructor'),
            render: (instrutor) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="font-bold text-white">{instrutor.nome}</p>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                            <Mail size={12} />
                            <span>{instrutor.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'telefone',
            header: t('pages.instructors.table.phone'),
            render: (instrutor) => (
                <span className="text-zinc-300">
                    {instrutor.telefone || 'N/A'}
                </span>
            )
        },
        {
            key: 'especialidade',
            header: t('pages.instructors.table.specialty'),
            render: (instrutor) => (
                <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-blue-400" />
                    <span className="text-zinc-300">
                        {instrutor.especialidade || t('pages.instructors.table.faculty')}
                    </span>
                </div>
            )
        },
        {
            key: 'turmas',
            header: t('pages.instructors.table.classes'),
            render: (instrutor) => (
                <span className="text-zinc-300">
                    {instrutor.turmas?.length || 0}
                </span>
            )
        },
        {
            key: 'actions',
            header: t('common.actions'),
            className: 'text-right',
            render: (instrutor) => (
                <div className="flex justify-end gap-2">
                    <Link href={`/instrutores/${instrutor.id}`}>
                        <Button variant="secondary" className="text-xs h-8 px-3 gap-1">
                            {t('common.profile')} <ChevronRight size={14} />
                        </Button>
                    </Link>
                    <Link href={`/instrutores/${instrutor.id}/editar`}>
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
                <Link href="/instrutores/novo">
                    <Button className="gap-2">
                        <User size={18} /> {t('pages.instructors.new')}
                    </Button>
                </Link>
            </div>

            <TableFilters filters={filters} />

            <DataTable
                columns={columns}
                data={instrutores}
                keyExtractor={(instrutor) => instrutor.id}
                emptyState={
                    <div className="text-center py-12">
                        <User size={48} className="mx-auto text-zinc-700 mb-4" />
                        <h3 className="text-lg font-bold text-zinc-300 mb-2">
                            {t('pages.instructors.no_instructors')}
                        </h3>
                        <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-6">
                            {t('pages.instructors.no_instructors_desc')}
                        </p>
                        <Link href="/instrutores/novo">
                            <Button className="gap-2">
                                {t('pages.instructors.create_first')}
                            </Button>
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
