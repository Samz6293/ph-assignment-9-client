import type { Metadata } from "next";
import { BanIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Account blocked | PizzaHub",
};

// proxy.ts sends blocked users here from every private page
export default function BlockedPage() {
    return (
        <section className="content-box flex flex-col items-center gap-5.5 text-center py-16
            md:py-20 lg:py-26">
            {/* icon in a tinted circle */}
            <span className="flex items-center justify-center size-20 bg-primary-soft text-primary-soft-foreground rounded-full">
                <BanIcon className="size-9" strokeWidth={2.5} />
            </span>

            <h1 className="text-3xl leading-tight
                md:text-4xl lg:text-5xl">
                Your account is blocked
            </h1>
            <p className="max-w-115 text-base text-muted-foreground leading-relaxed
                md:text-lg">
                You can’t use your dashboard or place orders right now. Contact support and we’ll look into it.
            </p>

            <Button size="lg" render={<a href="mailto:hello@pizzahub.com.bd" />} nativeButton={false}>
                <MailIcon data-icon="inline-start" strokeWidth={2.5} />
                Contact support
            </Button>
        </section>
    )
}
