import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Logo from "@/components/shared/Logo";
import SocialLinks from "@/components/footer/SocialLinks";
import { footerLinks } from "@/lib/navlinks";
import { getCurrentYear } from "@/lib/date";

export default async function Footer() {
    const year = await getCurrentYear();

    return (
        <footer className="bg-footer">
            {/* "dark": everything inside uses the dark theme's colours, so the footer stays dark in both themes */}
            <div className="dark content-box flex flex-col gap-12 text-foreground pt-16 pb-7
                md:pt-20 lg:pt-26">
                <div className="flex flex-wrap gap-x-12 gap-y-10">
                    {/* logo + about + socials */}
                    <div className="flex flex-col gap-4.5 grow basis-75 max-w-95">
                        <Logo />
                        <p className="text-md text-muted-foreground leading-relaxed">
                            PizzaHub connects you with the pizzerias in your neighbourhood. Browse their menus, order for a day that suits you and track it from your dashboard.
                        </p>
                        <SocialLinks />
                    </div>

                    {/* explore links */}
                    <div className="flex flex-col gap-3 grow basis-35 text-md">
                        <h4 className="text-overline text-highlight font-bold tracking-widest uppercase">Explore</h4>
                        {footerLinks.map((link) =>
                            <Link key={link.href} href={link.href} className="hover:text-highlight">
                                {link.label}
                            </Link>
                        )}
                    </div>

                    {/* contact */}
                    <div className="flex flex-col gap-3 grow basis-55 text-md">
                        <h4 className="text-overline text-highlight font-bold tracking-widest uppercase">Contact</h4>
                        <a href="mailto:hello@pizzahub.com.bd" className="flex items-center gap-2.5
                            hover:text-highlight">
                            <MailIcon className="size-4.5 text-muted-foreground" strokeWidth={2.5} />
                            hello@pizzahub.com.bd
                        </a>
                        <a href="tel:+8801700123456" className="flex items-center gap-2.5
                            hover:text-highlight">
                            <PhoneIcon className="size-4.5 text-muted-foreground" strokeWidth={2.5} />
                            +880 1700-123456
                        </a>
                        <span className="flex items-center gap-2.5">
                            <MapPinIcon className="size-4.5 text-muted-foreground" strokeWidth={2.5} />
                            Zindabazar, Sylhet 3100
                        </span>
                    </div>
                </div>

                {/* bottom row */}
                <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t text-sm text-muted-foreground pt-5.5">
                    <span>© {year} PizzaHub. All rights reserved.</span>
                    <div className="flex gap-5">
                        <span>Terms</span>
                        <span>Privacy</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
