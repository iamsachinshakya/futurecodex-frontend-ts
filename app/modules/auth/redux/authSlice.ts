import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserEntity } from "@/app/modules/users/types/IUserTypes";
import { RootState } from "@/app/store/store";

interface AuthState {
    user: IUserEntity | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setUser(state, action: PayloadAction<IUserEntity>) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { startLoading, setUser, clearUser, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;
