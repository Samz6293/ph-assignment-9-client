"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteMenuItem } from "@/lib/admin";
import { MenuItemData } from "@/lib/types";

// Delete, behind a confirm because it can't be undone
export default function DeleteMenuItemButton({ item }: { item: MenuItemData }) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setDeleting(true);
        const isDone = await deleteMenuItem(item);
        setDeleting(false);

        if (!isDone) return;
        setOpen(false);
        // the item leaves the list, which also closes its Review dialog
        router.refresh();
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={<Button variant="outline" />}>
                <Trash2Icon data-icon="inline-start" strokeWidth={2.5} />
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {item.itemName}?</AlertDialogTitle>
                    <AlertDialogDescription>This removes it from PizzaHub for good. It can’t be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" disabled={deleting} onClick={handleDelete}>
                        {deleting ? <><Spinner /> Deleting…</> : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
