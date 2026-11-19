"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// one bar per category (e.g. users per role); used by the overview charts
const chartConfig = {
    count: { label: "Count", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function CountBarChart({ title, data, emptyText }: { title: string, data: { label: string, count: number }[], emptyText: string }) {
    const isEmpty = data.every((item) => item.count === 0);

    return (
        <section className="flex flex-col gap-4 bg-card border p-4.5 rounded-2xl">
            <p className="font-bold">{title}</p>

            {isEmpty ?
                <p className="flex items-center justify-center h-56 text-sm text-muted-foreground text-center">{emptyText}</p>
                :
                // ChartContainer: shadcn's wrapper around Recharts; it turns chartConfig colors into CSS variables (--color-count)
                <ChartContainer config={chartConfig} className="w-full h-56">
                    <BarChart data={data} margin={{ top: 24 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />
                        {/* radius: rounded top corners only; maxBarSize keeps bars thin when there are few */}
                        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} maxBarSize={56}>
                            <LabelList dataKey="count" position="top" className="fill-foreground" fontSize={12} fontWeight={700} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            }
        </section>
    )
}
