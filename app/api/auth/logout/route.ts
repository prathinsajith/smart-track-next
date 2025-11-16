import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Try to call backend logout endpoint if available
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (apiUrl) {
            try {
                await fetch(`${apiUrl}/logout`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (backendError) {
                // Backend logout failed, but continue with cookie cleanup
                console.warn("Backend logout failed:", backendError);
            }
        }

        // Clear refresh token cookie regardless of backend response
        const response = NextResponse.json({ success: true });

        response.cookies.delete("refresh_token");

        return response;
    } catch (error) {
        console.error("Logout error:", error);

        // Even if there's an error, still try to clear the cookie
        const response = NextResponse.json({ error: "Logout failed" }, { status: 500 });
        response.cookies.delete("refresh_token");

        return response;
    }
}

