import { BadgeCheckIcon, CalendarDaysIcon, ListChecksIcon, StoreIcon } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

// each benefit gets its own tint so the four icons don't blur together
const benefits = [
    {
        icon: BadgeCheckIcon,
        tint: "bg-primary-soft text-primary-soft-foreground",
        title: "Verified local kitchens",
        text: "Every vendor and menu item is reviewed by our team before it goes live.",
    },
    {
        icon: CalendarDaysIcon,
        tint: "bg-warning text-warning-foreground",
        title: "Order for any day",
        text: "Pick a delivery date and address. The pizzeria confirms your order directly.",
    },
    {
        icon: ListChecksIcon,
        tint: "bg-success-soft text-success-soft-foreground",
        title: "Clear order status",
        text: "Follow each order from Pending to Accepted in your dashboard.",
    },
    {
        icon: StoreIcon,
        tint: "bg-secondary text-foreground",
        title: "Fair for small shops",
        text: "Vendors list for free. Premium adds featured spots and a badge.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="content-box pb-16
            md:pb-20 lg:pb-26">
            <div className="flex flex-col gap-10 bg-card px-5.5 py-10 rounded-3xl
                md:px-9 md:py-14 lg:px-11 lg:py-18">
                <SectionHeader overline="Why choose PizzaHub?" title="Built around the pizzeria down the road" />

                {/* benefits */}
                <div className="grid grid-cols-1 gap-4
                    md:grid-cols-2 md:gap-5.5 lg:grid-cols-4 lg:gap-7">
                    {benefits.map((benefit) =>
                        <div key={benefit.title} className="flex flex-col gap-3.5">
                            <span className={`flex items-center justify-center size-13 rounded-full
                                ${benefit.tint}`}>
                                <benefit.icon className="size-6" strokeWidth={2.5} />
                            </span>
                            <h3 className="text-lg font-sans font-bold">{benefit.title}</h3>
                            <p className="text-md text-muted-foreground leading-relaxed">{benefit.text}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
