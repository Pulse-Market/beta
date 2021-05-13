import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../containers/HomeHeader';
import { setMarketCreationDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function HomeHeaderConnector(): ReactElement {
    const dispatch = useDispatch();
    const account = useSelector((store: Reducers) => store.account.account);
    const unrealizedPnl = useSelector((store: Reducers) => store.account.unrealizedPnl);

    const handleCreateMarketClick = useCallback(() => {
        dispatch(setMarketCreationDialogOpen(true));
    }, [dispatch]);

    return (
        <HomeHeader
            onCreateMarketClick={handleCreateMarketClick}
            account={account}
            unrealizedPnl={unrealizedPnl}
        />
    );
}
