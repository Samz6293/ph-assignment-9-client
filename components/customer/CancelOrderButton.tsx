"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cancelOrder } from "@/lib/customer";
import { MyOrder } from "@/lib/types";

// "Cancel" on a pending order, with a confirm first since it can't be undone
// delivery comes in already formatted from the server list ("24 Nov 2026")
export default function CancelOrderButton({ order, delivery }: { order: MyOrder, delivery: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        setCancelling(true);
        const isDone = await cancelOrder(order);
        setCancelling(false);

        if (!isDone) return;
        setIsOpen(false);
        // the row shows "cancelled" and its Cancel button goes away
        router.refresh();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger render={<Button size="sm" variant="outline" />}>Cancel</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {order.item?.itemName ?? "This item"} for {delivery}. The shop won’t make it. You can order again later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={cancelling}>Keep order</AlertDialogCancel>
                    <Button variant="destructive" disabled={cancelling} onClick={handleCancel}>
                        {cancelling ? <><Spinner /> Cancelling…</> : "Cancel order"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
