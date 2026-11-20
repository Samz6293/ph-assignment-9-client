"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { answerOrder } from "@/lib/vendor";
import { VendorOrder } from "@/lib/types";

// Accept straight away; Reject asks first, since the customer can't undo it
export default function AnswerOrderButtons({ order }: { order: VendorOrder }) {
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [accepting, setAccepting] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const router = useRouter();

    const handleAccept = async () => {
        setAccepting(true);
        const isDone = await answerOrder(order, "accepted");
        setAccepting(false);
        // the status tag updates and these buttons go away
        if (isDone) router.refresh();
    };

    const handleReject = async () => {
        setRejecting(true);
        const isDone = await answerOrder(order, "rejected");
        setRejecting(false);

        if (!isDone) return;
        setIsRejectOpen(false);
        router.refresh();
    };

    return (
        <>
            <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                <AlertDialogTrigger render={<Button variant="outline" disabled={accepting} />}>Reject</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reject this order?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {order.customer?.name ?? "The customer"} will see that you can’t take it. This can’t be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={rejecting}>Keep it</AlertDialogCancel>
                        <Button variant="destructive" disabled={rejecting} onClick={handleReject}>
                            {rejecting ? <><Spinner /> Rejecting…</> : "Reject order"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Button variant="success" disabled={accepting} onClick={handleAccept}>
                {accepting ? <><Spinner /> Accepting…</> : "Accept"}
            </Button>
        </>
    )
}
