// status pill: red when blocked, green when active
export default function UserStatusTag({ isBlocked }: { isBlocked?: boolean }) {
    return (
        <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full
            ${isBlocked ? "bg-primary-soft text-primary-soft-foreground" : "bg-success-soft text-success-soft-foreground"}`}>
            {isBlocked ? "Blocked" : "Active"}
        </span>
    )
}
