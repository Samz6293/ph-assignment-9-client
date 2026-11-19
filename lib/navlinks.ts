import { ClipboardListIcon, CirclePlusIcon, CrownIcon, InboxIcon, LayoutDashboardIcon, PizzaIcon, ReceiptIcon, SettingsIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { DashboardLink, NavLink } from "@/lib/types";

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

// sidebar links per role, from the dashboard designs
export const dashboardLinks: Record<string, DashboardLink[]> = {
    customer: [
        { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboardIcon },
        { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBagIcon },
        { label: "Profile Settings", href: "/dashboard/customer/profile", icon: SettingsIcon },
    ],
    vendor: [
        { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboardIcon },
        { label: "My Menu Items", href: "/dashboard/vendor/menu-items", icon: PizzaIcon },
        { label: "Add Menu Item", href: "/dashboard/vendor/add-item", icon: CirclePlusIcon },
        { label: "Customer Orders", href: "/dashboard/vendor/orders", icon: InboxIcon },
        { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CrownIcon },
        { label: "Profile Settings", href: "/dashboard/vendor/profile", icon: SettingsIcon },
    ],
    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboardIcon },
        { label: "Manage Users", href: "/dashboard/admin/users", icon: UsersIcon },
        { label: "Manage Menu Items", href: "/dashboard/admin/menu-items", icon: ClipboardListIcon },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: ReceiptIcon },
        { label: "Profile Settings", href: "/dashboard/admin/profile", icon: SettingsIcon },
    ],
};
