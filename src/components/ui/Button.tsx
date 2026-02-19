import React from 'react'
import { Loader2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    isLoading?: boolean
    isSuccess?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, isSuccess, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
            secondary: 'bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] border border-[var(--border-color)]',
            ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
            outline: 'bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20',
            success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20',
        }

        const sizes = {
            sm: 'h-8 px-3 text-xs gap-1.5',
            md: 'h-11 px-6 text-sm gap-2',
            lg: 'h-12 px-8 text-base gap-3',
            icon: 'h-10 w-10 p-0 flex items-center justify-center',
        }

        return (
            <button
                ref={ref}
                disabled={isLoading || isSuccess || disabled}
                className={cn(
                    'inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed',
                    variants[isSuccess ? 'success' : variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}
                {isSuccess && <Check size={size === 'sm' ? 14 : 18} />}
                {!isLoading && !isSuccess && children}
                {(isLoading || isSuccess) && size !== 'icon' && children}
            </button>
        )
    }
)

Button.displayName = 'Button'
