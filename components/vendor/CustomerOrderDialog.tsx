"use client";
import { EllipsisIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import OrderStatusTag from "@/components/shared/OrderStatusTag";
import AnswerOrderButtons from "@/components/vendor/AnswerOrderButtons";
import { VendorOrder } from "@/lib/types";

// what each status means for the vendor
const statusNote = (order: VendorOrder) =>
    order.status === "pending" ? "Waiting for your answer."
    : order.status === "accepted" ? "You accepted this order."
    : order.status === "rejected" ? "You rejected this order."
    : "The customer cancelled this order.";

// dates come in already formatted from the server list
export default function CustomerOrderDialog({ order, delivery, ordered }: { order: VendorOrder, delivery: string, ordered: string }) {
    const details = [
        { label: "Customer", value: order.customer?.name ?? "Account deleted" },
        { label: "Customer email", value: order.customer?.email },
        { label: "Ordered on", value: ordered },
        { label: "Delivery date", value: delivery },
        { label: "Delivery address", value: order.deliveryAddress },
        { label: "Customer's message", value: order.message },
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
                        <DialogDescription>{order.item ? `৳${order.item.price}` : "You took this item off PizzaHub."}</DialogDescription>
                        <OrderStatusTag status={order.status} />
                    </div>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">{statusNote(order)}</p>

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
                        <AnswerOrderButtons order={order} />
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}
