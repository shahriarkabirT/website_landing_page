import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Check for access token cookie
    const token = request.cookies.get("accessToken")?.value

    // Define protected paths
    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
    const isAdmin = request.nextUrl.pathname.startsWith("/admin")

    if ((isDashboard || isAdmin) && !token) {
        const url = new URL("/login", request.url)
        url.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
}
