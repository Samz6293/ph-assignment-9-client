import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CrownIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewestVendorChip from "@/components/home/NewestVendorChip";

export default function Hero() {
    return (
        <section className="content-box flex flex-col gap-10 pt-7 pb-16 justify-between
            md:gap-12 md:pt-10 md:pb-20 xl:flex-row xl:items-center xl:gap-7 xl:pt-12 xl:pb-26">
            {/* text */}
            <div className="flex flex-col flex-1 gap-6 max-w-160">
                <span className="flex items-center self-start gap-2 bg-success-soft text-success-soft-foreground px-3.5 py-1.75 rounded-full text-sm font-bold">
                    <MapPinIcon className="size-4" strokeWidth={2.5} />
                    Local pizzerias, one hub
                </span>

                <h1>
                    <span className="text-primary">Hot & Fresh</span> Pizza Delivered to Your Door
                </h1>

                <p className="max-w-125 text-base text-muted-foreground leading-relaxed
                    md:text-lg">
                    Discover the pizzerias around you, browse their menus and order for the day you want it, all in a few taps.
                </p>

                {/* full width on phones, natural width from tablet up */}
                <Button size="xl" render={<Link href="/menu" />} nativeButton={false} className="self-stretch shadow-float
                    sm:self-start">
                    Explore Pizza Menu
                    <ArrowRightIcon data-icon="inline-end" className="size-5" strokeWidth={2.5} />
                </Button>
            </div>

            {/* pizza art: centred on phones, right-aligned on tablet and lg, beside the text on xl */}
            <div className="relative shrink-0 self-center size-75
                md:self-end md:size-100 xl:self-center xl:size-130">
                <div className="absolute inset-0 bg-placeholder rounded-full" />
                <div className="absolute inset-1/14">
                    <Image src="/pizza-hero.png" alt="Margherita pizza seen from above, image from pngtree.com" fill preload sizes="(min-width: 1280px) 450px, (min-width: 768px) 345px, 260px" className="object-cover rounded-full" />
                </div>

                {/* newest pizzeria: fetched, so it streams in after the rest of the hero (no placeholder needed) */}
                <Suspense>
                    <NewestVendorChip />
                </Suspense>

                {/* premium chip */}
                <div className="absolute top-1/16 right-0 flex items-center gap-1.5 bg-premium text-highlight px-3.75 py-2.25 rounded-full text-sm font-bold">
                    <CrownIcon className="size-4" strokeWidth={2.5} />
                    Premium vendors
                </div>
            </div>
        </section>
    )
}
