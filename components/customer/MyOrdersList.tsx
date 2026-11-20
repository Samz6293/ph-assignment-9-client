import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import OrderStatusTag from "@/components/shared/OrderStatusTag";
import OrderDetailsDialog from "@/components/customer/OrderDetailsDialog";
import { getMyOrders } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

export default async function MyOrdersList() {
    const orders = await getMyOrders();

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <ShoppingBagIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No orders yet</p>
                <p className="text-muted-foreground">Find a pizza you like and order it for the day you want.</p>
                <Button render={<Link href="/menu" />} nativeButton={false}>Browse the menu</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground font-semibold">{orders.length} {orders.length === 1 ? "order" : "orders"}</p>

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
                                <span className="text-sm"><b>Delivery:</b> {formatDate(order.deliveryDate)}</span>
                                <OrderStatusTag status={order.status} />
                            </div>
                        </div>
                        <div className="flex items-center justify-end border-t pt-3">
                            <OrderDetailsDialog order={order} delivery={formatDate(order.deliveryDate)} ordered={formatDate(order.createdAt)} answered={order.statusUpdatedAt ? formatDate(order.statusUpdatedAt) : ""} />
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
                                <TableCell className="font-semibold">{formatDate(order.deliveryDate)}</TableCell>
                                <TableCell>
                                    <OrderStatusTag status={order.status} />
                                </TableCell>
                                <TableCell className="pr-5">
                                    <div className="flex justify-end">
                                        <OrderDetailsDialog order={order} delivery={formatDate(order.deliveryDate)} ordered={formatDate(order.createdAt)} answered={order.statusUpdatedAt ? formatDate(order.statusUpdatedAt) : ""} />
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
