"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { api } from "@/lib/axios";

/**
 * Initialize Authentication Hook
 * Attempts to refresh the access token on app mount
 * Runs once when the component mounts
 */
export const useInitializeAuth = (): void => {
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);

    useEffect(() => {
        const init = async (): Promise<void> => {
            try {
                const refreshRes = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include",
                });

                if (!refreshRes.ok) {
                    // No valid session - user needs to login
                    return;
                }

                const { token } = await refreshRes.json();
                setToken(token);

                const userRes = await api.get("/api/user/me");
                setUser(userRes.data?.user);
            } catch (err) {
                // Silent failure is expected for logged-out users
                console.error("Auth init failed:", err);
            }
        };

        init();

        // Zustand setters are stable references, so deps array can be empty
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
