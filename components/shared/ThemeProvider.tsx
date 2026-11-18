"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// wraps next-themes so the root layout (a server component) can use it
export default function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
