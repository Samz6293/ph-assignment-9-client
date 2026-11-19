import { headers } from "next/headers";
import { connection } from "next/server";
import { CrownIcon, MapPinIcon, StoreIcon } from "lucide-react";
import ItemGallery from "@/components/menu/ItemGallery";
import ItemNotFound from "@/components/menu/ItemNotFound";
import OrderButton from "@/components/menu/OrderButton";
import { auth } from "@/lib/auth";
import { getMenuItem } from "@/lib/fetch";

export default async function ItemDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Better Auth reads the clock to check the session; wait for a real request first
    await connection();
    const [item, session] = await Promise.all([
        getMenuItem(id),
        auth.api.getSession({ headers: await headers() }),
    ]);

    if (!item) return <ItemNotFound />;

    const isPremium = item.vendor.subscriptionPlan === "premium";

    return (
        <div className="grid grid-cols-1 gap-8
            lg:grid-cols-2 lg:gap-12">
            <ItemGallery images={item.images} alt={item.itemName} />

            <div className="flex flex-col gap-5">
                {/* what it is */}
                <div className="flex flex-col gap-3">
                    <span className="text-overline text-success-soft-foreground font-bold tracking-widest uppercase">{item.category}</span>
                    <h2>{item.itemName}</h2>
                    <span className="font-heading text-4xl text-primary">৳{item.price}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPinIcon className="size-4.5 shrink-0" strokeWidth={2.5} />
                        {item.location}
                    </span>
                </div>

                {/* who makes it */}
                <div className="flex items-center gap-3 bg-card border p-4 rounded-2xl">
                    <span className="flex items-center justify-center size-11 shrink-0 bg-primary-soft text-primary-soft-foreground rounded-full">
                        <StoreIcon className="size-5" strokeWidth={2.5} />
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                        <b className="truncate">{item.vendor.businessName ?? item.vendor.name}</b>
                        <span className="text-sm text-muted-foreground truncate">{item.location}</span>
                    </div>
                    {isPremium &&
                        <span className="flex items-center gap-1 shrink-0 bg-premium text-highlight text-xs font-bold px-2.5 py-1 rounded-full">
                            <CrownIcon className="size-3.5" strokeWidth={2.5} />
                            Premium
                        </span>
                    }
                </div>

                <p className="leading-relaxed whitespace-pre-line">{item.description}</p>

                {/* the proxy only lets signed-in users here, so session is always set */}
                {session && <OrderButton item={item} role={session.user.role} userId={session.user.id} />}
            </div>
        </div>
    )
}
