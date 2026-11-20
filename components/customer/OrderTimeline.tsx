import { MyOrder } from "@/lib/types";

// done: happened; current: waiting on it now; stopped: the order ended here; upcoming: still to come
type StepState = "done" | "current" | "stopped" | "upcoming";

interface Step {
    title: string
    date: string
    state: StepState
}

const dotStyles: Record<StepState, string> = {
    done: "bg-success",
    current: "bg-warning border-2 border-warning-foreground",
    stopped: "bg-primary",
    upcoming: "bg-card border-2",
};

// dates come in already formatted from the server list ("" when unknown)
export default function OrderTimeline({ order, shopName, ordered, answered, delivery }: { order: MyOrder, shopName: string, ordered: string, answered: string, delivery: string }) {
    const answerStep: Step =
        order.status === "pending" ? { title: `Waiting for ${shopName}`, date: "They’ll accept or reject it soon.", state: "current" }
        : order.status === "accepted" ? { title: `Accepted by ${shopName}`, date: answered, state: "done" }
        : order.status === "rejected" ? { title: `Rejected by ${shopName}`, date: answered, state: "stopped" }
        : { title: "You cancelled", date: answered, state: "stopped" };

    const steps: Step[] = [
        { title: "Order placed", date: ordered, state: "done" },
        answerStep,
    ];
    // a rejected or cancelled order never reaches delivery, so that step is only added while it still can
    if (order.status === "pending" || order.status === "accepted") {
        steps.push({ title: "Delivery day", date: delivery, state: "upcoming" });
    }

    return (
        <ol className="flex flex-col">
            {steps.map((step, index) =>
                <li key={step.title} className="flex gap-3">
                    {/* dot, with a line down to the next step (none after the last) */}
                    <div className="flex flex-col items-center">
                        <span className={`shrink-0 size-3.5 mt-1 rounded-full
                            ${dotStyles[step.state]}`} />
                        {index < steps.length - 1 && <span className="flex-1 w-0.5 bg-border my-1" />}
                    </div>
                    <div className="flex flex-col pb-4">
                        <span className={`text-sm font-bold
                            ${step.state === "upcoming" && "text-muted-foreground"}`}>
                            {step.title}
                        </span>
                        {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                    </div>
                </li>
            )}
        </ol>
    )
}
