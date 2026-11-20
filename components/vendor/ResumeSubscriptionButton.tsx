"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { resumeSubscription } from "@/lib/vendor";

// no confirm: keeping Premium only undoes a cancel
export default function ResumeSubscriptionButton() {
    const [resuming, setResuming] = useState(false);
    const router = useRouter();

    const handleResume = async () => {
        setResuming(true);
        const isDone = await resumeSubscription();
        setResuming(false);
        if (isDone) router.refresh();
    };

    return (
        <Button disabled={resuming} onClick={handleResume} className="w-full">
            {resuming ? <><Spinner /> Saving…</> : "Keep Premium"}
        </Button>
    )
}
