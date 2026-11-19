"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, XIcon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DeleteMenuItemButton from "@/components/admin/DeleteMenuItemButton";
import { setMenuItemStatus } from "@/lib/admin";
import { MenuItemData } from "@/lib/types";

// Delete on the left; Approve (right away) and Reject (asks first) on the right
export default function MenuItemReviewActions({ item }: { item: MenuItemData }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [saving, setSaving] = useState<"approved" | "rejected" | null>(null);
    const router = useRouter();

    const handleStatus = async (status: "approved" | "rejected") => {
        setSaving(status);
        const isDone = await setMenuItemStatus(item, status);
        setSaving(null);

        if (!isDone) return;
        setIsConfirmOpen(false);
        // re-runs the server components, so the list and this dialog show the new status
        router.refresh();
    };

    return (
        <div className="flex flex-col-reverse gap-2 w-full
            sm:flex-row sm:items-center sm:justify-between">
            <DeleteMenuItemButton item={item} />

            {/* the vendor turned it off; the server refuses approve/reject, so only a note */}
            {item.status === "inactive" ?
                <p className="text-sm text-muted-foreground">The vendor has made this item unavailable.</p>
                :
                <div className="flex flex-col-reverse gap-2
                    sm:flex-row">
                    {item.status !== "rejected" &&
                        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                            <AlertDialogTrigger render={<Button variant="destructive" disabled={!!saving} />}>
                                <XIcon data-icon="inline-start" strokeWidth={2.5} />
                                Reject
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reject {item.itemName}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {item.status === "approved" ?
                                            "It will come off the public menu straight away. You can approve it again later."
                                            :
                                            "Customers will never see it. You can still approve it later."
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={!!saving}>Cancel</AlertDialogCancel>
                                    <Button variant="destructive" disabled={!!saving} onClick={() => handleStatus("rejected")}>
                                        {saving === "rejected" ? <><Spinner /> Rejecting…</> : "Reject"}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    }

                    {item.status !== "approved" &&
                        <Button variant="success" disabled={!!saving} onClick={() => handleStatus("approved")}>
                            {saving === "approved" ? <Spinner /> : <CheckIcon data-icon="inline-start" strokeWidth={2.5} />}
                            {saving === "approved" ? "Approving…" : "Approve"}
                        </Button>
                    }
                </div>
            }
        </div>
    )
}
