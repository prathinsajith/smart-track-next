'use client';
import { create } from "zustand";

export interface User {
    id: string;
    username: string;
    email: string | null;
    fullName: string;
    avatar: string | null;
    isOnline: boolean;
    userTypeName: string | null;
    phone: string | null;
}

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,

    setToken: (token): void =>
        set({
            accessToken: token,
            isAuthenticated: !!token,
        }),

    setUser: (user): void =>
        set({
            user,
        }),

    logout: async (): Promise<void> => {
        // Clear auth state immediately
        set({
            accessToken: null,
            user: null,
            isAuthenticated: false,
        });

        try {
            // Call backend logout endpoint to clear refresh token
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Logout error:", err);
            // Continue with logout even if API call fails
        }

        // Redirect to login page
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    },
}));
