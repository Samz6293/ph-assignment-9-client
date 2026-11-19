import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CurrentAdminCard from "@/components/admin/CurrentAdminCard";
import UserFilters from "@/components/admin/UserFilters";
import UsersList from "@/components/admin/UsersList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function ManageUsersPage({ searchParams }: PageProps<"/dashboard/admin/users">) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Manage Users
                </h1>
                <p className="text-muted-foreground">Find any customer or vendor, and block accounts that break the rules.</p>
            </div>

            {/* the admin's own account, kept out of the list below */}
            <Suspense fallback={<Skeleton className="h-19 rounded-2xl" />}>
                <CurrentAdminCard />
            </Suspense>

            {/* filters read the URL, so they need their own Suspense boundary */}
            <Suspense>
                <UserFilters />
            </Suspense>

            {/* searchParams is passed on unawaited: only the list waits for it, the heading shows straight away */}
            <Suspense fallback={<UsersListSkeleton />}>
                <UsersList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}
