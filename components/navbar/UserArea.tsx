"use client";
import AuthButtons from "@/components/navbar/AuthButtons";
import ProfileMenu from "@/components/navbar/ProfileMenu";
import { authClient } from "@/lib/auth-client";

// right side of the navbar: avatar menu when signed in, Sign In / Sign Up when not
export default function UserArea() {
    // useSession re-renders this the moment someone signs in or out, no reload needed
    const { data: session, isPending } = authClient.useSession();

    // while the session loads, hold the avatar's place so nothing jumps
    if (isPending) return <div className="size-10 bg-secondary rounded-full" />;

    return (
        <>
            {session ?
                <ProfileMenu user={session.user} />
                :
                <AuthButtons className="hidden items-center gap-2
                    sm:flex" />
            }
        </>
    )
}
