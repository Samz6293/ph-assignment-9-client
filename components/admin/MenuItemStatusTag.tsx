import { MenuItemStatus } from "@/lib/types";

// colours from design.md's status tags
const styles: Record<MenuItemStatus, string> = {
    pending: "bg-warning text-warning-foreground",
    approved: "bg-success-soft text-success-soft-foreground",
    rejected: "bg-primary-soft text-primary-soft-foreground",
    inactive: "bg-muted text-muted-foreground",
};

export default function MenuItemStatusTag({ status }: { status: MenuItemStatus }) {
    return (
        <span className={`shrink-0 text-xs font-bold capitalize px-2.5 py-1 rounded-full
            ${styles[status]}`}>
            {status}
        </span>
    )
}
