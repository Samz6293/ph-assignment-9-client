"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HouseIcon, LogOutIcon } from "lucide-react";
import Logo from "@/components/shared/Logo";
import UserAvatar from "@/components/shared/UserAvatar";
import { authClient } from "@/lib/auth-client";
import { dashboardLinks } from "@/lib/navlinks";
import { signOutUser } from "@/lib/user";

// the sidebar's inside: used by the desktop sidebar and by the mobile drawer
export default function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = authClient.useSession();

    // the role comes from the URL (/dashboard/vendor/...), so the links show before the session loads
    const role = pathname.split("/")[2];
    const links = dashboardLinks[role] ?? [];

    const handleLogout = async () => {
        const success = await signOutUser();
        if (success) router.push("/");
    };

    return (
        <div className="flex flex-col gap-5.5 h-full px-4 py-5.5">
            {/* logo */}
            <Link href="/" onClick={onLinkClick} className="px-2">
                <Logo />
            </Link>

            {/* role links */}
            <nav className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase px-3.5 pb-2">{role} dashboard</span>
                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link key={link.href} href={link.href} onClick={onLinkClick} className={`flex items-center gap-3 px-3.5 py-2.75 rounded-full text-md
                            ${isActive ? "bg-primary text-primary-foreground font-semibold" : "font-medium"}
                            ${!isActive && "hover:bg-secondary"}`}>
                            <link.icon className={`size-5
                                ${!isActive && "text-muted-foreground"}`} strokeWidth={2.5} />
                            {link.label}
                        </Link>
                    )
                })}
                <Link href="/" onClick={onLinkClick} className="flex items-center gap-3 text-muted-foreground px-3.5 py-2.75 rounded-full text-md font-medium
                    hover:bg-secondary">
                    <HouseIcon className="size-5" strokeWidth={2.5} />
                    Back to site
                </Link>
            </nav>

            {/* signed-in user, pinned to the bottom; vendors see their shop name instead of the email */}
            {session &&
                <div className="flex items-center gap-3 border-t mt-auto px-2.5 pt-3.5">
                    <UserAvatar name={session.user.name} image={session.user.image} className="size-10" textClassName="text-md" />
                    <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                        <b className="text-sm truncate">{session.user.name}</b>
                        <span className="text-xs text-muted-foreground truncate">{session.user.businessName || session.user.email}</span>
                    </div>
                    <button type="button" onClick={handleLogout} aria-label="Logout" className="flex items-center justify-center size-10 text-muted-foreground rounded-full
                        hover:bg-secondary hover:text-destructive">
                        <LogOutIcon className="size-4.5" strokeWidth={2.5} />
                    </button>
                </div>
            }
        </div>
    )
}
