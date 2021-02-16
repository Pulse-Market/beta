import { setAccount, setAccountBalances, setAccountLoading, setAccountPoolTokenLoading, setAccountPoolTokens, setNearToken, setWrappedNearToken } from "./account";
import { signUserIn, getAccountInfo, signUserOut, getAccountBalancesInfo } from '../../services/AccountService';
import { getNearToken, getWrappedNearToken } from "../../services/NearService";

export function signIn() {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountLoading(true));
            await signUserIn();
            dispatch(setAccountLoading(false));
        } catch (error) {
            dispatch(setAccountLoading(false));
            console.error('[signIn]', error);
        }
    }
}

export function getAccount() {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountLoading(true));
            const account = await getAccountInfo();
            dispatch(setAccount(account));
            dispatch(setAccountLoading(false));
        } catch (error) {
            dispatch(setAccountLoading(false));
            console.error('[getAccount]', error);
        }
    }
}

export function loadNearBalances() {
    return async (dispatch: Function) => {
        const nearTokenRequest = getNearToken();
        const wrappedNeartokenRequest = getWrappedNearToken();

        const nearToken = await nearTokenRequest;
        const wrappedNearToken = await wrappedNeartokenRequest;

        dispatch(setNearToken(nearToken));
        dispatch(setWrappedNearToken(wrappedNearToken));
    }
}

export function loadAccountBalanceInfo(accountId: string) {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountPoolTokenLoading(true));
            const accountBalancesInfo = await getAccountBalancesInfo(accountId);
            dispatch(setAccountPoolTokens(accountBalancesInfo.poolTokens));
            dispatch(setAccountBalances(accountBalancesInfo.marketBalances));
            dispatch(setAccountPoolTokenLoading(false));
        } catch (error) {
            dispatch(setAccountPoolTokenLoading(false));
            console.error('[getPoolTokensForAccount]', error);
        }
    }
}

export function signOut() {
    return async (dispatch: Function) => {
        await signUserOut();
        dispatch(setAccount(null));
    }
}
