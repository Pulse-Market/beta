import { getAccountInfo, getPoolBalanceForMarketByAccount } from "../../services/AccountService";
import { createMarket, getMarketById, getMarketOutcomeTokens, getMarkets, getResolutingMarkets, MarketFilters, MarketFormValues } from "../../services/MarketService";
import { seedPool, exitPool, SeedPoolFormValues } from "../../services/PoolService";
import { appendMarkets, setMarketErrors, setMarketLoading, setMarketDetail, setMarkets, setResolutingMarkets, setMarketEditLoading, setMarketPoolTokenBalance, setMarketDetailTokens } from "./market";

export function createNewMarket(values: MarketFormValues) {
    return async (dispatch: Function) => {
        try {
            dispatch(setMarketEditLoading(true));

            await createMarket(values);

            dispatch(setMarketEditLoading(false));
        } catch (error) {
            dispatch(setMarketEditLoading(false));
            console.error('[createNewMarket]', error);
        }
    };
}

export function loadMarket(id: string) {
    return async (dispatch: Function) => {
        try {
            dispatch(setMarketLoading(true));
            dispatch(setMarketDetail(undefined));
            dispatch(setMarketPoolTokenBalance(undefined));

            const market = await getMarketById(id);

            if (!market) {
                dispatch(setMarketErrors(['Could not find market']));
                return;
            }

            const account = await getAccountInfo();

            if (account) {
                const token = await getPoolBalanceForMarketByAccount(account.accountId, id);

                if (token) {
                    dispatch(setMarketPoolTokenBalance(token));
                }
            }

            dispatch(setMarketDetail(market));
            dispatch(setMarketLoading(false));
        } catch (error) {
            dispatch(setMarketLoading(false));
            console.error('[loadMarket]', error);
        }
    };
}

export function reloadTokens(marketId: string) {
    return async (dispatch: Function) => {
        const tokens = await getMarketOutcomeTokens(marketId);
        if (tokens.length === 0) return;

        dispatch(setMarketDetailTokens(tokens));
    }
}

export function fetchMarkets(filters: MarketFilters, append?: boolean) {
    return async (dispatch: Function) => {
        try {
            dispatch(setMarketLoading(true));
            const markets = await getMarkets({
                ...filters,
                expired: false,
            });

            if (append) {
                dispatch(appendMarkets(markets));
            } else {
                dispatch(setMarkets(markets));
            }

            dispatch(setMarketLoading(false));
        } catch (error) {
            dispatch(setMarketLoading(false));
            console.error('[fetchMarkets]', error);
        }
    }
}

export function fetchResolutingMarkets() {
    return async (dispatch: Function) => {
        try {
            dispatch(setMarketLoading(true));

            const markets = await getResolutingMarkets();

            dispatch(setResolutingMarkets(markets));
            dispatch(setMarketLoading(false));
        } catch (error) {
            dispatch(setMarketLoading(false));
            console.error('[fetchMarkets]', error);
        }
    }
}

export function seedPoolAction(marketId: string, tokenId: string, values: SeedPoolFormValues) {
    return async (dispatch: Function) => {
        await seedPool(marketId, tokenId, values);
    }
}

export function exitPoolAction(marketId: string, amountIn: string) {
    return async (dispatch: Function) => {
        await exitPool(marketId, amountIn);
    }
}
