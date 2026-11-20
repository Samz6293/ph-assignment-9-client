import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmingPayment from "@/components/vendor/ConfirmingPayment";
import { getMe } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

// reads the plan from the database; Premium is switched on only by the Stripe webhook, never by this page
export default async function PaymentSuccess() {
    const user = await getMe();

    if (user.subscriptionPlan !== "premium") return <ConfirmingPayment />;

    return (
        <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
            <span className="flex items-center justify-center size-14 bg-highlight text-premium rounded-full">
                <CrownIcon className="size-6" strokeWidth={2.5} />
            </span>
            <p className="text-lg font-bold">You’re on Premium</p>
            <p className="max-w-110 text-muted-foreground">
                Payment confirmed. You can now add unlimited menu items, and your items carry the Premium badge.
                {user.subscriptionExpiresAt && ` Your plan renews on ${formatDate(user.subscriptionExpiresAt)}.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Button render={<Link href="/dashboard/vendor/add-item" />} nativeButton={false}>Add a menu item</Button>
                <Button variant="outline" render={<Link href="/dashboard/vendor/subscription" />} nativeButton={false}>View your plan</Button>
            </div>
        </div>
    )
}
