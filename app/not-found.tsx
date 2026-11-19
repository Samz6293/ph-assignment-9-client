import Image from "next/image";
import Link from "next/link";
import { HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// lives at the root (not in the site group) so it also catches unknown URLs, so it adds the navbar and footer itself
export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="flex-1">
                <section className="content-box flex flex-col items-center gap-5.5 text-center py-16
                    md:py-20 lg:py-26">
                    {/* 4 + mark + 4 */}
                    <div className="flex items-center gap-1.5 text-primary font-heading text-8xl
                        md:text-9xl lg:text-10xl">
                        4
                        <Image src="/pizzahub-mark.svg" alt="" width={80} height={84} className="h-22 w-auto
                            md:h-28 lg:h-34
                            dark:hidden" />
                        <Image src="/pizzahub-mark-dark.svg" alt="" width={80} height={84} className="hidden h-22 w-auto
                            md:h-28 lg:h-34
                            dark:block" />
                        4
                    </div>

                    <h1 className="text-3xl leading-tight
                        md:text-4xl lg:text-5xl">
                        This slice went missing
                    </h1>
                    <p className="max-w-115 text-base text-muted-foreground leading-relaxed
                        md:text-lg">
                        The page you’re looking for doesn’t exist or has moved. Let’s get you back to the menu.
                    </p>

                    {/* actions */}
                    <div className="flex flex-wrap justify-center gap-2.5">
                        <Button size="lg" render={<Link href="/" />} nativeButton={false}>
                            <HouseIcon data-icon="inline-start" strokeWidth={2.5} />
                            Back to home
                        </Button>
                        <Button size="lg" variant="outline" render={<Link href="/menu" />} nativeButton={false}>
                            Browse Menu
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
