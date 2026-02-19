import React from 'react'
import { Info, AlertCircle, CheckCircle2, XCircle, Bell, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ContextualCardVariant = 'info' | 'warning' | 'error' | 'success' | 'notification'

interface ContextualCardProps {
    title?: string
    message: string | React.ReactNode
    variant?: ContextualCardVariant
    className?: string
    icon?: LucideIcon
    action?: {
        label: string
        onClick: () => void
    }
}

export function ContextualCard({
    title,
    message,
    variant = 'info',
    className,
    icon: CustomIcon,
    action
}: ContextualCardProps) {
    const variants = {
        info: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            icon: <Info size={20} />
        },
        warning: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            text: 'text-orange-400',
            icon: <AlertCircle size={20} />
        },
        error: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            text: 'text-red-400',
            icon: <XCircle size={20} />
        },
        success: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            icon: <CheckCircle2 size={20} />
        },
        notification: {
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            text: 'text-purple-400',
            icon: <Bell size={20} />
        }
    }

    const current = variants[variant]

    return (
        <div className={cn(
            "relative overflow-hidden flex flex-col sm:flex-row gap-4 p-5 border rounded-2xl transition-all duration-300",
            current.bg,
            current.border,
            className
        )}>
            {/* Subtle background glow */}
            <div className={cn(
                "absolute -top-10 -left-10 w-32 h-32 blur-[64px] opacity-20 pointer-events-none",
                current.bg
            )} />

            <div className={cn("flex-shrink-0 mt-1", current.text)}>
                {CustomIcon ? <CustomIcon size={20} /> : current.icon}
            </div>

            <div className="flex-1 space-y-1">
                {title && <h4 className={cn("font-bold text-base", current.text)}>{title}</h4>}
                <div className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {message}
                </div>
            </div>

            {action && (
                <div className="flex-shrink-0 mt-2 sm:mt-0 sm:self-center">
                    <button
                        onClick={action.onClick}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98]",
                            "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                        )}
                    >
                        {action.label}
                    </button>
                </div>
            )}
        </div>
    )
}
