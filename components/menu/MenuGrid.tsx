import { SearchXIcon } from "lucide-react";
import MenuCard from "@/components/menu/MenuCard";
import { getMenuItems } from "@/lib/fetch";

// Browse Menu results: reads the filters from the URL and asks the server for matching items
export default async function MenuGrid({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const { search, category, location, sort } = await searchParams;
    // a repeated key (?category=a&category=b) arrives as an array; only plain strings go to the server
    const text = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined;
    const items = await getMenuItems({ search: text(search), category: text(category), location: text(location), sort: text(sort) });

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-16 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <SearchXIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No pizzas match that search</p>
                <p className="text-muted-foreground">Try another area or category.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground font-semibold">{items.length} {items.length === 1 ? "item" : "items"}</p>
            <div className="grid grid-cols-1 gap-5
                md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) =>
                    <MenuCard key={item._id} item={item} />
                )}
            </div>
        </div>
    )
}
