import { Suspense } from "react";
import VendorOverview from "@/components/vendor/VendorOverview";
import OverviewSkeleton from "@/components/dashboard/OverviewSkeleton";

export default function VendorDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Overview
                </h1>
                <p className="text-muted-foreground">How your shop is doing: your menu, your orders and your plan.</p>
            </div>

            <Suspense fallback={<OverviewSkeleton cards={5} charts={2} />}>
                <VendorOverview />
            </Suspense>
        </div>
    )
}
