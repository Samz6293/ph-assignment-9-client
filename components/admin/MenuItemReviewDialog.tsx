"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MenuItemStatusTag from "@/components/admin/MenuItemStatusTag";
import MenuItemThumb from "@/components/admin/MenuItemThumb";
import MenuItemReviewActions from "@/components/admin/MenuItemReviewActions";
import { MenuItemData } from "@/lib/types";

// everything the admin needs to decide: photos, details, vendor; Approve / Reject at the bottom
export default function MenuItemReviewDialog({ item, submitted }: { item: MenuItemData, submitted: string }) {
    const details = [
        { label: "Vendor", value: item.vendor.businessName ?? item.vendor.name },
        { label: "Vendor email", value: item.vendor.email },
        { label: "Location", value: item.location },
        { label: "Submitted", value: submitted },
    ];

    return (
        <Dialog>
            <DialogTrigger render={<Button size="sm" variant="outline" />}>Review</DialogTrigger>

            {/* max-h + overflow: long descriptions scroll inside the dialog on short phone screens */}
            <DialogContent className="grid-cols-1 max-h-9/10 overflow-y-auto
                sm:max-w-lg">
                {/* photos: first one large, the rest as thumbnails */}
                <div className="flex flex-col gap-2 pt-6">
                    <div className="relative w-full aspect-4/3 bg-placeholder rounded-xl overflow-hidden">
                        <Image src={item.images[0]} alt={item.itemName} fill sizes="(min-width: 640px) 480px, 90vw" className="object-cover" />
                    </div>
                    {item.images.length > 1 &&
                        <div className="flex gap-2">
                            {item.images.slice(1).map((image) =>
                                <MenuItemThumb key={image} src={image} className="size-16" />
                            )}
                        </div>
                    }
                </div>

                <DialogHeader className="items-start gap-1">
                    <DialogDescription>{item.category}</DialogDescription>
                    <DialogTitle className="max-w-full text-xl">{item.itemName}</DialogTitle>
                    <div className="flex items-center gap-3">
                        <span className="font-heading text-2xl text-primary">৳{item.price}</span>
                        <MenuItemStatusTag status={item.status} />
                    </div>
                </DialogHeader>

                <p className="text-sm leading-relaxed">{item.description}</p>

                {/* label, value on the line below */}
                <dl className="flex flex-col gap-3 bg-card border text-sm p-4 rounded-2xl">
                    {details.map((detail) =>
                        <div key={detail.label} className="flex flex-col gap-0.5">
                            <dt className="text-muted-foreground">{detail.label}</dt>
                            <dd className="font-semibold break-words">{detail.value}</dd>
                        </div>
                    )}
                </dl>

                <DialogFooter>
                    <MenuItemReviewActions item={item} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
