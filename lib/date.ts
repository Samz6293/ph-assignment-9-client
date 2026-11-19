// "use cache": with cacheComponents on, Next.js needs to know new Date() may be read once
// and reused. The year is captured at build time, which is fine for a © line.
export async function getCurrentYear() {
    "use cache";
    return new Date().getFullYear();
}

// "19 Nov 2026"
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
