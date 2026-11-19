import { Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import NavLinks from "@/components/navbar/NavLinks";
import UserArea from "@/components/navbar/UserArea";
import MobileMenu from "@/components/navbar/MobileMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { navLinks } from "@/lib/navlinks";

export default function Navbar() {
    return (
        <header className="bg-background text-foreground border-b">
            <nav className="content-box flex items-center gap-9 py-4">
                {/* logo */}
                <Link href="/" className="shrink-0">
                    <Logo />
                </Link>

                {/* desktop: links sit right after the logo */}
                {/* Suspense: NavLinks reads the URL, which isn't known ahead of time on /menu/[id], so it streams in there */}
                <Suspense>
                    <NavLinks className="hidden items-center gap-1.5
                        lg:flex" links={navLinks} />
                </Suspense>

                {/* right side: theme toggle always, then the user's avatar or the auth buttons, menu button below desktop */}
                <div className="flex items-center gap-2.5 ml-auto">
                    <ThemeToggle />
                    <UserArea />
                    <MobileMenu className="flex
                        lg:hidden" />
                </div>
            </nav>
        </header>
    )
}
