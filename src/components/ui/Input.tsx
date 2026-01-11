import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-app-secondary">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            bg-surface-hover/50 border border-border px-4 py-2.5 text-app-text placeholder-app-muted rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed transition-all
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && <span className="text-xs text-red-400">{error}</span>}
            </div>
        )
    }
)

Input.displayName = 'Input'
