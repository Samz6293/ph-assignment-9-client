"use client";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function ThemeToggle() {
    // next-themes owns the saved theme; the toggler only plays the circle animation
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <AnimatedThemeToggler theme={resolvedTheme === "dark" ? "dark" : "light"} onThemeChange={setTheme}
            className="flex items-center justify-center size-10 bg-card border rounded-full" />
    )
}
