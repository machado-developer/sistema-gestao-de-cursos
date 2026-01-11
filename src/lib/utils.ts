import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA',
        minimumFractionDigits: 2,
    }).format(value)
}

export function serializePrisma<T>(data: T): any {
    if (data === null || data === undefined) return undefined

    if (data instanceof Date) return data.toISOString()

    // Handle Prisma Decimals (checking for toNumber method which is standard in decimal.js)
    if (typeof data === 'object' && data !== null && typeof (data as any).toNumber === 'function') {
        return (data as any).toNumber()
    }

    // Explicitly exclude functions from being passed to Client Components
    if (typeof data === 'function') return undefined

    if (Array.isArray(data)) {
        return data.map(serializePrisma)
    }

    if (typeof data === 'object' && data !== null) {
        const entries = Object.entries(data).map(([key, value]) => [
            key,
            serializePrisma(value),
        ])

        return Object.fromEntries(entries)
    }

    return data
}

