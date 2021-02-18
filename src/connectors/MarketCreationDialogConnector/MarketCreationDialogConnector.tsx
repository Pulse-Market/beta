import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MarketCreationDialog from '../../containers/MarketCreationDialog';
import { setMarketCreationDialogOpen } from '../../redux/dialogs/dialogs';
import { createNewMarket, loadTokenWhitelist } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { MarketFormValues } from '../../services/MarketService';


export default function MarketCreationDialogConnector(): ReactElement {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((store: Reducers) => store.dialogs.isMarketCreationOpen);
    const tokenWhitelist = useSelector((store: Reducers) => store.market.tokenWhitelist);

    useEffect(() => {
        dispatch(loadTokenWhitelist());
    }, [dispatch]);

    const handleRequestClose = useCallback(() => {
        dispatch(setMarketCreationDialogOpen(false));
    }, [dispatch]);

    const handleSubmit = useCallback((market: MarketFormValues) => {
        dispatch(createNewMarket(market));
    }, [dispatch]);

    return (
        <MarketCreationDialog
            tokenWhitelist={tokenWhitelist}
            open={isDialogOpen}
            onRequestClose={handleRequestClose}
            onSubmit={handleSubmit}
        />
    );
}
