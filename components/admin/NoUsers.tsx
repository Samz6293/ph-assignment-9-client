import { UserSearchIcon } from "lucide-react";

// empty state when the search or role filter matches nobody
export default function NoUsers() {
    return (
        <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
            <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                <UserSearchIcon className="size-6" strokeWidth={2.5} />
            </span>
            <p className="text-lg font-bold">No users found</p>
            <p className="text-muted-foreground">Try another name or email, or switch the role back to All.</p>
        </div>
    )
}
