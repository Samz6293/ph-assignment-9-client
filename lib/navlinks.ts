import { NavLink } from "@/lib/types";

export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Browse Menu", href: "/menu" },
];

// each role has its own dashboard
export const getDashboardLink = (role: string) => `/dashboard/${role}`;

export const footerLinks: NavLink[] = [
    ...navLinks,
    { label: "Categories", href: "/#categories" },
    { label: "How it works", href: "/#how-it-works" },
];
