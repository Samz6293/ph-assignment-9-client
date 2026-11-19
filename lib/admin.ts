import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { MenuItemData, UserData } from "@/lib/types";

// admin actions, called from client components after a button click

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// blocks or unblocks a customer or vendor
export async function setUserBlocked(user: UserData, isBlocked: boolean) {
    const action = isBlocked ? "block" : "unblock";

    try {
        // in the browser the token comes from Better Auth's /token route, using the session cookie
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${apiUrl}/admin/users/${user._id}/block`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenData?.token}` },
            body: JSON.stringify({ isBlocked }),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't ${action} ${user.name}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${user.name} is ${action}ed`, {
            description: isBlocked ? "They can't use PizzaHub until you unblock them." : "They can use PizzaHub again.",
        });
        return true;
    }
    catch {
        toast.error(`Couldn't ${action} ${user.name}`, { description: "Check your connection and try again." });
        return false;
    }
}

// approves or rejects a vendor's menu item
export async function setMenuItemStatus(item: MenuItemData, status: "approved" | "rejected") {
    const action = status === "approved" ? "approve" : "reject";

    try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${apiUrl}/admin/menu-items/${item._id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenData?.token}` },
            body: JSON.stringify({ status }),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't ${action} ${item.itemName}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${item.itemName} is ${status}`, {
            description: status === "approved" ? "It's now on the public menu." : "Customers won't see it on the menu.",
        });
        return true;
    }
    catch {
        toast.error(`Couldn't ${action} ${item.itemName}`, { description: "Check your connection and try again." });
        return false;
    }
}
