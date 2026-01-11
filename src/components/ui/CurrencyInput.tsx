import { forwardRef, useEffect, useState } from 'react'
import { Input } from './Input'

interface CurrencyInputProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
    value?: number | string
    onChange: (value: number) => void
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value, onChange, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState('')

        useEffect(() => {
            if (value !== undefined && value !== null) {
                // If the user is not typing (active element check logic could go here, but keep it simple first)
                // For now, just sync if value changes externally or initially
                // We'll format it as money
                const numberVal = Number(value)
                if (!isNaN(numberVal)) {
                    setDisplayValue(new Intl.NumberFormat('pt-AO', {
                        style: 'currency',
                        currency: 'AOA'
                    }).format(numberVal))
                }
            } else {
                setDisplayValue('')
            }
        }, [value])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value

            // Allow only numbers and decimals
            const numericsOnly = rawValue.replace(/[^0-9,.]/g, '')
            setDisplayValue(numericsOnly)
        }

        const handleBlur = () => {
            // Parse the string to a number
            // Remove non-numeric characters except comma and dot (handle Kz symbol etc)
            // AO locale uses comma as decimal separator usually, but let's be robust
            let numericString = displayValue
                .replace(/[^\d,.-]/g, '') // Keep digits, comma, dot, minus
                .replace(/\./g, '')       // Remove thousands separators (dots) - ASSUMPTION: input is PT-AO format (1.000,00)
                .replace(',', '.')        // Replace decimal comma with dot

            if (numericString.split('.').length > 2) {
                // Handle cases where multiple dots might appear? 
                // Simple regex replacement might be risky if aggressive.
                // Let's rely on standard parsing
            }

            const parsed = parseFloat(numericString)

            if (!isNaN(parsed)) {
                onChange(parsed)
                setDisplayValue(new Intl.NumberFormat('pt-AO', {
                    style: 'currency',
                    currency: 'AOA'
                }).format(parsed))
            } else {
                onChange(0)
                setDisplayValue('')
            }
        }

        const handleFocus = () => {
            // On focus, show raw number for easier editing? 
            // Or keep it simple. Let's keep formatted but user has to delete valid chars.
            // Better: strip formatting on focus
            if (value) {
                setDisplayValue(value.toString())
            }
        }

        return (
            <Input
                {...props}
                ref={ref}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        )
    }
)

CurrencyInput.displayName = 'CurrencyInput'
