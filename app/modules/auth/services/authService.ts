import { apiClient } from "@/app/lib/api/client";
import { IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";

export const authService = {
    login: async (credentials: LoginCredentials): Promise<IUserEntity> => {
        const { data } = await apiClient.post("/auth/login", credentials);
        return data.data.user;
    },

    getUser: async (): Promise<IUserEntity | null> => {
        try {
            const response = await apiClient.get("/auth/me");
            return response.data.data;
        } catch {
            return null;
        }
    },

    logout: async (): Promise<void> => {
        await apiClient.post("/auth/logout");
    },

    register: async (newUser: RegisterData): Promise<IUserEntity> => {
        const { data } = await apiClient.post("/auth/register", newUser);
        return data.data.user;
    },
};
