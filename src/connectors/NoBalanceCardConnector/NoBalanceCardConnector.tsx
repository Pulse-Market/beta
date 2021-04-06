import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WRAPPED_NEAR_ACCOUNT_ID } from '../../config';
import NoWrappedNearCard from '../../containers/NoBalanceCard';
import { setWrappingNearDialogOpen, setNoBalanceDialog } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function NoWrappedNearCardConnector() {
    const dispatch = useDispatch();
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const account = useSelector((store: Reducers) => store.account.account);

    const handleOpenDialogClick = useCallback(() => {
        if (market?.collateralTokenId === WRAPPED_NEAR_ACCOUNT_ID) {
            dispatch(setWrappingNearDialogOpen(true));
        } else {
            dispatch(setNoBalanceDialog({
                open: true,
                token: market?.collateralToken,
            }));
        }
    }, [dispatch, market]);

    if (!market) return null;

    return (
        <NoWrappedNearCard
            market={market}
            account={account}
            onDialogOpenClick={handleOpenDialogClick}
        />
    );
}
