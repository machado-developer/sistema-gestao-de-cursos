import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className = '', label, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-app-secondary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        className={`
            bg-[var(--surface-color)] border border-[var(--border-color)] px-4 py-2.5 pr-12
            text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed transition-all
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'hover:border-[var(--border-hover)]'}
            ${className}
          `}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors focus:outline-none"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {error && <span className="text-xs text-red-400">{error}</span>}
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'
