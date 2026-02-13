'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { BookOpen, Clock, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { DataTable, Column } from '@/components/ui/DataTable'
import { TableFilters, FilterConfig } from '@/components/ui/TableFilters'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface CursoWithTurmas {
    id: string
    nome: string
    descricao: string | null
    preco_base: any
    carga_horaria: number
    turmas: any[]
}

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FileText, Download, Printer } from 'lucide-react'
import { DocumentService, DocumentType, ExportFormat } from '@/services/DocumentService'

interface CursosTableClientProps {
    cursos: CursoWithTurmas[]
    title: string
    subtitle: string
    pagination: {
        currentPage: number
        totalPages: number
        totalItems: number
    }
}

export function CursosTableClient({ cursos, title, subtitle, pagination }: CursosTableClientProps) {
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

    const handleExportList = async (format: ExportFormat) => {
        const columns = [
            t('pages.courses.table.course'),
            t('pages.courses.table.price'),
            t('pages.courses.table.workload'),
            t('pages.courses.table.classes')
        ]

        const data = cursos.map(c => [
            c.nome,
            formatCurrency(Number(c.preco_base)),
            `${c.carga_horaria}h`,
            c.turmas.length.toString()
        ])

        await DocumentService.generate(DocumentType.COURSE_LIST, format, data, {
            title: t('pages.courses.title'),
            columns,
            filename: 'lista_cursos'
        })
    }

    const handleExportCourseDetail = async (curso: CursoWithTurmas) => {
        await DocumentService.generate(DocumentType.COURSE_DETAIL, ExportFormat.PDF, curso)
    }

    const filters: FilterConfig[] = [
        // ... filters remain same
        {
            key: 'q',
            label: t('common.search'),
            type: 'search',
            placeholder: t('pages.courses.filters.search')
        },
        {
            key: 'carga_horaria',
            label: t('pages.courses.filters.workload'),
            type: 'select',
            options: [
                { value: '0-50', label: t('pages.courses.filters.workload_0_50') },
                { value: '50-100', label: t('pages.courses.filters.workload_50_100') },
                { value: '100+', label: t('pages.courses.filters.workload_100_plus') }
            ]
        }
    ]

    const columns: Column<CursoWithTurmas>[] = [
        {
            key: 'curso',
            header: t('pages.courses.table.course'),
            render: (curso) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <BookOpen size={20} />
                    </div>
                    <div className="max-w-xs">
                        <p className="font-bold text-white">{curso.nome}</p>
                        <p className="text-xs text-zinc-500 line-clamp-1">
                            {curso.descricao || t('pages.courses.table.no_description')}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: 'preco',
            header: t('pages.courses.table.price'),
            render: (curso) => (
                <span className="text-green-400 font-bold">
                    {formatCurrency(Number(curso.preco_base))}
                </span>
            )
        },
        {
            key: 'carga_horaria',
            header: t('pages.courses.table.workload'),
            render: (curso) => (
                <div className="flex items-center gap-2 text-zinc-300">
                    <Clock size={14} className="text-zinc-500" />
                    <span>{curso.carga_horaria}h</span>
                </div>
            )
        },
        {
            key: 'turmas',
            header: t('pages.courses.table.classes'),
            render: (curso) => (
                <div className="flex items-center gap-2">
                    <Users size={14} className="text-zinc-500" />
                    <span className="text-zinc-300">{curso.turmas.length}</span>
                </div>
            )
        },
        {
            key: 'actions',
            header: t('common.actions'),
            className: 'text-right',
            render: (curso) => (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="text-xs h-8 px-3 gap-2"
                        onClick={() => handleExportCourseDetail(curso)}
                    >
                        <FileText size={14} /> {t('pages.courses.view_details')}
                    </Button>
                    <Link href={`/cursos/${curso.id}/editar`}>
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
                <div className="flex gap-3">
                    <div className="flex bg-zinc-800 p-1 rounded-md border border-zinc-700">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[10px] font-bold uppercase tracking-wider gap-2 px-3 hover:bg-zinc-700"
                            onClick={() => handleExportList(ExportFormat.PDF)}
                        >
                            <FileText size={14} className="text-blue-400" /> PDF
                        </Button>
                        <div className="w-[1px] bg-zinc-700 mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[10px] font-bold uppercase tracking-wider gap-2 px-3 hover:bg-zinc-700"
                            onClick={() => handleExportList(ExportFormat.XLSX)}
                        >
                            <Download size={14} className="text-emerald-400" /> Excel
                        </Button>
                    </div>

                    <Link href="/cursos/novo">
                        <Button className="gap-2">
                            <BookOpen size={18} /> {t('pages.courses.new')}
                        </Button>
                    </Link>
                </div>
            </div>

            <TableFilters filters={filters} />

            <DataTable
                columns={columns}
                data={cursos}
                keyExtractor={(curso) => curso.id}
                emptyState={
                    <div className="text-center py-12">
                        <BookOpen size={48} className="mx-auto text-zinc-700 mb-4" />
                        <p className="text-zinc-500 font-bold">
                            {t('pages.courses.no_courses')}
                        </p>
                        <Link href="/cursos/novo" className="text-blue-500 hover:text-blue-400 text-sm mt-2 inline-block">
                            {t('pages.courses.create_first')}
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
