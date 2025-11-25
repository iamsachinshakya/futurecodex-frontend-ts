// authActions.ts
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, clearUser, startLoading, setError } from "../redux/authSlice";

import {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUserQuery,
} from "../hooks/useAuth";

export function useAuthActions() {
    const dispatch = useDispatch();
    const router = useRouter();

    const userQuery = useUserQuery();
    const loginMutation = useLoginMutation();
    const logoutMutation = useLogoutMutation();
    const registerMutation = useRegisterMutation();

    /* ---------------------------------------------------
     *                GET USER (REFRESH)
     * --------------------------------------------------- */
    const getUser = async () => {
        dispatch(startLoading());

        try {
            const response = await userQuery.fetchUser();
            const user = response?.data ?? null;

            if (user) {
                dispatch(setUser(user));
                return user; // ✅ success
            } else {
                dispatch(clearUser());
                return null;
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.message ??
                err.response?.data?.errors?.[0]?.message ??
                "Failed to load user";

            dispatch(setError(msg));
            toast.error(msg);
            return null; // ❌ failure
        }
    };

    /* ---------------------------------------------------
     *                      LOGIN
     * --------------------------------------------------- */
    const login = async (credentials: any) => {
        dispatch(startLoading());

        try {
            const user = await loginMutation.mutateAsync(credentials);

            dispatch(setUser(user));
            toast.success("Logged in!");
            router.push("/");

            return user; // ✅ success
        } catch (err: any) {
            const msg =
                err.response?.data?.message ??
                err.response?.data?.errors?.[0]?.message ??
                "Login failed";

            dispatch(setError(msg));
            toast.error(msg);
            return null; // ❌ failure
        }
    };

    /* ---------------------------------------------------
     *                      LOGOUT
     * --------------------------------------------------- */
    const logout = async () => {
        dispatch(startLoading());

        try {
            await logoutMutation.mutateAsync();

            dispatch(clearUser());
            toast.success("Logged out");
            router.push("/");

            return true; // ✅ success
        } catch (err: any) {
            const msg = "Logout failed";

            dispatch(setError(msg));
            toast.error(msg);
            return null; // ❌ failure
        }
    };

    /* ---------------------------------------------------
     *                    REGISTER
     * --------------------------------------------------- */
    const register = async (form: any) => {
        dispatch(startLoading());

        try {
            const user = await registerMutation.mutateAsync(form);
            toast.success("Account created!");
            router.push("/");


            return user; // ✅ success
        } catch (err: any) {
            const msg =
                err.response?.data?.message ??
                err.response?.data?.errors?.[0]?.message ??
                "Registration failed";

            dispatch(setError(msg));
            toast.error(msg);

            return null; // ❌ failure
        }
    };

    return {
        userQuery,
        getUser,
        login,
        logout,
        register,
    };
}
