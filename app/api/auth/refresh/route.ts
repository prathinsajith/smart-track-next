import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get("refresh_token")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "No refresh token" }, { status: 401 });
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            const res = NextResponse.json({ error: "Token refresh failed" }, { status: 401 });
            res.cookies.delete("refresh_token");
            return res;
        }

        const data = await response.json();
        const accessToken = data.access_token || data.token;

        const res = NextResponse.json({ token: accessToken });

        // Update refresh token if backend rotates it
        if (data.refresh_token) {
            res.cookies.set("refresh_token", data.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return res;
    } catch (error) {
        console.error("Token refresh error:", error);
        return NextResponse.json({ error: "Token refresh failed" }, { status: 500 });
    }
}
