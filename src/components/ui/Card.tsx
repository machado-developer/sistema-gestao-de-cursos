import { HTMLAttributes, forwardRef } from 'react'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className = '', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`glass-card p-6 ${className}`}
                {...props}
            />
        )
    }
)

Card.displayName = 'Card'
