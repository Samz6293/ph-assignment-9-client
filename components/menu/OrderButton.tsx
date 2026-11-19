import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    const blockedReason = getBlockedReason(item, role, userId);

    return (
        <div className="flex flex-col gap-2">
            {/* TODO: open the order form (delivery date, address, message) once orders exist */}
            <Button size="lg" disabled={!!blockedReason} className="w-full
                sm:w-auto sm:self-start">
                <ShoppingBagIcon data-icon="inline-start" strokeWidth={2.5} />
                Order now
            </Button>
            {blockedReason && <p className="text-sm text-muted-foreground">{blockedReason}</p>}
        </div>
    )
}
