import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { AdminStats, CustomerStats, MenuFilters, MenuItemData, MyMenuItem, MyOrder, PublicMenuItem, UserData, VendorOrder, VendorPreview, VendorStats } from "@/lib/types";

// server-only helpers: they read the request's cookies, so only server components can call them

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// the signed-in user's token (15 min), made from the session cookie of this request
async function getToken() {
    // Better Auth reads the clock (new Date()) to sign the token; connection() makes Next wait for a real request first
    await connection();
    const { token } = await auth.api.getToken({ headers: await headers() });
    return token;
}

// the signed-in user, straight from the database (the session can be a little behind, e.g. right after a payment)
export async function getMe(): Promise<UserData> {
    const res = await fetch(`${apiUrl}/users/me`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load your account");
    return await res.json();
}

// newest pizzeria on PizzaHub, shown on the hero chip
export async function getLatestVendor(): Promise<VendorPreview> {
    // TODO: fetch the newest vendor from the server once that route exists
    return { businessName: "Napoli Corner", location: "Zindabazar, Sylhet" };
}

// admin: every user, filtered on the server by search (name or email) and role
export async function getUsers(search?: string, role?: string): Promise<UserData[]> {
    // URLSearchParams builds "search=...&role=..." and encodes spaces and symbols safely
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (role) params.set("role", role);

    const res = await fetch(`${apiUrl}/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load users");
    return await res.json();
}

// admin: counts for the overview's stat cards and charts
export async function getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${apiUrl}/stats/admin`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load the overview");
    return await res.json();
}

// vendor: counts for their overview's stat cards and charts
export async function getVendorStats(): Promise<VendorStats> {
    const res = await fetch(`${apiUrl}/stats/vendor`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load the overview");
    return await res.json();
}

// customer: counts for their overview's stat cards and chart
export async function getCustomerStats(): Promise<CustomerStats> {
    const res = await fetch(`${apiUrl}/stats/customer`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load the overview");
    return await res.json();
}

// admin: every menu item, pending first, filtered on the server by search (item name) and status
export async function getAdminMenuItems(search?: string, status?: string): Promise<MenuItemData[]> {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);

    const res = await fetch(`${apiUrl}/admin/menu-items?${params}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load menu items");
    return await res.json();
}

// vendor: their own items in every status, newest first
export async function getMyMenuItems(): Promise<MyMenuItem[]> {
    const res = await fetch(`${apiUrl}/menu-items/mine`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load your menu items");
    return await res.json();
}

// customer: their own orders, newest first, with the item and shop attached
export async function getMyOrders(): Promise<MyOrder[]> {
    const res = await fetch(`${apiUrl}/orders/mine`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load your orders");
    return await res.json();
}

// vendor: orders for their own items, newest first, with the item and customer attached
export async function getVendorOrders(): Promise<VendorOrder[]> {
    const res = await fetch(`${apiUrl}/orders/vendor`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) throw new Error("Couldn't load your orders");
    return await res.json();
}

// public: approved items, filtered and sorted on the server (no sign-in needed)
export async function getMenuItems(filters: MenuFilters = {}): Promise<PublicMenuItem[]> {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.limit) params.set("limit", String(filters.limit));

    const res = await fetch(`${apiUrl}/menu-items?${params}`);
    if (!res.ok) throw new Error("Couldn't load the menu");
    return await res.json();
}

// public: every area that has a live item, for the location filter
export async function getMenuLocations(): Promise<string[]> {
    const res = await fetch(`${apiUrl}/menu-items/locations`);
    if (!res.ok) throw new Error("Couldn't load the areas");
    return await res.json();
}

// public: one item for Item Details; null when it doesn't exist or isn't live (the page shows "not found")
export async function getMenuItem(id: string): Promise<PublicMenuItem | null> {
    const res = await fetch(`${apiUrl}/menu-items/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Couldn't load this item");
    return await res.json();
}
