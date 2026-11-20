import Link from "next/link";
import { CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Stripe sends the vendor here when they leave the checkout page without paying (cancel_url on the server)
export default function PaymentCancelPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl leading-tight
                md:text-4xl">
                Payment
            </h1>

            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-muted text-muted-foreground rounded-full">
                    <CircleXIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">Payment cancelled</p>
                <p className="max-w-110 text-muted-foreground">Nothing was charged. You’re still on the Free plan and can upgrade whenever you like.</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <Button render={<Link href="/dashboard/vendor/subscription" />} nativeButton={false}>Back to Subscription</Button>
                    <Button variant="outline" render={<Link href="/dashboard/vendor" />} nativeButton={false}>Go to Overview</Button>
                </div>
            </div>
        </div>
    )
}
