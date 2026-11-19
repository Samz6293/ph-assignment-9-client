import Image from "next/image";
import Link from "next/link";
import { CrownIcon, MapPinIcon, StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicMenuItem } from "@/lib/types";

// one item on Browse Menu / Featured: the same height as its neighbours, button pinned to the bottom
export default function MenuCard({ item }: { item: PublicMenuItem }) {
    const isPremium = item.vendor.subscriptionPlan === "premium";

    return (
        <article className="flex flex-col h-full bg-card border rounded-2xl overflow-hidden">
            {/* photo: fixed 4:3 so every card lines up; tinted while it loads */}
            <div className="relative aspect-4/3 bg-placeholder">
                <Image src={item.images[0]} alt={item.itemName} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                {isPremium &&
                    <span className="absolute top-3 left-3 flex items-center gap-1 bg-premium text-highlight text-xs font-bold px-2.5 py-1 rounded-full">
                        <CrownIcon className="size-3.5" strokeWidth={2.5} />
                        Premium
                    </span>
                }
            </div>

            {/* flex-1 + mt-auto on the button: short cards stretch and the buttons line up */}
            <div className="flex flex-col flex-1 gap-2 p-4.5">
                <span className="text-sm text-muted-foreground font-semibold">{item.category}</span>
                <h3 className="text-xl leading-snug">{item.itemName}</h3>
                <span className="font-heading text-2xl text-primary">৳{item.price}</span>

                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1.5">
                        <MapPinIcon className="size-4 shrink-0" strokeWidth={2.5} />
                        {item.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <StoreIcon className="size-4 shrink-0" strokeWidth={2.5} />
                        {item.vendor.businessName ?? item.vendor.name}
                    </span>
                </div>

                <Button render={<Link href={`/menu/${item._id}`} />} nativeButton={false} className="w-full mt-auto">
                    View Details
                </Button>
            </div>
        </article>
    )
}
