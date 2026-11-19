import SidebarContent from "@/components/dashboard/SidebarContent";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

// dashboard frame: fixed sidebar on desktop, top bar + page on the right
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
    return (
        <div className="flex flex-1">
            {/* sticky + full height: the sidebar stays put while the page scrolls */}
            <aside className="sticky top-0 hidden w-67 h-screen shrink-0 bg-card border-r overflow-y-auto
                lg:block">
                <SidebarContent />
            </aside>

            <div className="flex flex-col flex-1 min-w-0">
                <DashboardTopbar />
                <main className="flex-1 p-4
                    md:p-7 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
