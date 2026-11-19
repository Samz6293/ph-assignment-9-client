import { Suspense } from "react";
import MenuItemFilters from "@/components/admin/MenuItemFilters";
import AdminMenuItemsList from "@/components/admin/AdminMenuItemsList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function ManageMenuItemsPage({ searchParams }: PageProps<"/dashboard/admin/menu-items">) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Manage Menu Items
                </h1>
                <p className="text-muted-foreground">Review new items from vendors. Only approved items reach the public menu.</p>
            </div>

            <Suspense>
                <MenuItemFilters />
            </Suspense>

            {/* the user list's skeleton has the same row shape, so it's reused here */}
            <Suspense fallback={<UsersListSkeleton />}>
                <AdminMenuItemsList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}
