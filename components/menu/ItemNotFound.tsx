import Link from "next/link";
import { ArrowLeftIcon, SearchXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// a wrong link, a deleted item, or one that isn't approved: same message, inside the page
export default function ItemNotFound() {
    return (
        <div className="flex flex-col items-center gap-4 bg-card border text-center px-6 py-16 rounded-3xl">
            <span className="flex items-center justify-center size-14 bg-primary-soft text-primary-soft-foreground rounded-full">
                <SearchXIcon className="size-6" strokeWidth={2.5} />
            </span>
            <p className="text-lg font-bold">This pizza isn’t on the menu</p>
            <p className="max-w-100 text-muted-foreground">It may have been removed, or the link is wrong. Have a look at what’s cooking instead.</p>
            <Button render={<Link href="/menu" />} nativeButton={false}>
                <ArrowLeftIcon data-icon="inline-start" strokeWidth={2.5} />
                Back to the menu
            </Button>
        </div>
    )
}
