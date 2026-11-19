import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MenuFiltersSection from "@/components/menu/MenuFiltersSection";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuGridSkeleton from "@/components/menu/MenuGridSkeleton";

export default function BrowseMenuPage({ searchParams }: PageProps<"/menu">) {
    return (
        <section className="content-box flex flex-col gap-8 py-10
            md:py-14 lg:py-16">
            <div className="flex flex-col gap-3">
                <h1>Browse the menu</h1>
                <p className="max-w-160 text-base text-muted-foreground leading-relaxed
                    md:text-lg">
                    Pizzas from local kitchens near you. Search by name, or narrow it down by category and area.
                </p>
            </div>

            <Suspense fallback={<Skeleton className="h-12 rounded-full" />}>
                <MenuFiltersSection />
            </Suspense>

            {/* searchParams is passed on unawaited: only the grid waits for it */}
            <Suspense fallback={<MenuGridSkeleton />}>
                <MenuGrid searchParams={searchParams} />
            </Suspense>
        </section>
    )
}
