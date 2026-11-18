import { VendorPreview } from "@/lib/types";

// newest pizzeria on PizzaHub, shown on the hero chip
export async function getLatestVendor(): Promise<VendorPreview> {
    // TODO: fetch the newest vendor from the server once that route exists
    return { businessName: "Napoli Corner", location: "Zindabazar, Sylhet" };
}
