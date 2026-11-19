import type { LucideIcon } from "lucide-react";

// one number on a dashboard overview: label top-left, icon top-right, big value below
export default function StatCard({ label, value, icon: Icon }: { label: string, value: number, icon: LucideIcon }) {
    return (
        <div className="flex flex-col gap-3 bg-card border p-4.5 rounded-2xl">
            {/* phones: icon on its own line above the label (flex-col-reverse puts the 2nd child first); wider: label left, icon right */}
            <div className="flex flex-col-reverse items-start gap-2.5
                md:flex-row md:justify-between">
                <span className="text-sm text-muted-foreground font-semibold">{label}</span>
                <span className="flex items-center justify-center size-9 shrink-0 bg-primary-soft text-primary-soft-foreground rounded-full">
                    <Icon className="size-4.5" strokeWidth={2.5} />
                </span>
            </div>
            <span className="font-heading text-4xl leading-none">{value}</span>
        </div>
    )
}
