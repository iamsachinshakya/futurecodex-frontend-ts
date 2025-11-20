
export enum Mode {
    EDIT = "edit",
    ADD = "add"
}

export interface OverlayData {
    show: boolean;
    type: string;
    state: any;
    mode: Mode;
}

export const createInitialOverlayData = (): OverlayData => ({
    show: false,
    type: "",
    state: null,
    mode: Mode.EDIT
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
