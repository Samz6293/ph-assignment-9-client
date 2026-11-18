// "use cache": with cacheComponents on, Next.js needs to know new Date() may be read once
// and reused. The year is captured at build time, which is fine for a © line.
export async function getCurrentYear() {
    "use cache";
    return new Date().getFullYear();
}
