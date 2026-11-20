import { CheckIcon, CrownIcon, StoreIcon } from "lucide-react";
import UpgradeButton from "@/components/vendor/UpgradeButton";
import CancelSubscriptionButton from "@/components/vendor/CancelSubscriptionButton";
import ResumeSubscriptionButton from "@/components/vendor/ResumeSubscriptionButton";
import { getMe } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

// what each plan gives, from the assignment; the price must match the Stripe price ($12.99 / month)
const plans = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        icon: StoreIcon,
        features: ["Up to 3 active menu items", "Vendor dashboard", "Order management"],
    },
    {
        id: "premium",
        name: "Premium",
        price: "$12.99",
        icon: CrownIcon,
        features: ["Unlimited active menu items", "Premium badge on your items", "Featured on the home page", "Everything in Free"],
    },
];

export default async function PlanCards() {
    const user = await getMe();
    const currentPlan = user.subscriptionPlan === "premium" ? "premium" : "free";
    const endsOn = user.subscriptionExpiresAt ? formatDate(user.subscriptionExpiresAt) : "the end of this month";

    return (
        <div className="grid grid-cols-1 gap-4
            md:grid-cols-2">
            {plans.map((plan) =>
                // Premium gets the Crust accent; flex-col + mt-auto pins the bottom line of both cards level
                <div key={plan.id} className={`flex flex-col gap-5 bg-card p-6 rounded-2xl
                    ${plan.id === "premium" ? "border-2 border-highlight" : "border"}`}>
                    <div className="flex items-start justify-between gap-3">
                        <span className={`flex items-center justify-center size-12 rounded-full
                            ${plan.id === "premium" ? "bg-highlight text-premium" : "bg-secondary text-foreground"}`}>
                            <plan.icon className="size-6" strokeWidth={2.5} />
                        </span>
                        {currentPlan === plan.id &&
                            <span className="bg-success-soft text-success-soft-foreground text-xs font-bold px-2.5 py-1 rounded-full">Current plan</span>
                        }
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2>{plan.name}</h2>
                        <p>
                            <span className="font-heading text-4xl">{plan.price}</span>
                            <span className="text-muted-foreground"> / month</span>
                        </p>
                    </div>

                    <ul className="flex flex-col gap-2.5">
                        {plan.features.map((feature) =>
                            <li key={feature} className="flex items-center gap-2.5">
                                <CheckIcon className="size-4.5 shrink-0 text-success" strokeWidth={3} />
                                {feature}
                            </li>
                        )}
                    </ul>

                    {/* bottom line: the upgrade button, or how long Premium lasts */}
                    <div className="mt-auto pt-2">
                        {plan.id === "premium" && currentPlan === "free" && <UpgradeButton />}
                        {/* Premium: renews → offer Cancel; cancelled → say when it ends and offer Keep Premium */}
                        {plan.id === "premium" && currentPlan === "premium" &&
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-muted-foreground font-semibold">
                                    {user.cancelAtPeriodEnd ? `Premium ends on ${endsOn} and won’t renew.` : `Renews on ${endsOn}.`}
                                </p>
                                {user.cancelAtPeriodEnd ? <ResumeSubscriptionButton /> : <CancelSubscriptionButton endsOn={endsOn} />}
                            </div>
                        }
                        {plan.id === "free" && currentPlan === "free" &&
                            <p className="text-sm text-muted-foreground font-semibold">You can have 3 active items at a time.</p>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
