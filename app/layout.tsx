import type { Metadata } from "next";
import { Archivo, Caprasimo } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/components/shared/ThemeProvider";
import "./globals.css";

// headings, prices and big numbers
const caprasimo = Caprasimo({
    variable: "--font-caprasimo",
    weight: "400",
    subsets: ["latin"],
});

// everything you read or tap
const archivo = Archivo({
    variable: "--font-archivo",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PizzaHub",
    description: "Where the local slices meet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        // suppressHydrationWarning: next-themes adds the "dark" class before React loads, so the server HTML differs on purpose
        <html lang="en" className={`${caprasimo.variable} ${archivo.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="flex flex-col min-h-full">
                <ThemeProvider attribute="class" defaultTheme="light">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
