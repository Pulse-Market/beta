import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Menu from '../../containers/Menu';
import { loadAccount, signIn, signOut } from '../../redux/account/accountActions';
import { setWrappingNearDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';


export default function MenuConnector(): ReactElement {
    const dispatch = useDispatch();
    const history = useHistory();
    const accountInfo = useSelector((store: Reducers) => store.account.account);
    const accountLoading = useSelector((store: Reducers) => store.account.loading);
    const wrappedNear = useSelector((store: Reducers) => store.account.wrappedNearToken);

    useEffect(() => {
        if (!accountInfo) {
            dispatch(loadAccount());
        }
    }, [dispatch, accountInfo]);

    const handleLoginClick = useCallback(() => {
        dispatch(signIn());
    }, [dispatch]);

    const handleLogoutClick = useCallback(() => {
        dispatch(signOut());
    }, [dispatch]);

    const handleProfileClick = useCallback(() => {
        history.push(routePaths.profile());
    }, [history]);

    const handleWrapNearClick = useCallback(() => {
        dispatch(setWrappingNearDialogOpen(true));
    }, [dispatch]);

    return (
        <Menu
            onLoginClick={handleLoginClick}
            onLogoutClick={handleLogoutClick}
            onProfileClick={handleProfileClick}
            onWrapNearClick={handleWrapNearClick}
            account={accountInfo}
            loading={accountLoading}
            wrappedNear={wrappedNear}
        />
    );
}
