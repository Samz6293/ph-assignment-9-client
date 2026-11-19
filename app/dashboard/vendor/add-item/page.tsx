import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddMenuItemSection from "@/components/vendor/AddMenuItemSection";

export default function AddMenuItemPage() {
    return (
        <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Add Menu Item
                </h1>
                <p className="text-muted-foreground">New items go to an admin for review, then appear on the menu.</p>
            </div>

            <Suspense fallback={<Skeleton className="h-160 rounded-2xl" />}>
                <AddMenuItemSection />
            </Suspense>
        </div>
    )
}
