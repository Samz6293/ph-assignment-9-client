import { headers } from "next/headers";
import { connection } from "next/server";
import FreePlanBanner from "@/components/vendor/FreePlanBanner";
import AddMenuItemForm from "@/components/vendor/AddMenuItemForm";
import { auth } from "@/lib/auth";
import { getMyMenuItems } from "@/lib/fetch";
import { freePlanLimit } from "@/lib/menu";

// works out whether the vendor is at the Free plan limit, then shows the banner and/or the form
export default async function AddMenuItemSection() {
    // Better Auth reads the clock to check the session; wait for a real request first
    await connection();
    const [session, items] = await Promise.all([
        auth.api.getSession({ headers: await headers() }),
        getMyMenuItems(),
    ]);

    const activeCount = items.filter((item) => item.status === "pending" || item.status === "approved").length;
    const isAtLimit = session?.user.subscriptionPlan !== "premium" && activeCount >= freePlanLimit;

    return (
        <div className="flex flex-col gap-4">
            {isAtLimit && <FreePlanBanner />}
            <AddMenuItemForm isAtLimit={isAtLimit} />
        </div>
    )
}
