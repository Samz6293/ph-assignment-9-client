"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

const statuses = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Inactive", value: "inactive" },
];

// search by item name + status pills, both kept in the URL (same pattern as UserFilters)
export default function MenuItemFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") ?? "";

    const updateUrl = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(key, value);
        else params.delete(key);
        router.replace(`${pathname}?${params}`);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateUrl("search", String(formData.get("search")).trim());
    };

    return (
        <div className="flex flex-col gap-3
            lg:flex-row lg:items-center lg:justify-between">
            <form onSubmit={handleSearch} className="w-full
                lg:max-w-100">
                <InputGroup>
                    <InputGroupAddon>
                        <SearchIcon strokeWidth={2.5} />
                    </InputGroupAddon>
                    <InputGroupInput name="search" type="search" placeholder="Search by item name"
                        defaultValue={searchParams.get("search") ?? ""} aria-label="Search menu items" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton type="submit">Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>

            <div className="flex flex-wrap gap-2">
                {statuses.map((status) =>
                    <Button key={status.label} size="sm" variant={currentStatus === status.value ? "default" : "outline"}
                        onClick={() => updateUrl("status", status.value)}>
                        {status.label}
                    </Button>
                )}
            </div>
        </div>
    )
}
