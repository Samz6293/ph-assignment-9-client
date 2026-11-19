import { toast } from "sonner";
import { getClientToken } from "@/lib/auth-client";
import { MenuItemData, UserData } from "@/lib/types";

// admin actions, called from client components after a button click

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// blocks or unblocks a customer or vendor
export async function setUserBlocked(user: UserData, isBlocked: boolean) {
    const action = isBlocked ? "block" : "unblock";

    try {
        const res = await fetch(`${apiUrl}/admin/users/${user._id}/block`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
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
        const res = await fetch(`${apiUrl}/admin/menu-items/${item._id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
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

// deletes a menu item for good (for items that break the rules)
export async function deleteMenuItem(item: MenuItemData) {
    try {
        const res = await fetch(`${apiUrl}/admin/menu-items/${item._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${await getClientToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't delete ${item.itemName}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${item.itemName} deleted`, { description: "It's gone from PizzaHub for good." });
        return true;
    }
    catch {
        toast.error(`Couldn't delete ${item.itemName}`, { description: "Check your connection and try again." });
        return false;
    }
}
