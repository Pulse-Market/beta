import { combineReducers } from 'redux';

import pools, { PoolState } from './pools/pools';
import market, { MarketState } from './market/market';
import priceHistory, { PriceHistoryState } from './priceHistory/priceHistory';
import dialogs, { DialogsState } from './dialogs/dialogs';
import account, { AccountState } from './account/account';
import tokens, { TokensState } from './tokens/tokens';

export interface Reducers {
    pools: PoolState;
    market: MarketState;
    priceHistory: PriceHistoryState;
    dialogs: DialogsState;
    tokens: TokensState;
    account: AccountState;
}

export default combineReducers<Reducers>({
    account,
    pools,
    market,
    priceHistory,
    dialogs,
    tokens,
});
