"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, LayoutDashboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getDashboardLink } from "@/lib/navlinks";
import { signOutUser } from "@/lib/user";

export default function ProfileMenu({ user }: { user: { name: string, email: string, image?: string | null, role: string } }) {
    const router = useRouter();
    const dashboardLink = getDashboardLink(user.role);

    const handleLogout = async () => {
        const success = await signOutUser();
        if (success) router.push("/");
    };

    return (
        <DropdownMenu>
            {/* avatar pill: first name hides on phones */}
            <DropdownMenuTrigger className="flex items-center gap-2.5 bg-card border py-1 pr-3 pl-1 rounded-full cursor-pointer">
                <UserAvatar name={user.name} image={user.image} className="size-8.5" textClassName="text-md" />
                <span className="hidden text-md font-semibold
                    sm:inline">
                    {user.name.split(" ")[0]}
                </span>
                <ChevronDownIcon className="size-4 text-muted-foreground" strokeWidth={2.5} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8} className="w-68">
                {/* who is signed in */}
                <div className="flex items-center gap-3 border-b mb-1.5 px-3 pt-3 pb-3.5">
                    <UserAvatar name={user.name} image={user.image} className="size-11" textClassName="text-lg" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <b className="text-md truncate">{user.name}</b>
                        <span className="text-sm text-muted-foreground truncate">{user.email}</span>
                    </div>
                </div>

                {/* render: draws the menu item as a Link, keeping the menu's keyboard behaviour */}
                <DropdownMenuItem render={<Link href={dashboardLink} />}>
                    <LayoutDashboardIcon strokeWidth={2.5} />
                    Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href={`${dashboardLink}/profile`} />}>
                    <SettingsIcon strokeWidth={2.5} />
                    Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOutIcon strokeWidth={2.5} />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
