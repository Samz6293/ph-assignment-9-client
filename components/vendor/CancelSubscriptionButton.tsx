"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cancelSubscription } from "@/lib/vendor";

// endsOn comes in already formatted from the server component ("20 Dec 2026")
export default function CancelSubscriptionButton({ endsOn }: { endsOn: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        setCancelling(true);
        const isDone = await cancelSubscription(endsOn);
        setCancelling(false);

        if (!isDone) return;
        setIsOpen(false);
        // the card switches to "won't renew" with a Keep Premium button
        router.refresh();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger render={<Button variant="outline" className="w-full" />}>Cancel subscription</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Premium?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You keep Premium until {endsOn}, then you move to Free. Your items stay on the menu, but on Free you can’t have more than 3 active items.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={cancelling}>Keep Premium</AlertDialogCancel>
                    <Button variant="destructive" disabled={cancelling} onClick={handleCancel}>
                        {cancelling ? <><Spinner /> Cancelling…</> : "Cancel subscription"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
