// overline → heading → optional lead: the same header on every home section
export default function SectionHeader({ overline, title, lead }: { overline: string, title: string, lead?: string }) {
    return (
        <div className="flex flex-col gap-3 max-w-160">
            <span className="text-overline text-success-soft-foreground font-bold tracking-widest uppercase">{overline}</span>
            <h2>{title}</h2>
            {lead && <p className="text-base text-muted-foreground leading-relaxed
                md:text-lg">{lead}</p>}
        </div>
    )
}
