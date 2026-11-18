"use client";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import NavLinks from "@/components/navbar/NavLinks";
import AuthButtons from "@/components/navbar/AuthButtons";
import { navLinks } from "@/lib/navlinks";

export default function MobileMenu({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);

    // a link click doesn't close the sheet by itself, so each link calls this
    const handleClose = () => setOpen(false);

    return (
        <div className={className}>
            <Sheet open={open} onOpenChange={setOpen}>
                {/* menu button: filled circle in the text colour */}
                <SheetTrigger className="flex items-center justify-center size-10 bg-foreground text-background rounded-full">
                    <MenuIcon className="size-5" strokeWidth={2.5} />
                    <span className="sr-only">Open menu</span>
                </SheetTrigger>

                <SheetContent side="left" className="gap-5.5 px-4 py-5.5">
                    {/* logo */}
                    <SheetHeader className="px-2 py-0">
                        <SheetTitle>
                            <Logo />
                        </SheetTitle>
                    </SheetHeader>

                    {/* links */}
                    <NavLinks className="flex flex-col gap-1" links={navLinks} isSheet onLinkClick={handleClose} />

                    {/* auth */}
                    <SheetFooter className="p-0">
                        <AuthButtons className="flex flex-col gap-2" onLinkClick={handleClose} />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
