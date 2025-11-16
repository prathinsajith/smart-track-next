import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { refresh_token } = await req.json();

    // Set refresh token as HTTP-only cookie
    const res = NextResponse.json({ success: true });

    res.cookies.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
}
