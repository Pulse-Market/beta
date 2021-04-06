import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenViewModel } from '../../models/TokenViewModel';

interface NoBalanceDialogProps {
    open: boolean;
    token?: TokenViewModel;
}

export type DialogsState = Readonly<{
    isMarketCreationOpen: boolean;
    isWrappingNearOpen: boolean;
    noBalanceDialog: NoBalanceDialogProps;
}>;

const initialState: DialogsState = {
    isMarketCreationOpen: false,
    isWrappingNearOpen: false,
    noBalanceDialog: {
        open: false,
    },
};

const dialogsSlice = createSlice({
    initialState,
    name: 'dialogs',
    reducers: {
        setMarketCreationDialogOpen(state: DialogsState, action: PayloadAction<boolean>): DialogsState {
            return ({
                ...state,
                isMarketCreationOpen: action.payload,
            });
        },
        setWrappingNearDialogOpen(state: DialogsState, action: PayloadAction<boolean>): DialogsState {
            return({
                ...state,
                isWrappingNearOpen: action.payload,
            });
        },
        setNoBalanceDialog(state: DialogsState, action: PayloadAction<NoBalanceDialogProps>): DialogsState {
            return ({
                ...state,
                noBalanceDialog: action.payload,
            });
        }
    },
});

export const {
    setMarketCreationDialogOpen,
    setWrappingNearDialogOpen,
    setNoBalanceDialog,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
