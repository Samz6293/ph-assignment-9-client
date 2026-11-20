"use client";
import { EllipsisIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import OrderStatusTag from "@/components/shared/OrderStatusTag";
import CancelOrderButton from "@/components/customer/CancelOrderButton";
import OrderTimeline from "@/components/customer/OrderTimeline";
import { MyOrder } from "@/lib/types";

// dates come in already formatted from the server list
export default function OrderDetailsDialog({ order, delivery, ordered, answered }: { order: MyOrder, delivery: string, ordered: string, answered: string }) {
    const shopName = order.vendor?.businessName ?? order.vendor?.name ?? "The shop";
    const details = [
        { label: "Shop", value: shopName },
        { label: "Ordered on", value: ordered },
        { label: "Delivery date", value: delivery },
        { label: "Delivery address", value: order.deliveryAddress },
        { label: "Your message", value: order.message },
    ];

    return (
        <Dialog>
            <DialogTrigger render={<Button size="icon" variant="outline" aria-label={`Details for ${order.item?.itemName ?? "this order"}`} />}>
                <EllipsisIcon strokeWidth={2.5} />
            </DialogTrigger>

            {/* grid-cols-1: the single column may shrink, so a long address can't push it off screen */}
            <DialogContent className="grid-cols-1">
                {/* what: photo, name and price, status underneath; pr-8 keeps the name clear of the close button */}
                <DialogHeader className="flex-row items-center gap-3 pr-8">
                    {order.item ?
                        <MenuItemThumb src={order.item.images[0]} className="size-14" />
                        :
                        <div className="shrink-0 size-14 bg-placeholder rounded-xl" />
                    }
                    <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                        <DialogTitle className="max-w-full truncate">{order.item?.itemName ?? "Item removed"}</DialogTitle>
                        <DialogDescription>{order.item ? `৳${order.item.price}` : "The shop took this item off PizzaHub."}</DialogDescription>
                        <OrderStatusTag status={order.status} />
                    </div>
                </DialogHeader>

                {/* where the order is: placed → the shop's answer → delivery day */}
                <OrderTimeline order={order} shopName={shopName} ordered={ordered} answered={answered} delivery={delivery} />

                {/* details: label, value on the line below; the message only when there is one */}
                <dl className="flex flex-col gap-3 bg-card border text-sm p-4 rounded-2xl">
                    {details.filter((detail) => detail.value).map((detail) =>
                        <div key={detail.label} className="flex flex-col gap-0.5">
                            <dt className="text-muted-foreground">{detail.label}</dt>
                            <dd className="font-semibold wrap-break-word whitespace-pre-line">{detail.value}</dd>
                        </div>
                    )}
                </dl>

                {order.status === "pending" &&
                    <DialogFooter>
                        <CancelOrderButton order={order} delivery={delivery} />
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}
