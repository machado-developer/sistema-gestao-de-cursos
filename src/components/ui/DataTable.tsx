'use client'

import { ReactNode } from 'react'

export interface Column<T> {
    key: string
    header: string
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
                <div className="overflow-x-auto relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Sincronizando...</span>
                            </div>
                        </div>
                    )}
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--text-secondary)] text-xs uppercase tracking-wider">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={`px-6 py-4 font-medium ${column.className || ''}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)] text-sm text-[var(--text-primary)]">
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={keyExtractor(item)}
                                        className="hover:bg-[var(--surface-hover)] transition-colors"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={`px-6 py-4 ${column.className || ''}`}
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
                                            <div className="text-center text-[var(--text-muted)]">
                                                Nenhum resultado encontrado.
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-[var(--text-muted)]">
                        Página <span className="font-medium text-[var(--text-primary)]">{pagination.currentPage}</span> de{' '}
                        <span className="font-medium text-[var(--text-primary)]">{pagination.totalPages}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className="px-3 py-1.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="px-3 py-1.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
