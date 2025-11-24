import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
    withCredentials: true, // Sends HttpOnly cookies (access + refresh)
});

// -----------------------------
// Prevent multiple refresh calls   
// -----------------------------
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) promise.reject(error);
        else promise.resolve(token);
    });
    failedQueue = [];
};

// -----------------------------
// RESPONSE INTERCEPTOR
// -----------------------------
apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<any>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        const errorCode = error.response?.data?.errorCode;

        // -------------------------------------
        // Case 1: Token expired → try refresh
        // -------------------------------------
        if (errorCode === "ACCESS_TOKEN_EXPIRED" && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // Queue requests while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => apiClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                // Hit refresh API
                await apiClient.post("/auth/refresh-token", {}, { withCredentials: true });

                isRefreshing = false;
                processQueue(null);

                // Retry original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                // Optional: redirect to login
                // window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        // -------------------------------------
        // Case 2: Invalid / missing refresh token
        // -------------------------------------
        if (
            errorCode === "REFRESH_TOKEN_MISSING" ||
            errorCode === "REFRESH_TOKEN_MISMATCH" ||
            errorCode === "TOKEN_INVALID"
        ) {
            console.warn("Refresh token invalid. Logging out user.");

            // OPTIONAL: Logout frontend
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
