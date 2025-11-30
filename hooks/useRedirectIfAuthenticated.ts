"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Custom hook to redirect logged-in users away from login/signup pages.
 */
export const useRedirectIfAuthenticated = () => {
    const router = useRouter();
    const { setToken, setUser, accessToken } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            // If accessToken already exists in store, redirect immediately
            if (accessToken) {
                router.replace("/dashboard");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include", // send refresh token cookie
                });

                if (res.ok) {
                    const data = await res.json();

                    if (data?.token) {
                        setToken(data.token);

                        // Optionally fetch user info after refresh
                        const userRes = await fetch("/api/user/me", {
                            headers: { Authorization: `Bearer ${data.token}` },
                        });
                        if (userRes.ok) {
                            const userData = await userRes.json();
                            setUser(userData?.user);
                        }

                        router.replace("/dashboard");
                    }
                }
            } catch (err) {
                console.log("No valid session. User stays on login page.");
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [router, accessToken, setToken, setUser]);

    return loading;
};
