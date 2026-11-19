import { Skeleton } from "@/components/ui/skeleton";

// placeholder rows while the user list loads
export default function UsersListSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="w-20 h-5" />
            {[1, 2, 3, 4, 5].map((row) =>
                <Skeleton key={row} className="h-19 rounded-2xl
                    md:h-16" />
            )}
        </div>
    )
}
