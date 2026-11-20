import { Suspense } from "react";
import MyOrdersList from "@/components/customer/MyOrdersList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function MyOrdersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    My Orders
                </h1>
                <p className="text-muted-foreground">Follow each order from Pending to Accepted. You can cancel while it’s still pending.</p>
            </div>

            {/* the user list's skeleton has the same row shape, so it's reused here */}
            <Suspense fallback={<UsersListSkeleton />}>
                <MyOrdersList />
            </Suspense>
        </div>
    )
}
