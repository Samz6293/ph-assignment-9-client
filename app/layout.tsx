import type { Metadata } from "next";
import { Archivo, Caprasimo } from "next/font/google";
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
        <html lang="en" className={`${caprasimo.variable} ${archivo.variable} h-full antialiased`}>
            <body className="flex flex-col min-h-full">{children}</body>
        </html>
    );
}
