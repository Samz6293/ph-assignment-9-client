"use client";
import { useState } from "react";
import { CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { startCheckout } from "@/lib/vendor";

export default function UpgradeButton() {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        const isOpening = await startCheckout();
        // on success the browser is already leaving for Stripe, so the spinner stays until it does
        if (!isOpening) setLoading(false);
    };

    return (
        <Button size="lg" disabled={loading} onClick={handleUpgrade} className="w-full">
            {loading ?
                <><Spinner /> Opening checkout…</>
                :
                <><CrownIcon data-icon="inline-start" strokeWidth={2.5} /> Upgrade to Premium</>
            }
        </Button>
    )
}
