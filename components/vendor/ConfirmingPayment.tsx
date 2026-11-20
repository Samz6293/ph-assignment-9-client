"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

// shown while the webhook hasn't switched Premium on yet; re-checks the page every 2 seconds
const checkEvery = 2000;
const maxChecks = 15;

export default function ConfirmingPayment() {
    const [checks, setChecks] = useState(0);
    const router = useRouter();
    const isGivingUp = checks >= maxChecks;

    useEffect(() => {
        if (isGivingUp) return;

        // refresh re-runs the server part of the page; once the plan is Premium it shows the success card instead
        const timer = setInterval(() => {
            router.refresh();
            setChecks((count) => count + 1);
        }, checkEvery);

        // stop the timer when this card leaves the page
        return () => clearInterval(timer);
    }, [isGivingUp, router]);

    if (isGivingUp) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <p className="text-lg font-bold">Stripe hasn’t confirmed your payment yet</p>
                <p className="max-w-110 text-muted-foreground">If you were charged, Premium switches on within a few minutes. Reload this page or check your Subscription page later.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
            <Spinner className="size-8 text-primary" />
            <p className="text-lg font-bold">Confirming payment…</p>
            <p className="max-w-110 text-muted-foreground">Waiting for Stripe to confirm. This usually takes a few seconds.</p>
        </div>
    )
}
