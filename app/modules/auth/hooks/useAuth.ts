import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/app/modules/auth/services/authService";
import { IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";

export const authKeys = {
    all: ["auth"] as const,
    session: () => [...authKeys.all, "session"] as const,
    user: () => [...authKeys.all, "user"] as const,
};

// Fetch current user/session
export function useUser() {
    return useQuery<IUserEntity | null>({
        queryKey: authKeys.user(),
        queryFn: () => authService.getUser(),
        staleTime: Infinity,
    });
}

// Login mutation
export function useLogin(): UseMutationResult<IUserEntity, any, LoginCredentials, unknown> {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, LoginCredentials>({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (user) => {
            queryClient.setQueryData(authKeys.user(), user);
            toast.success("Logged in successfully!");
            router.push("/dashboard");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Login failed");
        },
    });
}

// Logout mutation
export function useLogout(): UseMutationResult<void, any, void, unknown> {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<void, any, void>({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.setQueryData(authKeys.user(), null);
            toast.success("Logged out");
            router.push("/");
        },
        onError: () => {
            toast.error("Logout failed");
        },
    });
}

// Register mutation
export function useRegister(): UseMutationResult<IUserEntity, any, RegisterData, unknown> {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, RegisterData>({
        mutationFn: (data) => authService.register(data),
        onSuccess: (user) => {
            queryClient.setQueryData(authKeys.user(), user);
            toast.success("Account created!");
            router.push("/");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Registration failed");
        },
    });
}
