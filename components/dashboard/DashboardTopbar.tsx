"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, ExternalLinkIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/components/dashboard/SidebarContent";
import ThemeToggle from "@/components/shared/ThemeToggle";
import UserAvatar from "@/components/shared/UserAvatar";
import { authClient } from "@/lib/auth-client";
import { dashboardLinks } from "@/lib/navlinks";

export default function DashboardTopbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = authClient.useSession();

    // breadcrumb: "{role} dashboard › {current page}"
    const role = pathname.split("/")[2];
    const page = dashboardLinks[role]?.find((link) => link.href === pathname)?.label ?? "Overview";

    return (
        <header className="flex items-center gap-3 bg-background border-b px-4 py-3.5
            md:px-7 lg:px-8">
            {/* mobile + tablet: menu button opens the sidebar as a drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="flex items-center justify-center size-10 shrink-0 bg-foreground text-background rounded-full
                    lg:hidden">
                    <MenuIcon className="size-5" strokeWidth={2.5} />
                    <span className="sr-only">Open menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="gap-0 p-0">
                    {/* the drawer needs a title for screen readers, even if nobody sees it */}
                    <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
                    <SidebarContent onLinkClick={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
            <Link href="/" className="font-heading text-xl leading-none
                lg:hidden">
                Pizza<span className="text-primary">Hub</span>
            </Link>

            {/* desktop: where you are */}
            <div className="hidden items-center gap-2 text-sm text-muted-foreground
                lg:flex">
                <span className="capitalize">{role} dashboard</span>
                <ChevronRightIcon className="size-3.5" strokeWidth={2.5} />
                <b className="text-foreground font-semibold">{page}</b>
            </div>

            {/* right side */}
            <div className="flex items-center gap-2 ml-auto">
                <Link href="/" className="hidden items-center gap-1.5 text-sm text-muted-foreground font-semibold px-3.5 py-2.25
                    lg:flex
                    hover:text-foreground">
                    <ExternalLinkIcon className="size-4" strokeWidth={2.5} />
                    View site
                </Link>
                <ThemeToggle />
                {session && <UserAvatar name={session.user.name} image={session.user.image} className="size-10" textClassName="text-md" />}
            </div>
        </header>
    )
}
