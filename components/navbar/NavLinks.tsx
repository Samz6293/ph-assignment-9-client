"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/lib/types";

export default function NavLinks({ className, links, isSheet, onLinkClick }: { className?: string, links: NavLink[], isSheet?: boolean, onLinkClick?: () => void }) {
    const pathname = usePathname();

    // active pill: soft red in the navbar, solid red in the mobile sheet
    const activeStyle = isSheet ? "bg-primary text-primary-foreground font-semibold" : "bg-primary-soft text-primary-soft-foreground font-semibold";
    const idleStyle = isSheet ? "text-foreground font-medium" : "text-muted-foreground font-semibold";

    return (
        <div className={className}>
            {links.map((link) =>
                <Link key={link.href} href={link.href} onClick={onLinkClick} className={`px-3.5 rounded-full text-md
                    ${isSheet ? "py-2.75" : "py-2"}
                    ${pathname === link.href ? activeStyle : idleStyle}
                    hover:text-foreground`}>
                    {link.label}
                </Link>
            )}
        </div>
    )
}
