// userActions.ts
"use client";

import { toast } from "sonner";
import { useCallback, useMemo } from "react";
import {
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateAvatarMutation,
} from "../hooks/useUsers";

import {
    CreateUserData,
    UpdateUserData,
} from "@/app/modules/users/types/IUserTypes";

/**
 * Custom hook for user-related actions with built-in UI feedback
 * Use this for WRITE operations (create, update, delete)
 * For READ operations, use useUsersQuery directly in components
 */
export function useUserActions() {
    const createUserMutation = useCreateUserMutation();
    const updateUserMutation = useUpdateUserMutation();
    const deleteUserMutation = useDeleteUserMutation();
    const updateAvatarMutation = useUpdateAvatarMutation();

    /* ============================================
     *  WRITE OPERATIONS (with UI feedback)
     * ============================================ */

    /**
     * Create a new user
     * @returns User entity or null on error
     */
    const createUser = useCallback(
        async (userData: CreateUserData) => {
            try {
                const user = await createUserMutation.mutateAsync(userData);
                toast.success("User created successfully!");
                return user;
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.[0]?.message ??
                    "Failed to create user";
                toast.error(msg);
                return null;
            }
        },
        [createUserMutation]
    );

    /**
     * Update an existing user
     * @returns Updated user entity or null on error
     */
    const updateUser = useCallback(
        async (userId: string, userData: UpdateUserData) => {
            try {
                const user = await updateUserMutation.mutateAsync({
                    userId,
                    userData
                });
                toast.success("User updated successfully!");
                return user;
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.[0]?.message ??
                    "Failed to update user";
                toast.error(msg);
                return null;
            }
        },
        [updateUserMutation]
    );

    /**
     * Delete a user
     * @returns true on success, null on error
     */
    const deleteUser = useCallback(
        async (userId: string) => {
            try {
                await deleteUserMutation.mutateAsync(userId);
                toast.success("User deleted successfully!");
                return true;
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.[0]?.message ??
                    "Failed to delete user";
                toast.error(msg);
                return null;
            }
        },
        [deleteUserMutation]
    );

    /**
     * Delete multiple users
     * @returns Object with success/fail counts or null on error
     */
    const bulkDeleteUsers = useCallback(
        async (userIds: string[]) => {
            try {
                const results = await Promise.allSettled(
                    userIds.map((id) => deleteUserMutation.mutateAsync(id))
                );

                const successCount = results.filter(
                    (r) => r.status === "fulfilled"
                ).length;
                const failCount = results.filter(
                    (r) => r.status === "rejected"
                ).length;

                if (successCount > 0) {
                    toast.success(`${successCount} user(s) deleted successfully!`);
                }

                if (failCount > 0) {
                    toast.error(`Failed to delete ${failCount} user(s)`);
                }

                return { successCount, failCount };
            } catch (err: any) {
                toast.error("Bulk delete failed");
                return null;
            }
        },
        [deleteUserMutation]
    );

    /**
     * Update user avatar with validation
     * @returns Updated user entity or null on error
     */
    const updateAvatar = useCallback(
        async (userId: string, file: File) => {
            // Client-side validation
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return null;
            }

            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed");
                return null;
            }

            try {
                const user = await updateAvatarMutation.mutateAsync({
                    userId,
                    file,
                });
                toast.success("Avatar updated successfully!");
                return user;
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ??
                    err.response?.data?.errors?.[0]?.message ??
                    "Failed to update avatar";
                toast.error(msg);
                return null;
            }
        },
        [updateAvatarMutation]
    );

    /* ============================================
     *  RETURN MEMOIZED API
     * ============================================ */
    return useMemo(
        () => ({
            // 🔧 Actions (for mutations with UI feedback)
            createUser,
            updateUser,
            deleteUser,
            bulkDeleteUsers,
            updateAvatar,

            // 📊 Loading states (reactive)
            isCreating: createUserMutation.isPending,
            isUpdating: updateUserMutation.isPending,
            isDeleting: deleteUserMutation.isPending,
            isUploadingAvatar: updateAvatarMutation.isPending,

            // 🔍 Mutation objects (for advanced usage)
            mutations: {
                create: createUserMutation,
                update: updateUserMutation,
                delete: deleteUserMutation,
                avatar: updateAvatarMutation,
            },
        }),
        [
            // Actions
            createUser,
            updateUser,
            deleteUser,
            bulkDeleteUsers,
            updateAvatar,

            // Mutations
            createUserMutation,
            updateUserMutation,
            deleteUserMutation,
            updateAvatarMutation,
        ]
    );
}
