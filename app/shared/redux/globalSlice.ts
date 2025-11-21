import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    overlayState: any | null;   // pass any modal/bottom-sheet state
    pincode: string;            // user pincode or location-based
}

const initialState: GlobalState = {
    overlayState: null,
    pincode: "",
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setOverlayState: (state, action: PayloadAction<any>) => {
            state.overlayState = action.payload;
        },

        clearOverlayState: (state) => {
            state.overlayState = null;
        },

        setPincode: (state, action: PayloadAction<string>) => {
            state.pincode = action.payload;
        },
    },
});

// helpers functions
// Selector to get overlay state
export const getOverlayState = (state: { global: GlobalState }) =>
    state.global.overlayState;


export const {
    setOverlayState,
    clearOverlayState,
    setPincode,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
