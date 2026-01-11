import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/5",
                className
            )}
            {...props}
        />
    )
}

export function SkeletonCard() {
    return (
        <div className="glass-card p-6 space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-end">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-6 w-12" />
            </div>
        </div>
    )
}
