// useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";

export const authKeys = {
    all: ["auth"] as const,
    user: () => [...authKeys.all, "user"] as const,
};

/* ---------------------- GET USER ------------------------ */
export function useUserQuery() {
    const query = useQuery<IUserEntity | null>({
        queryKey: authKeys.user(),
        queryFn: authService.getUser,
        staleTime: Infinity,
        retry: false,
        enabled: false, // disables auto-fetch
    });

    return {
        ...query,
        fetchUser: query.refetch,
    };
}


/* ---------------------- LOGIN ------------------------ */
export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, LoginCredentials>({
        mutationFn: authService.login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
    });
}

/* ---------------------- LOGOUT ------------------------ */
export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation<void>({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
    });
}

/* ---------------------- REGISTER ------------------------ */
export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, RegisterData>({
        mutationFn: authService.register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
        },
    });
}
