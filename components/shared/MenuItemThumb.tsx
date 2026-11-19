import Image from "next/image";

// small square photo of an item; the tinted background shows while it loads or if the link is broken
export default function MenuItemThumb({ src, className }: { src: string, className?: string }) {
    return (
        <div className={`relative shrink-0 bg-placeholder rounded-xl overflow-hidden ${className}`}>
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
        </div>
    )
}
