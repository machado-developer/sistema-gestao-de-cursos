'use client'

import { ReactNode } from 'react'
import { Button } from './Button'

export interface Column<T> {
    key: string
    header: ReactNode
    render: (item: T) => ReactNode
    className?: string
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    keyExtractor: (item: T) => string
    emptyState?: ReactNode
    className?: string
    loading?: boolean
    pagination?: {
        currentPage: number
        totalPages: number
        onPageChange: (page: number) => void
    }
}

export function DataTable<T>({
    columns,
    data,
    keyExtractor,
    emptyState,
    className = '',
    loading,
    pagination
}: DataTableProps<T>) {
    return (
        <div className="space-y-4">
            <div className={`glass-card border border-[var(--border-color)] overflow-hidden ${className}`}>
                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={`px-6 py-4 font-bold ${column.className || ''}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="animate-pulse">
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4">
                                                <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-md w-3/4 skeleton" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : data.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={keyExtractor(item)}
                                        className="group/row hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-200"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={`px-6 py-4 transition-colors ${column.className || ''}`}
                                            >
                                                {column.render(item)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-20">
                                        {emptyState || (
                                            <div className="text-center text-slate-400">
                                                Nenhum resultado encontrado.
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Cards */}
                <div className="md:hidden">
                    {data.length > 0 ? (
                        <div className="divide-y divide-[var(--border-color)]">
                            {data.map((item) => (
                                <div
                                    key={keyExtractor(item)}
                                    className="p-4 space-y-3 bg-[var(--card-bg)]"
                                >
                                    {columns.map((column) => (
                                        <div key={column.key} className="flex flex-col gap-1">
                                            {column.header && (
                                                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                                                    {column.header}
                                                </span>
                                            )}
                                            <div className={column.className}>
                                                {column.render(item)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12">
                            {emptyState || (
                                <div className="text-center text-[var(--text-muted)]">
                                    Nenhum resultado encontrado.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {pagination && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-slate-500">
                        Página <span className="font-semibold text-slate-900 dark:text-white">{pagination.currentPage}</span> de{' '}
                        <span className="font-semibold text-slate-900 dark:text-white">{pagination.totalPages}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className="h-9 px-4 rounded-lg"
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="h-9 px-4 rounded-lg"
                        >
                            Próxima
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
