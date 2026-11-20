import { CheckCircle2Icon, HourglassIcon, ShoppingBagIcon, XCircleIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import CountBarChart from "@/components/dashboard/CountBarChart";
import { getCustomerStats } from "@/lib/fetch";

export default async function CustomerOverview() {
    const stats = await getCustomerStats();

    // the four numbers the assignment asks for
    const cards = [
        { label: "Total orders", value: stats.totalOrders, icon: ShoppingBagIcon },
        { label: "Pending", value: stats.pendingOrders, icon: HourglassIcon },
        { label: "Accepted", value: stats.acceptedOrders, icon: CheckCircle2Icon },
        { label: "Rejected", value: stats.rejectedOrders, icon: XCircleIcon },
    ];

    const ordersByStatus = [
        { label: "Pending", count: stats.pendingOrders },
        { label: "Accepted", count: stats.acceptedOrders },
        { label: "Rejected", count: stats.rejectedOrders },
        { label: "Cancelled", count: stats.cancelledOrders },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3
                lg:grid-cols-4 lg:gap-4">
                {cards.map((card) =>
                    <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} />
                )}
            </div>

            <CountBarChart title="Orders by status" data={ordersByStatus} emptyText="No orders yet. Find a pizza you like and order it for the day you want." />
        </div>
    )
}
