import React from 'react';
import ActionsCard from '../../components/ActionsCard';
import trans from '../../translation/trans';

import s from './NoBalanceCard.module.scss';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import { DAI_NEAR_ACCOUNT_ID, WRAPPED_NEAR_ACCOUNT_ID } from '../../config';
import { Account } from '../../models/Account';

interface Props {
    market: MarketViewModel;
    account: Account | null;
    onDialogOpenClick: () => void;
}

export default function NoBalanceCard({
    market,
    account,
    onDialogOpenClick,
}: Props) {
    if (!account) {
        return null;
    }

    const collateralTokenId = market.collateralTokenId;

    if (collateralTokenId !== WRAPPED_NEAR_ACCOUNT_ID && collateralTokenId !== DAI_NEAR_ACCOUNT_ID) {
        return null;
    }

    if (market.collateralToken.balance !== '0') {
        return null;
    }

    return (
        <ActionsCard className={s.actionsCard}>
            <img src={market.collateralToken.tokenImage} alt="" className={s.icon} />
            <div className={s.content}>
                {collateralTokenId === WRAPPED_NEAR_ACCOUNT_ID && <p className={s.text}>{trans('noWrappedNear.description', { accountId: account.accountId })}</p>}
                {collateralTokenId !== WRAPPED_NEAR_ACCOUNT_ID && <p className={s.text}>{trans('noBalanceCard.description', { tokenName: market.collateralToken.tokenName })}</p>}
                {collateralTokenId === WRAPPED_NEAR_ACCOUNT_ID && <Button onClick={onDialogOpenClick}>{trans('noWrappedNear.action.openDialog')}</Button>}
                {collateralTokenId !== WRAPPED_NEAR_ACCOUNT_ID && <Button onClick={onDialogOpenClick}>{trans('noBalanceCard.action.openDialog', { tokenName: market.collateralToken.tokenName })}</Button>}
            </div>
        </ActionsCard>
    );
}
