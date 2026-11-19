"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/menu";

const sortOptions = [
    { label: "Newest first", value: null },
    { label: "Price: low to high", value: "price_asc" },
    { label: "Price: high to low", value: "price_desc" },
];

// search + category + area + sort, all kept in the URL so a reload or shared link shows the same menu
export default function MenuFilters({ locations }: { locations: string[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // items: value → label for each dropdown, so the trigger shows "Price: low to high", not "price_asc"
    // value null = "no filter", which also shows that label
    const categoryItems = [{ label: "All categories", value: null }, ...categories.map((category) => ({ label: category, value: category }))];
    const locationItems = [{ label: "All areas", value: null }, ...locations.map((location) => ({ label: location, value: location }))];

    // keeps the other filters, swaps in the new value; empty removes it from the URL
    const updateUrl = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(key, value);
        else params.delete(key);
        router.replace(`${pathname}?${params}`, { scroll: false });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateUrl("search", String(formData.get("search")).trim());
    };

    // the box was emptied (✕ button or backspace): drop the old search straight away instead of waiting for Enter
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" && searchParams.get("search")) updateUrl("search", "");
    };

    return (
        <div className="flex flex-col gap-3
            lg:flex-row lg:items-center">
            <form onSubmit={handleSearch} className="w-full
                lg:max-w-100">
                <InputGroup className="rounded-full">
                    <InputGroupAddon>
                        <SearchIcon strokeWidth={2.5} />
                    </InputGroupAddon>
                    <InputGroupInput name="search" type="search" placeholder="Search by name or category"
                        defaultValue={searchParams.get("search") ?? ""} onChange={handleSearchChange} aria-label="Search the menu" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton type="submit">Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>

            <div className="grid grid-cols-1 gap-3 flex-1
                sm:grid-cols-3">
                <Select items={categoryItems} value={searchParams.get("category")} onValueChange={(value) => updateUrl("category", value)}>
                    <SelectTrigger className="w-full" aria-label="Category">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryItems.map((item) =>
                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                        )}
                    </SelectContent>
                </Select>

                <Select items={locationItems} value={searchParams.get("location")} onValueChange={(value) => updateUrl("location", value)}>
                    <SelectTrigger className="w-full" aria-label="Area">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {locationItems.map((item) =>
                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                        )}
                    </SelectContent>
                </Select>

                <Select items={sortOptions} value={searchParams.get("sort")} onValueChange={(value) => updateUrl("sort", value)}>
                    <SelectTrigger className="w-full" aria-label="Sort">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((item) =>
                            <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
