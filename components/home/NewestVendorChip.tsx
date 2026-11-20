import { getLatestVendor } from "@/lib/fetch";

// floating chip on the hero art: the newest pizzeria with a live item; nothing when there isn't one yet
export default async function NewestVendorChip() {
    const vendor = await getLatestVendor();
    if (!vendor) return null;

    return (
        <div className="absolute bottom-1/12 left-0 flex items-center gap-2.5 bg-card shadow-float px-4.5 py-2.75 rounded-full text-sm whitespace-nowrap
            md:-left-1/8 xl:-left-1/16">
            <span className="size-2.5 bg-success rounded-full" />
            <b>{vendor.businessName}</b>
            <span className="text-muted-foreground">{vendor.location}</span>
        </div>
    )
}
