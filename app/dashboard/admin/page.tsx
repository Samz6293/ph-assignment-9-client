import { Suspense } from "react";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminOverviewSkeleton from "@/components/admin/AdminOverviewSkeleton";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Overview
                </h1>
                <p className="text-muted-foreground">How PizzaHub is doing today: people, menu items and payments.</p>
            </div>

            <Suspense fallback={<AdminOverviewSkeleton />}>
                <AdminOverview />
            </Suspense>
        </div>
    )
}
