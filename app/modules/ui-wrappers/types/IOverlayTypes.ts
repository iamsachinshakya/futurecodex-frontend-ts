
export enum Mode {
    EDIT = "edit",
    ADD = "add"
}

export interface OverlayData {
    show: boolean;
    type: string;
    mode: Mode | null;
}

export const createInitialOverlayData = (): OverlayData => ({
    show: false,
    type: "",
    mode: null
});

export interface BottomSheetState {
    bottomSheet: OverlayData;
}

export interface DialogState {
    dialog: OverlayData;
}

export interface DrawerState {
    drawer: OverlayData;
}

export enum DialogType {
    LOGIN = "login",
    REGISTER = "register",
    SUBSCRIBE = "subscribe",

}

export enum DrawerType {
    LOGIN = "login",
    REGISTER = "register"
}

export enum BottomSheetType {
    LOGIN = "login",
    REGISTER = "register",
    SUBSCRIBE = "subscribe",

}
