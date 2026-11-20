import { Suspense } from "react";
import OrderStatusFilter from "@/components/vendor/OrderStatusFilter";
import CustomerOrdersList from "@/components/vendor/CustomerOrdersList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function CustomerOrdersPage({ searchParams }: PageProps<"/dashboard/vendor/orders">) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Customer Orders
                </h1>
                <p className="text-muted-foreground">Open an order to see the details, then accept or reject it. Each order can be answered once.</p>
            </div>

            {/* useSearchParams needs a Suspense boundary */}
            <Suspense>
                <OrderStatusFilter />
            </Suspense>

            {/* the user list's skeleton has the same row shape, so it's reused here */}
            <Suspense fallback={<UsersListSkeleton />}>
                <CustomerOrdersList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}
