"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

const roles = [
    { label: "All", value: "" },
    { label: "Customers", value: "customer" },
    { label: "Vendors", value: "vendor" },
    { label: "Admins", value: "admin" },
];

// search + role filter, both kept in the URL so a reload or shared link shows the same list
export default function UserFilters() {
    const router = useRouter();
    const pathname = usePathname();
    // useSearchParams: the current ?search=&role= values, read in the browser
    const searchParams = useSearchParams();
    const currentRole = searchParams.get("role") ?? "";

    // keeps the other filter, swaps in the new value; an empty value removes it from the URL
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
            md:flex-row md:items-center md:justify-between">
            {/* search: Enter or the button */}
            <form onSubmit={handleSearch} className="w-full
                md:max-w-100">
                <InputGroup>
                    <InputGroupAddon>
                        <SearchIcon strokeWidth={2.5} />
                    </InputGroupAddon>
                    <InputGroupInput name="search" type="search" placeholder="Search by name or email"
                        defaultValue={searchParams.get("search") ?? ""} aria-label="Search users" />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton type="submit">Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>

            {/* role pills */}
            <div className="flex flex-wrap gap-2">
                {roles.map((role) =>
                    <Button key={role.label} size="sm" variant={currentRole === role.value ? "default" : "outline"}
                        onClick={() => updateUrl("role", role.value)}>
                        {role.label}
                    </Button>
                )}
            </div>
        </div>
    )
}
