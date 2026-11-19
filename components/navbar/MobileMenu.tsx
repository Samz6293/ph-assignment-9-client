"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon, LogOutIcon, MenuIcon, SettingsIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import NavLinks from "@/components/navbar/NavLinks";
import AuthButtons from "@/components/navbar/AuthButtons";
import UserAvatar from "@/components/shared/UserAvatar";
import { getDashboardLink, navLinks } from "@/lib/navlinks";
import { authClient } from "@/lib/auth-client";
import { signOutUser } from "@/lib/user";

export default function MobileMenu({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    // a link click doesn't close the sheet by itself, so each link calls this
    const handleClose = () => setOpen(false);

    const handleLogout = async () => {
        const success = await signOutUser();
        if (success) {
            setOpen(false);
            router.push("/");
        }
    };

    return (
        <div className={className}>
            <Sheet open={open} onOpenChange={setOpen}>
                {/* menu button: filled circle in the text colour */}
                <SheetTrigger className="flex items-center justify-center size-10 bg-foreground text-background rounded-full">
                    <MenuIcon className="size-5" strokeWidth={2.5} />
                    <span className="sr-only">Open menu</span>
                </SheetTrigger>

                <SheetContent side="left" className="gap-5.5 px-4 py-5.5">
                    {/* logo */}
                    <SheetHeader className="px-2 py-0">
                        <SheetTitle>
                            <Logo />
                        </SheetTitle>
                    </SheetHeader>

                    {/* links */}
                    <NavLinks className="flex flex-col gap-1" links={navLinks} isSheet onLinkClick={handleClose} />

                    {/* bottom: the signed-in user with logout (like the dashboard drawer), or the auth buttons */}
                    <SheetFooter className="p-0">
                        {session ?
                            // same as the desktop avatar menu: who you are, then Dashboard, Profile Settings and Logout
                            <div className="flex flex-col gap-0.5 w-full border-t pt-3.5">
                                <div className="flex items-center gap-3 border-b mb-1.5 px-3 pb-3.5">
                                    <UserAvatar name={session.user.name} image={session.user.image} className="size-11" textClassName="text-lg" />
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <b className="text-md truncate">{session.user.name}</b>
                                        <span className="text-sm text-muted-foreground truncate">{session.user.email}</span>
                                    </div>
                                </div>

                                <Link href={getDashboardLink(session.user.role)} onClick={handleClose} className="flex items-center gap-3 px-3 py-2.75 rounded-lg text-md font-medium
                                    hover:bg-secondary">
                                    <LayoutDashboardIcon className="size-4.5" strokeWidth={2.5} />
                                    Dashboard
                                </Link>
                                <Link href={`${getDashboardLink(session.user.role)}/profile`} onClick={handleClose} className="flex items-center gap-3 px-3 py-2.75 rounded-lg text-md font-medium
                                    hover:bg-secondary">
                                    <SettingsIcon className="size-4.5" strokeWidth={2.5} />
                                    Profile Settings
                                </Link>
                                <button type="button" onClick={handleLogout} className="flex items-center gap-3 text-destructive px-3 py-2.75 rounded-lg text-md font-semibold
                                    hover:bg-destructive/10">
                                    <LogOutIcon className="size-4.5" strokeWidth={2.5} />
                                    Logout
                                </button>
                            </div>
                            :
                            <AuthButtons className="flex flex-col gap-2" onLinkClick={handleClose} />
                        }
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
