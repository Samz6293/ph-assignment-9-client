import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButtons({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) {
    return (
        <div className={className}>
            {/* render: draws the Button as a Link; nativeButton={false} because the result is an <a>, not a <button> */}
            <Button variant="outline" render={<Link href="/sign-in" />} nativeButton={false} onClick={onLinkClick}>
                Sign In
            </Button>
            <Button render={<Link href="/sign-up" />} nativeButton={false} onClick={onLinkClick}>
                Sign Up
            </Button>
        </div>
    )
}
