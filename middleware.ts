import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Public routes
    const publicPaths = ["/login", "/signup"];

    // Allow public pages
    if (publicPaths.includes(path)) {
        return NextResponse.next();
    }

    // Middleware can only detect cookies available on "/" path
    const refreshToken = request.cookies.get("refresh_token");

    // If no refresh token (user not logged in)
    if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/calendar/:path*",
        "/status/:path*",
        "/settings/:path*",
        "/profile/:path*",
    ],
};
