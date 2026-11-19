"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BanIcon, CircleCheckIcon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setUserBlocked } from "@/lib/admin";
import { UserData } from "@/lib/types";

// Block / Unblock, with a confirm step so one stray click can't lock someone out
export default function BlockUserButton({ user }: { user: UserData }) {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const isBlocked = !!user.isBlocked;
    const firstName = user.name.split(" ")[0];

    const handleConfirm = async () => {
        setSaving(true);
        const isDone = await setUserBlocked(user, !isBlocked);
        setSaving(false);

        if (!isDone) return;
        setOpen(false);
        // re-runs the server components, so the list and this dialog show the new status
        router.refresh();
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* render: the trigger draws our Button instead of its own plain <button> */}
            <AlertDialogTrigger render={<Button variant={isBlocked ? "outline" : "destructive"} />}>
                {isBlocked ? <CircleCheckIcon data-icon="inline-start" strokeWidth={2.5} /> : <BanIcon data-icon="inline-start" strokeWidth={2.5} />}
                {isBlocked ? "Unblock user" : "Block user"}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{isBlocked ? `Unblock ${user.name}?` : `Block ${user.name}?`}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {isBlocked ?
                            `${firstName} will be able to sign in and use PizzaHub again.`
                            :
                            `${firstName} will be sent to the blocked page and can't use PizzaHub until you unblock them.`
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
                    <Button variant={isBlocked ? "default" : "destructive"} disabled={saving} onClick={handleConfirm}>
                        {saving ?
                            <><Spinner /> {isBlocked ? "Unblocking…" : "Blocking…"}</>
                            :
                            isBlocked ? "Unblock" : "Block"
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
