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
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            icon: <Info size={18} />
        },
        warning: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            text: 'text-orange-400',
            icon: <AlertCircle size={18} />
        },
        error: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            text: 'text-red-400',
            icon: <XCircle size={18} />
        },
        success: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            icon: <CheckCircle2 size={18} />
        }
    }

    const current = variants[variant]

    return (
        <div className={cn(
            "flex gap-4 p-4 border rounded-xl animate-in fade-in slide-in-from-top-2 duration-300",
            current.bg,
            current.border,
            className
        )}>
            <div className={cn("mt-0.5", current.text)}>
                {current.icon}
            </div>
            <div className="flex-1">
                {title && <h4 className={cn("font-bold text-sm mb-1", current.text)}>{title}</h4>}
                <p className="text-sm text-zinc-300 leading-relaxed">{message}</p>
            </div>
        </div>
    )
}
