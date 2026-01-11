import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string | number; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, options, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-app-secondary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={`
                appearance-none w-full bg-surface-hover/50 border border-border rounded-lg px-4 py-2.5 text-app-text placeholder-app-muted
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed transition-all
                ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                ${className}
            `}
                        {...props}
                    >
                        <option value="" disabled className="bg-surface-color text-app-muted">Selecione...</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-surface-color text-app-text">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-app-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                {error && <span className="text-xs text-red-400">{error}</span>}
            </div>
        )
    }
)

Select.displayName = 'Select'
