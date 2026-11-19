import { toast } from "sonner";
import { getClientToken } from "@/lib/auth-client";
import { MenuItemInput } from "@/lib/types";

// vendor actions, called from client components

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// sends a new item for review
export async function createMenuItem(item: MenuItemInput) {
    try {
        const res = await fetch(`${apiUrl}/menu-items`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
            body: JSON.stringify(item),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Couldn't add your item", { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${item.itemName} sent for review`, { description: "An admin will check it before it goes on the menu." });
        return true;
    }
    catch {
        toast.error("Couldn't add your item", { description: "Check your connection and try again." });
        return false;
    }
}
