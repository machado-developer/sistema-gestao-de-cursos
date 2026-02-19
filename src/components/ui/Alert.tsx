import { Info, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlertProps {
    title?: string
    message: string
    variant?: 'info' | 'warning' | 'error' | 'success'
    className?: string
}

export function Alert({ title, message, variant = 'info', className }: AlertProps) {
    const variants = {
        info: {
            bg: 'bg-blue-600/5',
            border: 'border-blue-600/10',
            text: 'text-blue-600',
            icon: <Info size={18} />
        },
        warning: {
            bg: 'bg-amber-600/5',
            border: 'border-amber-600/10',
            text: 'text-amber-600',
            icon: <AlertCircle size={18} />
        },
        error: {
            bg: 'bg-red-600/5',
            border: 'border-red-600/10',
            text: 'text-red-600',
            icon: <XCircle size={18} />
        },
        success: {
            bg: 'bg-emerald-600/5',
            border: 'border-emerald-600/10',
            text: 'text-emerald-600',
            icon: <CheckCircle2 size={18} />
        }
    }

    const current = variants[variant]

    return (
        <div className={cn(
            "flex gap-3 p-4 border rounded-xl transition-all animate-in fade-in slide-in-from-top-2 duration-300",
            current.bg,
            current.border,
            className
        )}>
            <div className={cn("mt-0.5 shrink-0", current.text)}>
                {current.icon}
            </div>
            <div className="flex-1">
                {title && <h4 className={cn("font-bold text-sm mb-0.5", current.text)}>{title}</h4>}
                <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">
                    {message}
                </p>
            </div>
        </div>
    )
}
