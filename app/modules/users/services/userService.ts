import { apiClient } from "@/app/lib/api/client";
import { UserPaginatedData } from "@/app/modules/pagination/types/pagination";
import { CreateUserData, IUserEntity, UpdateUserData, UsersQueryParams } from "@/app/modules/users/types/IUserTypes";


export const userService = {
    // ---------------------------------------------------
    // GET ALL USERS (with pagination & filters)
    // ---------------------------------------------------
    // userService.ts
    getUsers: async (params?: UsersQueryParams): Promise<UserPaginatedData> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append("page", params.page.toString());
            if (params?.limit) queryParams.append("limit", params.limit.toString());
            if (params?.search) queryParams.append("search", params.search);
            if (params?.role) queryParams.append("role", params.role);

            const { data } = await apiClient.get(`/users?${queryParams.toString()}`);

            // If already in correct format
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },



    // ---------------------------------------------------
    // GET SINGLE USER BY ID
    // ---------------------------------------------------
    getUserById: async (userId: string): Promise<IUserEntity> => {
        try {
            const { data } = await apiClient.get(`/users/${userId}`);
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------
    createUser: async (userData: CreateUserData): Promise<IUserEntity> => {
        try {
            const { data } = await apiClient.post("/users", userData);
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // UPDATE USER
    // ---------------------------------------------------
    updateUser: async (userId: string, userData: UpdateUserData): Promise<IUserEntity> => {
        try {
            const { data } = await apiClient.patch(`/users/${userId}`, userData);
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // DELETE USER
    // ---------------------------------------------------
    deleteUser: async (userId: string): Promise<void> => {
        try {
            await apiClient.delete(`/users/${userId}`);
        } catch (err: any) {
            throw err;
        }
    },

    // ---------------------------------------------------
    // UPDATE USER AVATAR
    // ---------------------------------------------------
    updateAvatar: async (userId: string, file: File): Promise<IUserEntity> => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const { data } = await apiClient.patch(`/users/${userId}/avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data.data;
        } catch (err: any) {
            throw err;
        }
    },
};
