'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { Input } from './Input'

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label?: string
    error?: string
    value?: number
    onChange?: (value: number) => void
    currencySymbol?: string
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ label, error, value = 0, onChange, className = '', currencySymbol = 'Kz', onBlur, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState('')

        const formatATMValue = (val: number) => {
            return new Intl.NumberFormat('pt-AO', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val)
        }

        useEffect(() => {
            // Only update display value if it's different from the formatted current value
            // (prevents cursor jumping in some edge cases, although less critical for ATM style)
            const formatted = formatATMValue(value)
            if (formatted !== displayValue) {
                setDisplayValue(formatted)
            }
        }, [value])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, '')
            // ATM logic: every digit typed shifts the decimals
            const numericValue = parseInt(rawValue || '0', 10) / 100

            if (onChange) {
                onChange(numericValue)
            }
        }

        return (
            <div className="relative group w-full">
                {currencySymbol && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-600 z-10 uppercase tracking-tighter">
                        {currencySymbol}
                    </span>
                )}
                <Input
                    {...props}
                    ref={ref}
                    type="text"
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    className={`pl-10 h-11 font-black text-slate-700 dark:text-white ${className}`}
                    label={label}
                    error={error}
                    placeholder="0,00"
                />
            </div>
        )
    }
)

CurrencyInput.displayName = 'CurrencyInput'
