import { InboxIcon, SearchXIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import OrderStatusTag from "@/components/shared/OrderStatusTag";
import CustomerOrderDialog from "@/components/vendor/CustomerOrderDialog";
import { getVendorOrders } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

// every order is fetched; ?status= only decides which ones are shown
export default async function CustomerOrdersList({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const { status } = await searchParams;
    const allOrders = await getVendorOrders();

    if (allOrders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <InboxIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No orders yet</p>
                <p className="text-muted-foreground">When a customer orders one of your items, it shows up here.</p>
            </div>
        )
    }

    // counted from every order, so the line above stays right whatever the filter shows
    const pendingCount = allOrders.filter((order) => order.status === "pending").length;
    const orders = typeof status === "string" && status ? allOrders.filter((order) => order.status === status) : allOrders;

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <SearchXIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No {status} orders</p>
                <p className="text-muted-foreground">Switch the status back to All to see every order.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground font-semibold">
                {allOrders.length} {allOrders.length === 1 ? "order" : "orders"} · {pendingCount} waiting for your answer
            </p>

            {/* mobile: one card per order */}
            <div className="flex flex-col gap-3
                md:hidden">
                {orders.map((order) =>
                    <div key={order._id} className="flex flex-col gap-3 bg-card border p-4 rounded-2xl">
                        <div className="flex gap-3">
                            {order.item ?
                                <MenuItemThumb src={order.item.images[0]} className="size-16" />
                                :
                                <div className="shrink-0 size-16 bg-placeholder rounded-xl" />
                            }
                            <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                                <b className="max-w-full truncate">{order.item?.itemName ?? "Item removed"}</b>
                                <span className="max-w-full text-sm text-muted-foreground truncate">{order.customer?.name ?? "Account deleted"}</span>
                                <span className="text-sm"><b>Delivery:</b> {formatDate(order.deliveryDate)}</span>
                                <OrderStatusTag status={order.status} />
                            </div>
                        </div>
                        <div className="flex items-center justify-end border-t pt-3">
                            <CustomerOrderDialog order={order} delivery={formatDate(order.deliveryDate)} ordered={formatDate(order.createdAt)} />
                        </div>
                    </div>
                )}
            </div>

            {/* tablet + desktop: table */}
            <div className="hidden bg-card border rounded-2xl overflow-hidden
                md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-5">Item</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="pr-5 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) =>
                            <TableRow key={order._id}>
                                <TableCell className="pl-5">
                                    <div className="flex items-center gap-3">
                                        {order.item ?
                                            <MenuItemThumb src={order.item.images[0]} className="size-11" />
                                            :
                                            <div className="shrink-0 size-11 bg-placeholder rounded-xl" />
                                        }
                                        <b>{order.item?.itemName ?? "Item removed"}</b>
                                    </div>
                                </TableCell>
                                <TableCell>{order.customer?.name ?? "Account deleted"}</TableCell>
                                <TableCell className="font-semibold">{formatDate(order.deliveryDate)}</TableCell>
                                <TableCell>
                                    <OrderStatusTag status={order.status} />
                                </TableCell>
                                <TableCell className="pr-5">
                                    <div className="flex justify-end">
                                        <CustomerOrderDialog order={order} delivery={formatDate(order.deliveryDate)} ordered={formatDate(order.createdAt)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
