import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // send refresh cookies automatically
});

// Attach access token to requests
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
    failedQueue = [];
};

// Response interceptor for 401 errors
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        const skipRedirect = originalRequest.headers['x-skip-redirect'];

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Queue the request while refresh is in progress
                return new Promise<string>((resolve, reject) =>
                    failedQueue.push({ resolve, reject })
                )
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                // Call refresh API route; cookie sent automatically
                const refreshRes = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include",
                });

                if (!refreshRes.ok) {
                    setAccessToken(null);
                    processQueue(error, null);

                    // Redirect to login if not skipping redirect
                    if (!skipRedirect) {
                        await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => { });
                        window.location.href = "/login";
                    }

                    return Promise.reject(error);
                }

                const data = await refreshRes.json();
                const newToken = data.token;

                setAccessToken(newToken);
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                setAccessToken(null);
                if (!skipRedirect) {
                    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => { });
                    window.location.href = "/login";
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
