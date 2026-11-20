import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentSuccess from "@/components/vendor/PaymentSuccess";

// Stripe sends the vendor here after paying (success_url in the server's /create-checkout-session)
export default function PaymentSuccessPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl leading-tight
                md:text-4xl">
                Payment
            </h1>

            <Suspense fallback={<Skeleton className="h-72 rounded-2xl" />}>
                <PaymentSuccess />
            </Suspense>
        </div>
    )
}
