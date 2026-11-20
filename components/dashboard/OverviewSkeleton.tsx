import { Skeleton } from "@/components/ui/skeleton";

// placeholder with an overview's shape: a grid of stat cards, then the charts
// cards / charts: how many of each the real overview shows
export default function OverviewSkeleton({ cards, charts }: { cards: number, charts: number }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3
                lg:grid-cols-3 lg:gap-4">
                {Array.from({ length: cards }, (_, index) =>
                    <Skeleton key={index} className="h-28 rounded-2xl" />
                )}
            </div>
            <div className="grid grid-cols-1 gap-4
                lg:grid-cols-2">
                {Array.from({ length: charts }, (_, index) =>
                    <Skeleton key={index} className="h-80 rounded-2xl" />
                )}
            </div>
        </div>
    )
}
