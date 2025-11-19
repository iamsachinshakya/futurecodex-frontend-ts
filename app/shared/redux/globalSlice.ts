// /app/store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    email: string | null;
}

const initialState: UserState = {
    email: null,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setNewsLatterEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        clearNewsLatterEmail: (state) => {
            state.email = null;
        },
    },
});

export const { setNewsLatterEmail, clearNewsLatterEmail } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
