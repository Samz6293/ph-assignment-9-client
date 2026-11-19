import { Suspense } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyMenuItemsList from "@/components/vendor/MyMenuItemsList";
import UsersListSkeleton from "@/components/admin/UsersListSkeleton";

export default function MyMenuItemsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4
                md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl leading-tight
                        md:text-4xl">
                        My Menu Items
                    </h1>
                    <p className="text-muted-foreground">Edit, switch off or delete your items. Edits go back to an admin for review.</p>
                </div>
                <Button render={<Link href="/dashboard/vendor/add-item" />} nativeButton={false} className="self-start
                    md:self-auto">
                    <PlusIcon data-icon="inline-start" strokeWidth={2.5} />
                    Add item
                </Button>
            </div>

            {/* the user list's skeleton has the same row shape, so it's reused here */}
            <Suspense fallback={<UsersListSkeleton />}>
                <MyMenuItemsList />
            </Suspense>
        </div>
    )
}
