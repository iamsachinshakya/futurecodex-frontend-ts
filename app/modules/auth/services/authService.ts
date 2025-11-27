import { apiClient } from "@/app/lib/api/client";
import { IChangePassword, IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";

export const authService = {
    // ---------------------------------------------------
    // LOGIN
    // ---------------------------------------------------
    login: async (credentials: LoginCredentials): Promise<IUserEntity> => {
        try {
            const { data } = await apiClient.post("/auth/login", credentials);
            return data.data.user;
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // GET USER
    // ---------------------------------------------------
    getUser: async (): Promise<IUserEntity | null> => {
        try {
            const res = await apiClient.get("/auth/me");
            return res.data.data;
        } catch {
            return null; // user not logged in
        }
    },

    // ---------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------
    logout: async (): Promise<void> => {
        try {
            await apiClient.post("/auth/logout");
        } catch (err) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // REGISTER
    // ---------------------------------------------------
    register: async (newUser: RegisterData): Promise<IUserEntity> => {
        try {
            const { data } = await apiClient.post("/auth/register", newUser);
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // RESET USER PASSWORD (Admin)
    // ---------------------------------------------------
    resetUserPassword: async (userId: string, payload: IChangePassword): Promise<void> => {
        try {
            await apiClient.post(`/auth/${userId}/reset-password`, payload);
        } catch (err: any) {
            throw err;
        }
    },
};
