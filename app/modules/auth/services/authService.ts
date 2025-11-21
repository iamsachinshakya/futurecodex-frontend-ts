import { apiClient } from "@/app/lib/api/client";
import { IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";


export const authService = {
    // Login
    login: async (credentials: LoginCredentials): Promise<IUserEntity> => {
        const { data } = await apiClient.post("/auth/login", credentials);
        return data;
    },

    // Logout (can be GET or POST depending on backend)
    logout: async (): Promise<void> => {
        await apiClient.post("/auth/logout");
    },

    // Register new user
    register: async (newUser: RegisterData): Promise<IUserEntity> => {
        const { data } = await apiClient.post("/auth/register", newUser);
        return data;
    },

    // Get current user/session
    getUser: async (): Promise<IUserEntity | null> => {
        try {
            const { data } = await apiClient.get("/auth/profile");
            return data;
        } catch (error) {
            return null; // if unauthorized or error, return null
        }
    },

    // Optionally add password reset, email verification, etc.
    // resetPassword: async (...args) => { ... }
};
