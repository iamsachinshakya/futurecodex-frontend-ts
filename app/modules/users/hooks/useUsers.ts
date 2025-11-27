import {
    useMutation,
    useQuery,
    useQueryClient,
    keepPreviousData
} from "@tanstack/react-query";
import {
    IUserEntity,
    CreateUserData,
    UpdateUserData,
    UsersQueryParams,
} from "@/app/modules/users/types/IUserTypes";
import { userService } from "@/app/modules/users/services/userService";

/* ============================================
 * QUERY KEYS (HIERARCHICAL STRUCTURE)
 * ============================================ */
export const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (params?: UsersQueryParams) => {
        // Normalize params to ensure consistent cache keys
        const normalized = params ? {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search?.trim() || undefined,
        } : undefined;

        return [...userKeys.lists(), normalized] as const;
    },
    detail: (id: string) => [...userKeys.all, "detail", id] as const,
};

/* ============================================
 * QUERIES
 * ============================================ */

/**
 * Fetch paginated users with optimized search handling
 * - Uses placeholderData for smooth pagination UX
 * - Optimistic caching for pagination, minimal cache for search
 */
export function useUsersQuery(params?: UsersQueryParams) {
    const hasSearch = !!params?.search?.trim();

    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => userService.getUsers(params),

        // Keep previous page visible while fetching next page
        placeholderData: keepPreviousData,

        // Aggressive caching for pagination, minimal for search
        staleTime: hasSearch ? 30 * 1000 : 5 * 60 * 1000, // 30s search, 5min pagination
        gcTime: hasSearch ? 2 * 60 * 1000 : 10 * 60 * 1000, // 2min search, 10min pagination

        // Retry fewer times for search (faster feedback)
        retry: hasSearch ? 1 : 2,

        // Avoid refetch on window focus for search results
        refetchOnWindowFocus: !hasSearch,
    });
}

/**
 * Fetch single user by ID
 */
export function useUserByIdQuery(userId: string, enabled = true) {
    return useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => userService.getUserById(userId),
        enabled: !!userId && enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
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
            // Update detail cache immediately
            queryClient.setQueryData(userKeys.detail(newUser.id), newUser);

            // Invalidate all list queries (pagination + search)
            queryClient.invalidateQueries({
                queryKey: userKeys.lists(),
                refetchType: 'active', // Only refetch visible queries
            });
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
            // Update detail cache
            queryClient.setQueryData(
                userKeys.detail(updatedUser.id),
                updatedUser
            );

            // Invalidate lists (user might move between pages)
            queryClient.invalidateQueries({
                queryKey: userKeys.lists(),
                refetchType: 'active',
            });
        },
    });
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: userService.deleteUser,

        onSuccess: (_, userId) => {
            // Remove from cache
            queryClient.removeQueries({
                queryKey: userKeys.detail(userId),
            });

            // Invalidate lists
            queryClient.invalidateQueries({
                queryKey: userKeys.lists(),
                refetchType: 'active',
            });
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

            // Only invalidate lists if avatar affects list view
            queryClient.invalidateQueries({
                queryKey: userKeys.lists(),
                refetchType: 'active',
            });
        },
    });
}

/* ============================================
 * UTILITIES
 * ============================================ */

/**
 * Prefetch users for smoother pagination
 */
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

/**
 * Prefetch next/previous pages automatically
 * Call this after successful page load
 */
export function usePrefetchAdjacentPages(
    currentPage: number,
    totalPages: number,
    params?: Omit<UsersQueryParams, 'page'>
) {
    const prefetch = usePrefetchUsers();

    return () => {
        // Prefetch next page
        if (currentPage < totalPages) {
            prefetch({ ...params, page: currentPage + 1 });
        }

        // Prefetch previous page
        if (currentPage > 1) {
            prefetch({ ...params, page: currentPage - 1 });
        }
    };
}

/**
 * Invalidate all user queries
 */
export function useInvalidateUsers() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({
        queryKey: userKeys.all,
        refetchType: 'active',
    });
}

/**
 * Clear search cache (useful when search input is cleared)
 */
export function useClearSearchCache() {
    const queryClient = useQueryClient();

    return () => {
        queryClient.removeQueries({
            queryKey: userKeys.lists(),
            predicate: (query) => {
                const params = query.queryKey[2] as UsersQueryParams | undefined;
                return !!params?.search;
            },
        });
    };
}
