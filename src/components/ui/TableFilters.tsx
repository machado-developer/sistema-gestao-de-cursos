'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'
import { Search, X } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'

export interface FilterConfig {
    key: string
    label: string
    type: 'search' | 'select' | 'date'
    placeholder?: string
    options?: { value: string; label: string }[]
}

interface TableFiltersProps {
    filters: FilterConfig[]
    onFilterChange?: (filters: Record<string, string>) => void
}

export function TableFilters({ filters, onFilterChange }: TableFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Initialize state from URL params
    const [filterValues, setFilterValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        filters.forEach(filter => {
            initial[filter.key] = searchParams.get(filter.key) || ''
        })
        return initial
    })

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            updateURL(filterValues)
        }, 300)

        return () => clearTimeout(timer)
    }, [filterValues])

    const updateURL = (values: Record<string, string>) => {
        const params = new URLSearchParams()

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            }
        })

        startTransition(() => {
            router.push(`?${params.toString()}`)
        })

        if (onFilterChange) {
            onFilterChange(values)
        }
    }

    const handleFilterChange = (key: string, value: string) => {
        setFilterValues(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const clearFilters = () => {
        const clearedValues: Record<string, string> = {}
        filters.forEach(filter => {
            clearedValues[filter.key] = ''
        })
        setFilterValues(clearedValues)
        router.push(window.location.pathname)
    }

    const hasActiveFilters = Object.values(filterValues).some(v => v !== '')

    return (
        <div className="glass-card border border-white/5 p-4">
            <div className="flex flex-wrap gap-3 items-end">
                {filters.map((filter) => {
                    if (filter.type === 'search') {
                        return (
                            <div key={filter.key} className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-medium text-zinc-400 mb-2">
                                    {filter.label}
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <Input
                                        type="text"
                                        placeholder={filter.placeholder || `Pesquisar ${filter.label.toLowerCase()}...`}
                                        value={filterValues[filter.key]}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        )
                    }

                    if (filter.type === 'select' && filter.options) {
                        return (
                            <div key={filter.key} className="min-w-[180px]">
                                <label className="block text-xs font-medium text-zinc-400 mb-2">
                                    {filter.label}
                                </label>
                                <Select
                                    value={filterValues[filter.key]}
                                    onChange={(val) => handleFilterChange(filter.key, val)}
                                    options={[
                                        { value: '', label: 'Todos' },
                                        ...filter.options
                                    ]}
                                />
                            </div>
                        )
                    }

                    if (filter.type === 'date') {
                        return (
                            <div key={filter.key} className="min-w-[180px]">
                                <label className="block text-xs font-medium text-zinc-400 mb-2">
                                    {filter.label}
                                </label>
                                <Input
                                    type="date"
                                    value={filterValues[filter.key]}
                                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                />
                            </div>
                        )
                    }

                    return null
                })}

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="gap-2 h-10"
                    >
                        <X size={16} />
                        Limpar
                    </Button>
                )}
            </div>

            {isPending && (
                <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    A filtrar...
                </div>
            )}
        </div>
    )
}
