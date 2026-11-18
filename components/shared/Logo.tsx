import Image from "next/image";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
    const isLarge = size === "lg";

    return (
        <span className="flex items-center gap-2.5">
            {/* mark: dark outline on light theme, light outline on dark theme */}
            <Image src="/pizzahub-mark.svg" alt="" width={80} height={84} className={`w-auto
                ${isLarge ? "h-14" : "h-9"}
                dark:hidden`} />
            <Image src="/pizzahub-mark-dark.svg" alt="" width={80} height={84} className={`hidden w-auto
                ${isLarge ? "h-14" : "h-9"}
                dark:block`} />

            {/* wordmark */}
            <span className={`font-heading leading-none
                ${isLarge ? "text-4xl" : "text-logo"}`}>
                Pizza<span className="text-primary">Hub</span>
            </span>
        </span>
    )
}
