"use client";
import { useState } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrderForm from "@/components/menu/OrderForm";
import { PublicMenuItem } from "@/lib/types";

// only a customer can order a live item; everyone else sees the button switched off and why
const getBlockedReason = (item: PublicMenuItem, role: string, userId: string) => {
    if (item.status !== "approved") return "Not available to order right now.";
    if (item.vendorId === userId) return "This is your item.";
    if (role === "vendor") return "Vendors can't order.";
    if (role === "admin") return "Admins can't place orders.";
    return "";
};

export default function OrderButton({ item, role, userId }: { item: PublicMenuItem, role: string, userId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const blockedReason = getBlockedReason(item, role, userId);

    return (
        <div className="flex flex-col gap-2">
            <Button size="lg" disabled={!!blockedReason} onClick={() => setIsOpen(true)} className="w-full
                sm:w-auto sm:self-start">
                <ShoppingBagIcon data-icon="inline-start" strokeWidth={2.5} />
                Order now
            </Button>
            {blockedReason && <p className="text-sm text-muted-foreground">{blockedReason}</p>}

            {/* max-h + overflow: the form scrolls inside the dialog on short screens */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="grid-cols-1 max-h-9/10 overflow-y-auto
                    sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Order {item.itemName}</DialogTitle>
                        <DialogDescription>{item.vendor.businessName ?? item.vendor.name} · {item.location}</DialogDescription>
                    </DialogHeader>
                    <OrderForm item={item} onPlaced={() => setIsOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
