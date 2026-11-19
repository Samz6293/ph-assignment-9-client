"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { setItemAvailability } from "@/lib/vendor";
import { MyMenuItem } from "@/lib/types";

// on = approved and on the menu, off = switched off (inactive); pending and rejected items have nothing to switch yet
export default function AvailabilitySwitch({ item }: { item: MyMenuItem }) {
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    if (item.status === "pending" || item.status === "rejected") {
        return <span className="text-xs text-muted-foreground">After approval</span>;
    }

    const handleChange = async (isAvailable: boolean) => {
        setSaving(true);
        const isDone = await setItemAvailability(item, isAvailable);
        setSaving(false);
        if (isDone) router.refresh();
    };

    return (
        <label className="flex items-center gap-2 text-sm font-semibold">
            <Switch checked={item.status === "approved"} onCheckedChange={handleChange} disabled={saving} />
            {item.status === "approved" ? "On menu" : "Off"}
        </label>
    )
}
