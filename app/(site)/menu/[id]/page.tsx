import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import ItemDetails from "@/components/menu/ItemDetails";
import ItemDetailsSkeleton from "@/components/menu/ItemDetailsSkeleton";

export default function ItemDetailsPage({ params }: PageProps<"/menu/[id]">) {
    return (
        <section className="content-box flex flex-col gap-6 py-8
            md:py-12 lg:py-14">
            <Link href="/menu" className="flex items-center gap-1.5 self-start text-sm text-muted-foreground font-semibold
                hover:text-foreground">
                <ArrowLeftIcon className="size-4" strokeWidth={2.5} />
                Back to the menu
            </Link>

            {/* params is passed on unawaited: only the details wait for it */}
            <Suspense fallback={<ItemDetailsSkeleton />}>
                <ItemDetails params={params} />
            </Suspense>
        </section>
    )
}
