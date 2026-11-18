import { NavLink } from "@/lib/types";

export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Browse Menu", href: "/menu" },
];

export const footerLinks: NavLink[] = [
    ...navLinks,
    { label: "Categories", href: "/#categories" },
    { label: "How it works", href: "/#how-it-works" },
];
