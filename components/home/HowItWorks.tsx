import SectionHeader from "@/components/shared/SectionHeader";

// step colours follow the brand: Tomato, Crust, Basil
const steps = [
    {
        number: 1,
        color: "bg-primary text-primary-foreground",
        title: "Browse nearby",
        text: "Search by name, filter by category and area, and sort by price.",
    },
    {
        number: 2,
        color: "bg-highlight text-premium",
        title: "Place your order",
        text: "Choose a delivery date, add your address and any special instructions.",
    },
    {
        number: 3,
        color: "bg-success text-success-foreground",
        title: "Track and enjoy",
        text: "The pizzeria accepts your order and you follow it from your dashboard.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="content-box flex flex-col gap-10 pb-16
            md:pb-20 lg:pb-26">
            <SectionHeader overline="How PizzaHub works" title="Three steps to a hot slice" />

            {/* steps */}
            <div className="grid grid-cols-1 gap-4
                md:grid-cols-2 md:gap-5.5 lg:grid-cols-3 lg:gap-7">
                {steps.map((step) =>
                    <div key={step.number} className="flex flex-col gap-4 border p-7 rounded-2xl">
                        <span className={`flex items-center justify-center size-14 rounded-full font-heading text-2xl
                            ${step.color}`}>
                            {step.number}
                        </span>
                        <h3 className="text-lg font-sans font-bold">{step.title}</h3>
                        <p className="text-md text-muted-foreground leading-relaxed">{step.text}</p>
                    </div>
                )}
            </div>
        </section>
    )
}
