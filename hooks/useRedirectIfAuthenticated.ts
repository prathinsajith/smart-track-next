"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/lib/auth";

/**
 * Custom hook to check if the user is already authenticated.
 * - If authenticated, redirects to /dashboard.
 * - Returns a `loading` state while checking.
 */
export const useRedirectIfAuthenticated = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include", // send HTTP-only cookie
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data?.token) {
                        setAccessToken(data.token); // store access token in memory
                        router.replace("/dashboard"); // redirect logged-in user
                    }
                } else if (res.status === 401) {
                    // Normal: no valid refresh token, stay on login page
                } else {
                    console.error(`Unexpected response from refresh: ${res.status}`);
                }
            } catch (err) {
                console.error("Network or server error while refreshing token:", err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);

    return loading;
};
