
export enum Mode {
    EDIT = "edit",
    ADD = "add"
}

export interface OverlayData {
    show: boolean;
    type: string;
    state: any;
    mode: Mode | null;
}

export const createInitialOverlayData = (): OverlayData => ({
    show: false,
    type: "",
    state: null,
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
    REGISTER = "register"
}

export enum DrawerType {
    LOGIN = "login",
    REGISTER = "register"
}

export enum BottomSheetType {
    LOGIN = "login",
    REGISTER = "register"
}
