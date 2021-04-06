import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoBalanceDialog from '../../containers/NoBalanceDialog';
import { setNoBalanceDialog } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function NoBalanceDialogconnector() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((store: Reducers) => store.dialogs.noBalanceDialog.open);
    const token = useSelector((store: Reducers) => store.dialogs.noBalanceDialog.token);

    function handleRequestDialogClose() {
        dispatch(setNoBalanceDialog({
            open: false,
        }));
    }

    if (!token) return null;

    return (
        <NoBalanceDialog
            open={isDialogOpen}
            onRequestClose={handleRequestDialogClose}
            token={token}
        />
    );
}
