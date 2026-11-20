import { toast } from "sonner";
import { getClientToken } from "@/lib/auth-client";
import { OrderInput } from "@/lib/types";

// customer actions, called from client components

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// sends an order to the vendor; shopName is only for the toast
export async function placeOrder(order: OrderInput, shopName: string) {
    try {
        const res = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getClientToken()}` },
            body: JSON.stringify(order),
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("Couldn't place your order", { description: data.message || "Please try again." });
            return false;
        }

        toast.success("Order sent", { description: `${shopName} will confirm your order.` });
        return true;
    }
    catch {
        toast.error("Couldn't place your order", { description: "Check your connection and try again." });
        return false;
    }
}
