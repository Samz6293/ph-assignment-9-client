import { Suspense } from "react";
import CustomerOverview from "@/components/customer/CustomerOverview";
import OverviewSkeleton from "@/components/dashboard/OverviewSkeleton";

export default function CustomerDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Overview
                </h1>
                <p className="text-muted-foreground">Your orders at a glance. Open My Orders for the details.</p>
            </div>

            <Suspense fallback={<OverviewSkeleton cards={4} charts={1} />}>
                <CustomerOverview />
            </Suspense>
        </div>
    )
}
