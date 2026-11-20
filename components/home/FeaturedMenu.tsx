import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import FeaturedItems from "@/components/home/FeaturedItems";
import MenuGridSkeleton from "@/components/menu/MenuGridSkeleton";

// header shows straight away; only the cards wait for the server
export default function FeaturedMenu() {
    return (
        <section className="content-box flex flex-col gap-10 pb-16
            md:pb-20 lg:pb-26">
            <SectionHeader overline="Featured menu items" title="Fresh from the ovens near you" />

            <Suspense fallback={<MenuGridSkeleton />}>
                <FeaturedItems />
            </Suspense>

            {/* link to the full menu, centred under the cards */}
            <Button variant="outline" render={<Link href="/menu" />} nativeButton={false} className="self-center">
                See full menu
                <ArrowRightIcon data-icon="inline-end" strokeWidth={2.5} />
            </Button>
        </section>
    )
}
