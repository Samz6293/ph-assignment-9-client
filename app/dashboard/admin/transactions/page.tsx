import { Suspense } from "react";
import TransactionsList from "@/components/admin/TransactionsList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function TransactionsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Transactions
                </h1>
                <p className="text-muted-foreground">Every Premium payment, confirmed by Stripe. Payments can’t be changed here.</p>
            </div>

            {/* the user list's skeleton has the same row shape, so it's reused here */}
            <Suspense fallback={<UsersListSkeleton />}>
                <TransactionsList />
            </Suspense>
        </div>
    )
}
