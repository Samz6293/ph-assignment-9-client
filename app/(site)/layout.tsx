import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// public pages: navbar on top, footer at the bottom
export default function SiteLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    )
}
