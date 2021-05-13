import React, { ReactElement } from 'react';
import Big from "big.js";

import Button from '../../components/Button';
import { Account } from '../../models/Account';
import { TokenMetadata } from "../../models/TokenMetadata";
import trans from '../../translation/trans';
import { formatCollateralToken } from '../../services/CollateralTokenService';

import s from './HomeHeader.module.scss';

interface Props {
    onCreateMarketClick: () => void;
    account: Account | null;
    unrealizedPnl: Big | null;
    totalSpent: string | null;
    outcomeTokenBalance: string | null;
    collateralTokenMetadata: TokenMetadata | null;
}

export default function HomeHeader({
    onCreateMarketClick,
    account,
    unrealizedPnl,
    totalSpent,
    outcomeTokenBalance,
    collateralTokenMetadata
}: Props): ReactElement {

    return (
        <div className={s.root}>
        <div className={s.titleWrapper}>
        <h1 className={s.title}>
        { account === null
        ? trans('home.title.welcome.loggedOut')
                      : trans('home.title.welcome.loggedIn', { username: account?.accountId || '' })
                    }
                </h1>
                <span className={s.subTitle}>
                    { account === null
                      ? trans('home.title.subtitle.loggedOut')
                      : trans('home.title.subtitle.loggedIn')
                    }
                </span>
            </div>
            <div className={s.stats}>
                {
                    unrealizedPnl !== null &&
                    <>
                        <label>Unrealized PnL</label>
                        <p className={unrealizedPnl.gt("0") ? s.link__green : s.link__red }>
                            {unrealizedPnl.toString()}%
                        </p>
                    </>
                }
                {
                    (totalSpent !== null && collateralTokenMetadata !== null) &&
                    <>
                        <label>Total spent</label>
                        <p>{formatCollateralToken(totalSpent, collateralTokenMetadata!.decimals)} {collateralTokenMetadata?.symbol}</p>
                    </>
                }
                {
                    (outcomeTokenBalance !== null && collateralTokenMetadata !== null) &&
                    <>
                        <label>Total outcome tokens</label>
                        <p>{formatCollateralToken(outcomeTokenBalance, collateralTokenMetadata!.decimals)}</p>
                    </>
                }
            </div>
            {process.env.REACT_APP_NETWORK !== "mainnet" && <Button onClick={onCreateMarketClick}>{trans('global.actions.createMarket')}</Button>}
        </div>
    );
}
