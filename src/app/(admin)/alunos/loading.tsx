import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>

            <Skeleton className="h-12 w-full rounded-2xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="p-6 glass-card space-y-4">
                        <div className="flex justify-between items-start">
                            <Skeleton className="w-12 h-12 rounded-2xl" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                            <Skeleton className="h-9 w-20 rounded-lg" />
                            <Skeleton className="h-9 w-20 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
