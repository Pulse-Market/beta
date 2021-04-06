import React from 'react';
import Button from '../../components/Button';
import Dialog from '../../compositions/Dialog';
import { RAINBOW_BRIDGE_LINK, REF_FINANCE_LINK } from '../../config';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';

import s from './NoBalanceDialog.module.scss';

interface Props {
    open: boolean;
    token: TokenViewModel;
    onRequestClose: () => void;
}


export default function NoBalanceDialog({
    open,
    token,
    onRequestClose,
}: Props) {
    function handleRefFinanceClick() {
        window.open(`${REF_FINANCE_LINK}#wNEAR-${token.tokenSymbol}`);
    }

    function handleRainbowBridgeClick() {
        window.open(`${RAINBOW_BRIDGE_LINK}`);
    }

    return (
        <Dialog
            title={trans('noBalanceDialog.title', { tokenName: token.tokenName })}
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={() => {}}
            isInfoDialog
            hideButtons
        >
            <p>{trans('noBalanceDialog.description', { tokenName: token.tokenName })}</p>

            <Button className={s.linkButton} onClick={handleRefFinanceClick}>{trans('global.link.refFinance')}</Button>
            <Button className={s.linkButton} onClick={handleRainbowBridgeClick}>{trans('global.link.rainbowBridge')}</Button>
        </Dialog>
    );
}
