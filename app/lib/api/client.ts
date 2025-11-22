import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
    withCredentials: true,  // <-- send HttpOnly cookies automatically
});
