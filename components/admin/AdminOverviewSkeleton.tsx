import { Skeleton } from "@/components/ui/skeleton";

// same shape as the overview: six stat cards, then two charts
export default function AdminOverviewSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3
                lg:grid-cols-3 lg:gap-4">
                {[1, 2, 3, 4, 5, 6].map((card) =>
                    <Skeleton key={card} className="h-28 rounded-2xl" />
                )}
            </div>
            <div className="grid grid-cols-1 gap-4
                lg:grid-cols-2">
                <Skeleton className="h-80 rounded-2xl" />
                <Skeleton className="h-80 rounded-2xl" />
            </div>
        </div>
    )
}
