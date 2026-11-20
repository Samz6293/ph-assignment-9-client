import { OrderStatus } from "@/lib/types";

// colours from design.md's status tags, the same family as MenuItemStatusTag
const styles: Record<OrderStatus, string> = {
    pending: "bg-warning text-warning-foreground",
    accepted: "bg-success-soft text-success-soft-foreground",
    rejected: "bg-primary-soft text-primary-soft-foreground",
    cancelled: "bg-muted text-muted-foreground",
};

export default function OrderStatusTag({ status }: { status: OrderStatus }) {
    return (
        <span className={`shrink-0 text-xs font-bold capitalize px-2.5 py-1 rounded-full
            ${styles[status]}`}>
            {status}
        </span>
    )
}
