import { TableSkeleton } from "@/components/ui/Skeleton";

export default function RHLoading() {
    return (
        <div className="p-1 space-y-8 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="border-b border-slate-200 dark:border-zinc-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-100 dark:bg-zinc-800 rounded-lg skeleton" />
                    <div className="h-4 w-64 bg-slate-50 dark:bg-zinc-900 rounded-md skeleton" />
                </div>
                <div className="flex gap-2">
                    <div className="h-10 w-24 bg-slate-100 dark:bg-zinc-800 rounded-xl skeleton" />
                    <div className="h-10 w-24 bg-slate-100 dark:bg-zinc-800 rounded-xl skeleton" />
                    <div className="h-10 w-40 bg-slate-100 dark:bg-zinc-800 rounded-xl skeleton" />
                </div>
            </div>

            {/* Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl skeleton" />
                ))}
            </div>

            {/* Toolbar Skeleton */}
            <div className="h-20 bg-white/50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl skeleton" />

            {/* Table Skeleton */}
            <div className="border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                <TableSkeleton rows={8} columns={6} />
            </div>
        </div>
    );
}
