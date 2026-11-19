"use client"; // error boundaries must be client components
import { useEffect } from "react";
import Link from "next/link";
import { CircleXIcon, HouseIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// error is "unknown": a client component can throw anything, not only an Error
export default function Error({ error, retry }: { error: unknown, retry: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="content-box flex flex-col items-center gap-5.5 text-center py-16
            md:py-20 lg:py-26">
            {/* icon in a tinted circle */}
            <span className="flex items-center justify-center size-20 bg-primary-soft text-primary-soft-foreground rounded-full">
                <CircleXIcon className="size-9" strokeWidth={2.5} />
            </span>

            <h1 className="text-3xl leading-tight
                md:text-4xl lg:text-5xl">
                Something went wrong
            </h1>
            <p className="max-w-115 text-base text-muted-foreground leading-relaxed
                md:text-lg">
                We couldn’t load this page. Try again, or head back home and pick up from there.
            </p>

            {/* actions: retry re-fetches and re-renders the page that failed */}
            <div className="flex flex-wrap justify-center gap-2.5">
                <Button size="lg" onClick={() => retry()}>
                    <RotateCwIcon data-icon="inline-start" strokeWidth={2.5} />
                    Try again
                </Button>
                <Button size="lg" variant="outline" render={<Link href="/" />} nativeButton={false}>
                    <HouseIcon data-icon="inline-start" strokeWidth={2.5} />
                    Back to home
                </Button>
            </div>
        </section>
    )
}
