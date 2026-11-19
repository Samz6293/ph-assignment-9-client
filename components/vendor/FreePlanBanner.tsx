import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// shown on Add Menu Item when a Free vendor already has 3 active items
export default function FreePlanBanner() {
    return (
        <div className="flex flex-col gap-3 bg-warning text-warning-foreground p-4 rounded-2xl
            md:flex-row md:items-center">
            <CrownIcon className="size-6 shrink-0" strokeWidth={2.5} />
            <p className="flex-1 font-semibold">Free plan allows 3 active items. Upgrade to Premium for unlimited.</p>
            <Button render={<Link href="/dashboard/vendor/subscription" />} nativeButton={false}>Upgrade</Button>
        </div>
    )
}
