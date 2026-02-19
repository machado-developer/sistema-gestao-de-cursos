import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-xl bg-white/5 relative overflow-hidden",
                "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/[0.03] after:to-transparent",
                className
            )}
            {...props}
        />
    )
}

export function SkeletonCard() {
    return (
        <div className="bg-[var(--surface-primary)] p-6 space-y-4 border border-[var(--border-color)] rounded-2xl">
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-end">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-6 w-12" />
            </div>
        </div>
    )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number, columns?: number }) {
    return (
        <div className="w-full space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden bg-[var(--surface-primary)]">
                <div className="p-4 border-b border-[var(--border-color)] flex gap-4">
                    {Array.from({ length: columns }).map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1" />
                    ))}
                </div>
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="p-4 border-b border-[var(--border-color)] last:border-0 flex gap-4">
                        {Array.from({ length: columns }).map((_, j) => (
                            <Skeleton key={j} className="h-8 flex-1 rounded-lg" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
