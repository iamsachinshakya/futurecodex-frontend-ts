// app/store/store.ts
import { authReducer } from "@/app/modules/auth/redux/authSlice";
import { bottomSheetReducer } from "@/app/modules/ui-wrappers/redux/bottomSheetSlice";
import { dialogReducer } from "@/app/modules/ui-wrappers/redux/dialogSlice";
import { drawerReducer } from "@/app/modules/ui-wrappers/redux/drawerSlice";
import { globalReducer } from "@/app/shared/redux/globalSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        bottomSheet: bottomSheetReducer,
        dialog: dialogReducer,
        drawer: drawerReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
