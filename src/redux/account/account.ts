import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/Account';
import { PoolToken } from '../../models/PoolToken';

export type AccountState = Readonly<{
    account: Account | null;
    loading: boolean;
    poolTokens: PoolToken[];
    poolTokenLoading: boolean;
    errors: string[];
}>;

const initialState: AccountState = {
    account: null,
    loading: false,
    poolTokenLoading: false,
    poolTokens: [],
    errors: [],
};

const accountSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {
        setAccount(state: AccountState, action: PayloadAction<Account | null>): AccountState {
            return ({
                ...state,
                account: action.payload,
            });
        },
        setAccountPoolTokens(state: AccountState, action: PayloadAction<PoolToken[]>): AccountState {
            return ({
                ...state,
                poolTokens: action.payload,
            });
        },
        setAccountLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setAccountPoolTokenLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                poolTokenLoading: action.payload,
            });
        },
        setAccountErrors(state: AccountState, action: PayloadAction<string[]>): AccountState {
            return ({
                ...state,
                errors: action.payload,
            });
        },
    },
});

export const {
    setAccount,
    setAccountErrors,
    setAccountLoading,
    setAccountPoolTokenLoading,
    setAccountPoolTokens,
} = accountSlice.actions;

export default accountSlice.reducer;
