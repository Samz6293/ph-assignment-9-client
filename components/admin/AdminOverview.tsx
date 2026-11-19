import { ClipboardListIcon, HourglassIcon, ReceiptIcon, ShoppingBagIcon, StoreIcon, UsersIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import CountBarChart from "@/components/dashboard/CountBarChart";
import { getAdminStats } from "@/lib/fetch";

export default async function AdminOverview() {
    const stats = await getAdminStats();

    // the six numbers the assignment asks for
    const cards = [
        { label: "Total users", value: stats.totalUsers, icon: UsersIcon },
        { label: "Customers", value: stats.customers, icon: ShoppingBagIcon },
        { label: "Vendors", value: stats.vendors, icon: StoreIcon },
        { label: "Menu items", value: stats.totalMenuItems, icon: ClipboardListIcon },
        { label: "Pending items", value: stats.pendingMenuItems, icon: HourglassIcon },
        { label: "Transactions", value: stats.totalTransactions, icon: ReceiptIcon },
    ];

    const usersByRole = [
        { label: "Customers", count: stats.customers },
        { label: "Vendors", count: stats.vendors },
        { label: "Admins", count: stats.admins },
    ];

    const itemsByStatus = [
        { label: "Pending", count: stats.pendingMenuItems },
        { label: "Approved", count: stats.approvedMenuItems },
        { label: "Rejected", count: stats.rejectedMenuItems },
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
                <CountBarChart title="Users by role" data={usersByRole} emptyText="No users yet." />
                <CountBarChart title="Menu items by status" data={itemsByStatus} emptyText="No menu items yet. They'll show here once vendors add some." />
            </div>
        </div>
    )
}
