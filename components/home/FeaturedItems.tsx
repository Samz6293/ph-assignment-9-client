import { UtensilsIcon } from "lucide-react";
import MenuCard from "@/components/menu/MenuCard";
import { getMenuItems } from "@/lib/fetch";

// the six cards: Premium vendors' items first, then the newest (sorted on the server)
export default async function FeaturedItems() {
    const items = await getMenuItems({ sort: "featured", limit: 6 });

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-16 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <UtensilsIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">The ovens are warming up</p>
                <p className="text-muted-foreground">No pizzas are on the menu yet. Check back soon.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-5
            md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) =>
                <MenuCard key={item._id} item={item} />
            )}
        </div>
    )
}
