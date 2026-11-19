import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileSettings from "@/components/dashboard/ProfileSettings";

// same page for every role; ProfileSettings shows the fields that role can edit
export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Profile Settings
                </h1>
                <p className="text-muted-foreground">Your name and photo show in the dashboard and on your orders.</p>
            </div>

            <Suspense fallback={<Skeleton className="h-120 rounded-2xl" />}>
                <ProfileSettings />
            </Suspense>
        </div>
    )
}
