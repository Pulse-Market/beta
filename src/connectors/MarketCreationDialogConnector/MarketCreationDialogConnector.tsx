import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarketCreationDialog from '../../containers/MarketCreationDialog';
import { setMarketCreationDialogOpen } from '../../redux/dialogs/dialogs';
import { createNewMarket, loadPopularTokens, loadTokenWhitelist } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { MarketFormValues } from '../../services/MarketService';


export default function MarketCreationDialogConnector(): ReactElement {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((store: Reducers) => store.dialogs.isMarketCreationOpen);
    const tokenWhitelist = useSelector((store: Reducers) => store.market.tokenWhitelist);
    const submitLoading = useSelector((store: Reducers) => store.market.editLoading);
    const oracleConfig = useSelector((store: Reducers) => store.oracle.oracleConfig);
    const tokens = useSelector((store: Reducers) => store.market.tokenList);

    useEffect(() => {
        dispatch(loadTokenWhitelist());
        dispatch(loadPopularTokens());
    }, [dispatch]);

    const handleRequestClose = useCallback(() => {
        dispatch(setMarketCreationDialogOpen(false));
    }, [dispatch]);

    const handleSubmit = useCallback((market: MarketFormValues) => {
        dispatch(createNewMarket(market));
    }, [dispatch]);

    if (!oracleConfig) {
        return  <></>;
    }

    return (
        <MarketCreationDialog
            tokenWhitelist={tokenWhitelist}
            tokens={tokens}
            open={isDialogOpen}
            onRequestClose={handleRequestClose}
            onSubmit={handleSubmit}
            submitLoading={submitLoading}
            oracleConfig={oracleConfig}
        />
    );
}
