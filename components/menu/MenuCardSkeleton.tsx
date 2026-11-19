import { Skeleton } from "@/components/ui/skeleton";

// placeholder with MenuCard's shape: photo, three text lines, button
export default function MenuCardSkeleton() {
    return (
        <div className="flex flex-col bg-card border rounded-2xl overflow-hidden">
            <Skeleton className="aspect-4/3 rounded-none" />
            <div className="flex flex-col gap-3 p-4.5">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-16 h-7" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-10 rounded-full mt-2" />
            </div>
        </div>
    )
}
