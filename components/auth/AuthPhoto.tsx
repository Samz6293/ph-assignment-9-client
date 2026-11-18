import Image from "next/image";

// left half of the auth card: photo with a quote, desktop only
export default function AuthPhoto({ quote, sub }: { quote: string, sub: string }) {
    return (
        <div className="relative hidden flex-1 min-h-160 bg-placeholder
            lg:block">
            <Image src="/pizza-prep.jpg" alt="Pizza on a wooden board with peppers, olives and flour" fill sizes="(min-width: 1440px) 650px, 45vw" className="object-cover" />

            {/* quote card */}
            <div className="absolute right-7 bottom-7 left-7 flex flex-col gap-2 bg-card shadow-float px-6 py-5.5 rounded-2xl">
                <p className="font-heading text-logo leading-tight">{quote}</p>
                <span className="text-sm text-muted-foreground">{sub}</span>
            </div>
        </div>
    )
}
