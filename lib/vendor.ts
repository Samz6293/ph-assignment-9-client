import { toast } from "sonner";
import { getClientToken } from "@/lib/auth-client";
import { MenuItemInput, MyMenuItem, VendorOrder } from "@/lib/types";

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

// saves changes to an item; the server sends it back to pending for review
export async function updateMenuItem(id: string, item: MenuItemInput) {
    try {
        const res = await fetch(`${apiUrl}/menu-items/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
            body: JSON.stringify(item),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't save ${item.itemName}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${item.itemName} sent for review`, { description: "An admin will check your changes before they go live." });
        return true;
    }
    catch {
        toast.error(`Couldn't save ${item.itemName}`, { description: "Check your connection and try again." });
        return false;
    }
}

// switches an approved item off the menu, or back on
export async function setItemAvailability(item: MyMenuItem, isAvailable: boolean) {
    try {
        const res = await fetch(`${apiUrl}/menu-items/${item._id}/availability`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
            body: JSON.stringify({ isAvailable }),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't update ${item.itemName}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(isAvailable ? `${item.itemName} is back on the menu` : `${item.itemName} is off the menu`, {
            description: isAvailable ? "Customers can order it again." : "Customers can't order it until you switch it back on.",
        });
        return true;
    }
    catch {
        toast.error(`Couldn't update ${item.itemName}`, { description: "Check your connection and try again." });
        return false;
    }
}

// deletes one of the vendor's own items
export async function deleteMyMenuItem(item: MyMenuItem) {
    try {
        const res = await fetch(`${apiUrl}/menu-items/${item._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${await getClientToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't delete ${item.itemName}`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(`${item.itemName} deleted`, { description: "It's no longer on PizzaHub." });
        return true;
    }
    catch {
        toast.error(`Couldn't delete ${item.itemName}`, { description: "Check your connection and try again." });
        return false;
    }
}

// accepts or rejects a pending order; the server allows it only once
export async function answerOrder(order: VendorOrder, status: "accepted" | "rejected") {
    const customerName = order.customer?.name ?? "The customer";
    const action = status === "accepted" ? "accept" : "reject";

    try {
        const res = await fetch(`${apiUrl}/orders/${order._id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
            body: JSON.stringify({ status }),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error(`Couldn't ${action} the order`, { description: data.message || "Please try again." });
            return false;
        }

        toast.success(status === "accepted" ? "Order accepted" : "Order rejected", {
            description: status === "accepted" ? `${customerName} will see it's confirmed.` : `${customerName} will see you can't take it.`,
        });
        return true;
    }
    catch {
        toast.error(`Couldn't ${action} the order`, { description: "Check your connection and try again." });
        return false;
    }
}

// asks the server for a Stripe Checkout page and goes there; Premium switches on later, from the webhook
// returns false (with a toast) only when it couldn't open the page
export async function startCheckout() {
    try {
        const res = await fetch(`${apiUrl}/create-checkout-session`, {
            method: "POST",
            headers: { Authorization: `Bearer ${await getClientToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Couldn't open checkout", { description: data.message || "Please try again." });
            return false;
        }

        // leave PizzaHub for Stripe's payment page
        window.location.href = data.url;
        return true;
    }
    catch {
        toast.error("Couldn't open checkout", { description: "Check your connection and try again." });
        return false;
    }
}

// stops Premium renewing; it stays on until the end of the paid month
export async function cancelSubscription(endsOn: string) {
    try {
        const res = await fetch(`${apiUrl}/subscriptions/cancel`, {
            method: "POST",
            headers: { Authorization: `Bearer ${await getClientToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Couldn't cancel Premium", { description: data.message || "Please try again." });
            return false;
        }

        toast.success("Premium won't renew", { description: `You keep Premium until ${endsOn}.` });
        return true;
    }
    catch {
        toast.error("Couldn't cancel Premium", { description: "Check your connection and try again." });
        return false;
    }
}

// undoes a cancel before the paid month ends, so Premium renews again
export async function resumeSubscription() {
    try {
        const res = await fetch(`${apiUrl}/subscriptions/resume`, {
            method: "POST",
            headers: { Authorization: `Bearer ${await getClientToken()}` },
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Couldn't keep Premium", { description: data.message || "Please try again." });
            return false;
        }

        toast.success("Premium will renew", { description: "Nothing changes. It renews every month as before." });
        return true;
    }
    catch {
        toast.error("Couldn't keep Premium", { description: "Check your connection and try again." });
        return false;
    }
}
