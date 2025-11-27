// hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    IUserEntity,
    CreateUserData,
    UpdateUserData,
    UsersQueryParams,
} from "@/app/modules/users/types/IUserTypes";
import { userService } from "@/app/modules/users/services/userService";

/* ============================================
 * QUERY KEYS (CLEAN VERSION)
 * ============================================ */
export const userKeys = {
    all: ["users"] as const,                          // invalidate all
    lists: () => [...userKeys.all, "list"] as const,  // invalidate all lists
    list: (params?: UsersQueryParams) =>
        [...userKeys.lists(), params] as const,          // specific list
    detail: (id: string) =>
        [...userKeys.all, "detail", id] as const,        // single user
};

/* ============================================
 * QUERIES
 * ============================================ */
export function useUsersQuery(params?: UsersQueryParams) {
    const isSearch = !!params?.search && params.search.trim() !== "";

    return useQuery({
        queryKey: isSearch
            ? ["users", "search", params?.search] // search never cached
            : userKeys.list(params),              // cache pagination

        queryFn: () => userService.getUsers(params),
        staleTime: isSearch ? 0 : 5 * 60 * 1000,
        gcTime: isSearch ? 0 : 10 * 60 * 1000,
        retry: 2,
    });
}


export function useUserByIdQuery(userId: string, enabled = true) {
    return useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => userService.getUserById(userId),
        enabled: !!userId && enabled, // userId exist then only fetch
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
}

/* ============================================
 * MUTATIONS
 * ============================================ */

export function useCreateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, Error, CreateUserData>({
        mutationFn: userService.createUser,
        onSuccess: (newUser) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.setQueryData(userKeys.detail(newUser.id), newUser);
        },
    });
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        IUserEntity,
        Error,
        { userId: string; userData: UpdateUserData }
    >({
        mutationFn: ({ userId, userData }) =>
            userService.updateUser(userId, userData),

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(
                userKeys.detail(updatedUser.id),
                updatedUser
            );
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: userService.deleteUser,

        onSuccess: (_, userId) => {
            queryClient.removeQueries({
                queryKey: userKeys.detail(userId),
            });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
}

export function useUpdateAvatarMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        IUserEntity,
        Error,
        { userId: string; file: File }
    >({
        mutationFn: ({ userId, file }) =>
            userService.updateAvatar(userId, file),

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(
                userKeys.detail(updatedUser.id),
                updatedUser
            );
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
}

/* ============================================
 * UTILITIES
 * ============================================ */

export function usePrefetchUsers() {
    const queryClient = useQueryClient();

    return (params?: UsersQueryParams) => {
        queryClient.prefetchQuery({
            queryKey: userKeys.list(params),
            queryFn: () => userService.getUsers(params),
            staleTime: 5 * 60 * 1000,
        });
    };
}

export function useInvalidateUsers() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: userKeys.all });
}
