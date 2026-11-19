import Link from "next/link";
import { PizzaIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MenuItemStatusTag from "@/components/shared/MenuItemStatusTag";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import AvailabilitySwitch from "@/components/vendor/AvailabilitySwitch";
import MyMenuItemActions from "@/components/vendor/MyMenuItemActions";
import { getMyMenuItems } from "@/lib/fetch";
import { MyMenuItem } from "@/lib/types";

// one line under the name that explains statuses the vendor might not expect
const statusNote = (item: MyMenuItem) =>
    item.status === "rejected" ? "Not shown to customers. Edit it to send it for review again."
    : item.status === "pending" ? "Waiting for an admin to review it."
    : "";

export default async function MyMenuItemsList() {
    const items = await getMyMenuItems();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <PizzaIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No menu items yet</p>
                <p className="text-muted-foreground">Add your first pizza and it goes to an admin for review.</p>
                <Button render={<Link href="/dashboard/vendor/add-item" />} nativeButton={false}>Add Menu Item</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground font-semibold">{items.length} {items.length === 1 ? "item" : "items"}</p>

            {/* mobile: one card per item */}
            <div className="flex flex-col gap-3
                md:hidden">
                {items.map((item) =>
                    <div key={item._id} className="flex flex-col gap-3 bg-card border p-4 rounded-2xl">
                        <div className="flex gap-3">
                            <MenuItemThumb src={item.images[0]} className="size-16" />
                            <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                                <b className="max-w-full truncate">{item.itemName}</b>
                                <span className="text-sm text-muted-foreground">{item.category} · ৳{item.price}</span>
                                <MenuItemStatusTag status={item.status} />
                            </div>
                        </div>
                        {statusNote(item) && <p className="text-xs text-muted-foreground">{statusNote(item)}</p>}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                            <AvailabilitySwitch item={item} />
                            <MyMenuItemActions item={item} />
                        </div>
                    </div>
                )}
            </div>

            {/* tablet + desktop: table */}
            <div className="hidden bg-card border rounded-2xl overflow-hidden
                md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-5">Item</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead className="pr-5 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) =>
                            <TableRow key={item._id}>
                                <TableCell className="pl-5">
                                    <div className="flex items-center gap-3">
                                        <MenuItemThumb src={item.images[0]} className="size-11" />
                                        <div className="flex flex-col">
                                            <b>{item.itemName}</b>
                                            <span className="text-sm text-muted-foreground">{item.category}</span>
                                            {statusNote(item) && <span className="max-w-72 text-xs text-muted-foreground whitespace-normal">{statusNote(item)}</span>}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold">৳{item.price}</TableCell>
                                <TableCell>
                                    <MenuItemStatusTag status={item.status} />
                                </TableCell>
                                <TableCell>
                                    <AvailabilitySwitch item={item} />
                                </TableCell>
                                <TableCell className="pr-5">
                                    <div className="flex justify-end">
                                        <MyMenuItemActions item={item} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
