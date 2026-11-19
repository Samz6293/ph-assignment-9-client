"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// the "Delete X?" confirm; the parent decides what opens it (a button, a menu item)
// onDelete: the admin or vendor action that does the deleting and shows the toast
export default function DeleteMenuItemDialog({ open, onOpenChange, itemName, onDelete }: { open: boolean, onOpenChange: (open: boolean) => void, itemName: string, onDelete: () => Promise<boolean> }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setDeleting(true);
        const isDone = await onDelete();
        setDeleting(false);

        if (!isDone) return;
        onOpenChange(false);
        // the item leaves the list (and any dialog it was opened from closes with it)
        router.refresh();
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
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
