import { CheckCircle2Icon, ClipboardListIcon, CrownIcon, HourglassIcon, PizzaIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import CountBarChart from "@/components/dashboard/CountBarChart";
import { getVendorStats } from "@/lib/fetch";

export default async function VendorOverview() {
    const stats = await getVendorStats();

    // the five things the assignment asks for
    const cards = [
        { label: "Menu items", value: stats.totalMenuItems, icon: ClipboardListIcon },
        { label: "Active items", value: stats.activeMenuItems, icon: PizzaIcon },
        { label: "Pending orders", value: stats.pendingOrders, icon: HourglassIcon },
        { label: "Accepted orders", value: stats.acceptedOrders, icon: CheckCircle2Icon },
        { label: "Current plan", value: stats.subscriptionPlan === "premium" ? "Premium" : "Free", icon: CrownIcon },
    ];

    const ordersByStatus = [
        { label: "Pending", count: stats.pendingOrders },
        { label: "Accepted", count: stats.acceptedOrders },
        { label: "Rejected", count: stats.rejectedOrders },
        { label: "Cancelled", count: stats.cancelledOrders },
    ];

    const itemsByStatus = [
        { label: "Pending", count: stats.pendingMenuItems },
        { label: "Approved", count: stats.approvedMenuItems },
        { label: "Rejected", count: stats.rejectedMenuItems },
        { label: "Inactive", count: stats.inactiveMenuItems },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3
                lg:grid-cols-3 lg:gap-4">
                {cards.map((card) =>
                    <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} />
                )}
            </div>

            <div className="grid grid-cols-1 gap-4
                lg:grid-cols-2">
                <CountBarChart title="Orders by status" data={ordersByStatus} emptyText="No orders yet. They'll show here once customers order your items." />
                <CountBarChart title="Menu items by status" data={itemsByStatus} emptyText="No menu items yet. Add one and it goes to an admin for review." />
            </div>
        </div>
    )
}
