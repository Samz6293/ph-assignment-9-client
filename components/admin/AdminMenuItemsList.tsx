import { ClipboardListIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MenuItemStatusTag from "@/components/shared/MenuItemStatusTag";
import MenuItemThumb from "@/components/shared/MenuItemThumb";
import MenuItemReviewDialog from "@/components/admin/MenuItemReviewDialog";
import { getAdminMenuItems } from "@/lib/fetch";
import { formatDate } from "@/lib/date";

export default async function AdminMenuItemsList({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const { search, status } = await searchParams;
    const items = await getAdminMenuItems(typeof search === "string" ? search : undefined, typeof status === "string" ? status : undefined);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 bg-card border text-center px-6 py-14 rounded-2xl">
                <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <ClipboardListIcon className="size-6" strokeWidth={2.5} />
                </span>
                <p className="text-lg font-bold">No menu items found</p>
                <p className="text-muted-foreground">Try another name, or switch the status back to All.</p>
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
                    <div key={item._id} className="flex gap-3 bg-card border p-4 rounded-2xl">
                        <MenuItemThumb src={item.images[0]} className="size-16" />
                        <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                            <b className="max-w-full truncate">{item.itemName}</b>
                            <span className="max-w-full text-sm text-muted-foreground truncate">{item.vendor.businessName ?? item.vendor.name} · ৳{item.price}</span>
                            <MenuItemStatusTag status={item.status} />
                        </div>
                        <div className="self-center">
                            <MenuItemReviewDialog item={item} submitted={formatDate(item.createdAt)} />
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
                            <TableHead>Vendor</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
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
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.vendor.businessName ?? item.vendor.name}</TableCell>
                                <TableCell className="font-semibold">৳{item.price}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                                <TableCell>
                                    <MenuItemStatusTag status={item.status} />
                                </TableCell>
                                <TableCell className="pr-5 text-right">
                                    <MenuItemReviewDialog item={item} submitted={formatDate(item.createdAt)} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
