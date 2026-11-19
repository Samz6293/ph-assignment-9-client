import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { AdminStats, UserData, VendorPreview } from "@/lib/types";

// server-only helpers: they read the request's cookies, so only server components can call them

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// the signed-in user's token (15 min), made from the session cookie of this request
async function getToken() {
    // Better Auth reads the clock (new Date()) to sign the token; connection() makes Next wait for a real request first
    await connection();
    const { token } = await auth.api.getToken({ headers: await headers() });
    return token;
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
