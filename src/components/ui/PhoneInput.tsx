import { forwardRef, useState, useEffect } from 'react'
import { Input } from './Input'

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label?: string
    error?: string
    value?: string
    onChange?: (value: string) => void
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ label, error, value = '', onChange, className = '', onBlur, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState('')

        const formatPhone = (val: string) => {
            // Remove non-digits
            const digits = val.replace(/\D/g, '')

            // Limit to 9 digits
            const limited = digits.slice(0, 9)

            // Apply mask: XXX XXX XXX
            if (limited.length <= 3) return limited
            if (limited.length <= 6) return `${limited.slice(0, 3)} ${limited.slice(3)}`
            return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`
        }

        useEffect(() => {
            const formatted = formatPhone(value || '')
            if (formatted !== displayValue) {
                setDisplayValue(formatted)
            }
        }, [value])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, '').slice(0, 9)
            if (onChange) {
                onChange(rawValue)
            }
        }

        return (
            <Input
                {...props}
                ref={ref}
                type="text"
                value={displayValue}
                onChange={handleChange}
                onBlur={onBlur}
                className={className}
                label={label}
                error={error}
                placeholder="9XX XXX XXX"
                maxLength={11} // 9 digits + 2 spaces
            />
        )
    }
)

PhoneInput.displayName = 'PhoneInput'
