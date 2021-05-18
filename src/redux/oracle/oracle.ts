import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OracleConfig } from '../../models/OracleConfig';

export type OracleState = Readonly<{
    oracleConfig?: OracleConfig;
    error?: string[];
    loading: boolean;
}>;

const initialState: OracleState = {
    loading: false,
};

const oracleSlice = createSlice({
    initialState,
    name: 'pools',
    reducers: {
        setOracleErrors(state: OracleState, action: PayloadAction<string[]>): OracleState {
            return ({
                ...state,
                error: action.payload,
            });
        },
        setOracleLoading(state: OracleState, action: PayloadAction<boolean>): OracleState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setOracleConfig(state: OracleState, action: PayloadAction<OracleConfig>): OracleState {
            return ({
                ...state,
                oracleConfig: action.payload,
            });
        },
    },
});

export const {
    setOracleConfig,
    setOracleLoading,
    setOracleErrors,
} = oracleSlice.actions;

export default oracleSlice.reducer;
