"use client"; // error boundaries must be client components
import { useEffect } from "react";
import { CircleXIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// shown inside the dashboard frame when a page's data fails to load (e.g. the server is down)
export default function DashboardError({ error, retry }: { error: unknown, retry: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center gap-4 bg-card border text-center px-6 py-14 rounded-2xl">
            <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                <CircleXIcon className="size-6" strokeWidth={2.5} />
            </span>
            <p className="text-lg font-bold">Couldn’t load this page</p>
            <p className="max-w-100 text-muted-foreground">The PizzaHub server didn’t answer. Check your connection and try again.</p>
            <Button onClick={() => retry()}>
                <RotateCwIcon data-icon="inline-start" strokeWidth={2.5} />
                Try again
            </Button>
        </div>
    )
}
