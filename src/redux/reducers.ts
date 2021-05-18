import { combineReducers } from 'redux';

import oracle, { OracleState } from './oracle/oracle';
import market, { MarketState } from './market/market';
import priceHistory, { PriceHistoryState } from './priceHistory/priceHistory';
import dialogs, { DialogsState } from './dialogs/dialogs';
import account, { AccountState } from './account/account';

export interface Reducers {
    oracle: OracleState;
    market: MarketState;
    priceHistory: PriceHistoryState;
    dialogs: DialogsState;
    account: AccountState;
}

export default combineReducers<Reducers>({
    account,
    oracle,
    market,
    priceHistory,
    dialogs,
});
