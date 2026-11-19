import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDashboardLink } from "@/lib/navlinks";

// the real permission checks happen again on the Express server; this only keeps people on the right pages
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({ headers: request.headers });
    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

    // signed out: auth pages are fine, everything else goes to Sign In and remembers where they were heading
    if (!session) {
        if (isAuthPage) return NextResponse.next();

        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signInUrl);
    }

    const { role, isBlocked } = session.user;
    const dashboardLink = getDashboardLink(role);

    // blocked: only the blocked page; not blocked: no reason to see it
    if (isBlocked) {
        if (pathname === "/blocked") return NextResponse.next();
        return NextResponse.redirect(new URL("/blocked", request.url));
    }
    if (pathname === "/blocked") return NextResponse.redirect(new URL("/", request.url));

    // already signed in: skip Sign In / Sign Up
    if (isAuthPage) return NextResponse.redirect(new URL(dashboardLink, request.url));

    // another role's dashboard (or plain /dashboard): go to your own
    if (pathname.startsWith("/dashboard") && !pathname.startsWith(dashboardLink)) {
        return NextResponse.redirect(new URL(dashboardLink, request.url));
    }

    return NextResponse.next();
}

// only these paths run the proxy; /menu/:id is Item Details (Browse Menu at /menu stays public)
export const config = {
    matcher: ["/dashboard/:path*", "/menu/:id", "/sign-in", "/sign-up", "/blocked"],
};
