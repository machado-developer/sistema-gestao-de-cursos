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
    pagination
}: DataTableProps<T>) {
    return (
        <div className="space-y-4">
            <div className={`glass-card border border-border overflow-hidden ${className}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-border bg-surface-hover/50 text-app-secondary text-xs uppercase tracking-wider">
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
                        <tbody className="divide-y divide-border text-sm text-app-text">
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={keyExtractor(item)}
                                        className="hover:bg-surface-hover/50 transition-colors"
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
                                            <div className="text-center text-app-muted">
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
                    <div className="text-sm text-app-muted">
                        Página <span className="font-medium text-app-text">{pagination.currentPage}</span> de{' '}
                        <span className="font-medium text-app-text">{pagination.totalPages}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className="px-3 py-1.5 text-sm font-medium text-app-text bg-card-bg border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="px-3 py-1.5 text-sm font-medium text-app-text bg-card-bg border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover transition-colors"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
