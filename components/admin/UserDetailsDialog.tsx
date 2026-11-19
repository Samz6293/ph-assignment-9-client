"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/shared/UserAvatar";
import UserStatusTag from "@/components/admin/UserStatusTag";
import BlockUserButton from "@/components/admin/BlockUserButton";
import { UserData } from "@/lib/types";

// "joined" comes in already formatted from the server list
export default function UserDetailsDialog({ user, joined }: { user: UserData, joined: string }) {
    const details = [
        // "vendor" → "Vendor"
        { label: "Role", value: user.role[0].toUpperCase() + user.role.slice(1) },
        { label: "Business name", value: user.businessName },
        { label: "Joined", value: joined },
    ];

    return (
        <Dialog>
            <DialogTrigger render={<Button size="sm" variant="outline" />}>Details</DialogTrigger>

            {/* grid-cols-1: the dialog's single column may shrink, so a long email can't push it off screen */}
            <DialogContent className="grid-cols-1">
                {/* who: name, email, then status underneath; pr-8 keeps the name clear of the close button */}
                <DialogHeader className="flex-row items-center gap-3 pr-8">
                    <UserAvatar name={user.name} image={user.image} className="size-14 shrink-0" textClassName="text-xl" />
                    <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                        <DialogTitle className="max-w-full truncate">{user.name}</DialogTitle>
                        <DialogDescription className="max-w-full truncate">{user.email}</DialogDescription>
                        <UserStatusTag isBlocked={user.isBlocked} />
                    </div>
                </DialogHeader>

                {/* details: label, value on the line below; business name only exists for vendors */}
                <dl className="flex flex-col gap-3 bg-card border text-sm p-4 rounded-2xl">
                    {details.filter((detail) => detail.value).map((detail) =>
                        <div key={detail.label} className="flex flex-col gap-0.5">
                            <dt className="text-muted-foreground">{detail.label}</dt>
                            <dd className="font-semibold wrap-break-word">{detail.value}</dd>
                        </div>
                    )}
                </dl>

                <DialogFooter>
                    {user.role === "admin" ?
                        <p className="text-sm text-muted-foreground">Admins can’t be blocked.</p>
                        :
                        <BlockUserButton user={user} />
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
