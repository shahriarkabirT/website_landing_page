import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Check for access token cookie
    const token = request.cookies.get("accessToken")?.value

    // Define protected paths
    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
    const isAdmin = request.nextUrl.pathname.startsWith("/admin")

    if ((isDashboard || isAdmin) && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Role based protection could go here if we could decode the token,
    // but for now we rely on API security and Client Components to handle role mismatch
    // (e.g. User trying to access /admin will be kicked out by page/layout logic)

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
}
