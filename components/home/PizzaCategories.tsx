import Link from "next/link";
import { BeefIcon, ChefHatIcon, CupSodaIcon, LeafIcon, PizzaIcon, SaladIcon } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

// names must match lib/menu.ts exactly, or the Browse Menu filter finds nothing
const tiles = [
    { name: "Classic Pizzas", icon: PizzaIcon, tint: "bg-primary-soft text-primary-soft-foreground" },
    { name: "Vegetarian Pizzas", icon: LeafIcon, tint: "bg-success-soft text-success-soft-foreground" },
    { name: "Meat Lovers", icon: BeefIcon, tint: "bg-primary-soft text-primary-soft-foreground" },
    { name: "Specialty / Gourmet Pizzas", icon: ChefHatIcon, tint: "bg-highlight text-premium" },
    { name: "Sides & Appetizers", icon: SaladIcon, tint: "bg-success-soft text-success-soft-foreground" },
    { name: "Beverages & Desserts", icon: CupSodaIcon, tint: "bg-warning text-warning-foreground" },
];

export default function PizzaCategories() {
    return (
        <section id="categories" className="content-box flex flex-col gap-10 pb-16
            md:pb-20 lg:pb-26">
            <SectionHeader overline="Pizza categories" title="What are you in the mood for?" />

            {/* tiles: 2 across on phones, 3 on tablets, all 6 in one row on desktop */}
            <div className="grid grid-cols-2 gap-4
                md:grid-cols-3 md:gap-5 lg:grid-cols-6">
                {tiles.map((tile) =>
                    // encodeURIComponent: "&" and "/" in a name would otherwise break the URL
                    <Link key={tile.name} href={`/menu?category=${encodeURIComponent(tile.name)}`} className="flex flex-col items-center gap-3.5 h-full bg-card border text-center px-3 py-6 rounded-2xl transition-colors
                        hover:border-primary">
                        <span className={`flex items-center justify-center size-13 rounded-full
                            ${tile.tint}`}>
                            <tile.icon className="size-6" strokeWidth={2.5} />
                        </span>
                        <span className="font-bold leading-snug">{tile.name}</span>
                    </Link>
                )}
            </div>
        </section>
    )
}
