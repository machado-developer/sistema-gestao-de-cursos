import React, { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
            secondary: 'bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] border border-[var(--border-color)]',
            ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
            outline: 'bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20',
        }

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-11 px-6 text-sm',
            lg: 'h-12 px-8 text-base',
            icon: 'h-10 w-10 p-0 flex items-center justify-center',
        }

        // Assuming 'cn' is a utility function for combining class names,
        // similar to 'clsx' or 'classnames'. If not available, it would need to be imported or defined.
        // For this task, I'll assume it's available or a placeholder for string concatenation.
        const cn = (...args: (string | undefined | null | boolean)[]) => args.filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'
