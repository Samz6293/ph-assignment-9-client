import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import UserAvatar from "@/components/shared/UserAvatar";

// the signed-in admin, shown apart from the list because they can't act on their own account
export default async function CurrentAdminCard() {
    // Better Auth reads the clock (new Date()) to check the session; connection() makes Next wait for a real request first
    await connection();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    const { user } = session;

    return (
        <div className="flex items-center gap-3 bg-card border p-4 rounded-2xl">
            <UserAvatar name={user.name} image={user.image} className="size-11" />
            <div className="flex flex-col flex-1 min-w-0">
                <b className="truncate">{user.name}</b>
                <span className="text-sm text-muted-foreground truncate">{user.email}</span>
            </div>
            <span className="shrink-0 bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-1 rounded-full">You · Admin</span>
        </div>
    )
}
