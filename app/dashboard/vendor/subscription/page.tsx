import { Suspense } from "react";
import PlanCards from "@/components/vendor/PlanCards";
import OverviewSkeleton from "@/components/dashboard/OverviewSkeleton";

export default function SubscriptionPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Subscription
                </h1>
                <p className="text-muted-foreground">Go Premium for unlimited menu items and a featured spot on the home page. Payments are handled by Stripe.</p>
            </div>

            {/* two tall placeholders, the shape of the plan cards */}
            <Suspense fallback={<OverviewSkeleton cards={0} charts={2} />}>
                <PlanCards />
            </Suspense>
        </div>
    )
}
