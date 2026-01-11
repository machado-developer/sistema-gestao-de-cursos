import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'

export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
