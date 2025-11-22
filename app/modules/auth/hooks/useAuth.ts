import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { IUserEntity, LoginCredentials, RegisterData } from "@/app/modules/users/types/IUserTypes";
import { setUser, clearUser, startLoading, setError } from "../redux/authSlice";
import { useEffect } from "react";

export const authKeys = {
    all: ["auth"] as const,
    user: () => [...authKeys.all, "user"] as const,
};

export function useUser() {
    const dispatch = useDispatch();

    const query = useQuery<IUserEntity | null>({
        queryKey: authKeys.user(),
        queryFn: async () => {
            dispatch(startLoading());
            const user = await authService.getUser();
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(clearUser());
            }
            return user ?? null;
        },
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(clearUser());
            dispatch(setError(query.error instanceof Error ? query.error.message : "An unknown error occurred"));
        }
    }, [query.error, dispatch]);

    return query;
}

export function useLogin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, LoginCredentials>({
        mutationFn: (data) => authService.login(data),
        onMutate: () => dispatch(startLoading()),
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
            dispatch(setUser(user));
            toast.success("Logged in successfully!");
            router.push("/dashboard");
        },
        onError: (error: any) => {
            dispatch(setError(error.response?.data?.message ?? "Login failed"));
            toast.error(error.response?.data?.message ?? "Login failed");
        },
    });
}

export function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<void, any, void>({
        mutationFn: () => authService.logout(),
        onMutate: () => dispatch(startLoading()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
            dispatch(clearUser());
            toast.success("Logged out");
            router.push("/");
        },
        onError: () => {
            dispatch(setError("Logout failed"));
            toast.error("Logout failed");
        },
    });
}

export function useRegister() {
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<IUserEntity, any, RegisterData>({
        mutationFn: (data) => authService.register(data),
        onMutate: () => dispatch(startLoading()),
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: authKeys.user() });
            dispatch(setUser(user));
            toast.success("Account created!");
            router.push("/");
        },
        onError: (error: any) => {
            dispatch(setError(error.response?.data?.message ?? "Registration failed"));
            toast.error(error.response?.data?.message ?? "Registration failed");
        },
    });
}
