import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StorageManagerDialog from '../../containers/StorageManagerDialog';
import { StorageManagerFormValues } from '../../containers/StorageManagerDialog/services/createDefaultStorageManagerFormValues';
import { setStorageManagerDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';
import { withdrawStorage } from '../../services/NearService';

export default function StorageManagerDialogConnector() {
    const open = useSelector((store: Reducers) => store.dialogs.storageManager.open);
    const account = useSelector((store: Reducers) => store.account.account);
    const dispatch = useDispatch();

    const handleRequestClose = useCallback(() => {
        dispatch(setStorageManagerDialogOpen({
            open: false,
        }));
    }, [dispatch]);

    const handleSumbit = useCallback((formValues: StorageManagerFormValues) => {
        withdrawStorage(formValues.amount);
    }, []);

    if (!account) return null;

    return (
        <StorageManagerDialog
            open={open}
            account={account}
            onRequestClose={handleRequestClose}
            onSubmit={handleSumbit}
        />
    );
}
