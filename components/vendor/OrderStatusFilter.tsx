"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const statuses = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Cancelled", value: "cancelled" },
];

// status pills kept in the URL (?status=pending), the same pattern as MenuItemFilters
export default function OrderStatusFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") ?? "";

    const handleStatus = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set("status", value);
        else params.delete("status");
        router.replace(`${pathname}?${params}`);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {statuses.map((status) =>
                <Button key={status.label} size="sm" variant={currentStatus === status.value ? "default" : "outline"}
                    onClick={() => handleStatus(status.value)}>
                    {status.label}
                </Button>
            )}
        </div>
    )
}
