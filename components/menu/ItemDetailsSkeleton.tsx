import { Skeleton } from "@/components/ui/skeleton";

// same two columns as Item Details: photo left, text right
export default function ItemDetailsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8
            lg:grid-cols-2 lg:gap-12">
            <Skeleton className="aspect-4/3 rounded-3xl" />
            <div className="flex flex-col gap-4">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-3/4 h-12" />
                <Skeleton className="w-24 h-10" />
                <Skeleton className="w-48 h-5" />
                <Skeleton className="h-19 rounded-2xl" />
                <Skeleton className="h-24" />
                <Skeleton className="w-40 h-12 rounded-full" />
            </div>
        </div>
    )
}
