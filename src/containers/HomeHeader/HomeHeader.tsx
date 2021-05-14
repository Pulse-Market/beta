import React, { ReactElement } from 'react';
import Big from "big.js";

import Button from '../../components/Button';
import { Account } from '../../models/Account';
import { TokenViewModel } from "../../models/TokenViewModel";
import trans from '../../translation/trans';
import { formatCollateralToken } from '../../services/CollateralTokenService';

import s from './HomeHeader.module.scss';

interface Props {
    onCreateMarketClick: () => void;
    account: Account | null;
    unrealizedPnl: Big | null;
    totalSpent: string | null;
    outcomeTokenBalance: string | null;
    collateralToken: TokenViewModel | null;
    hasMultipleCollateralTokens: boolean | null;
}

export default function HomeHeader({
    onCreateMarketClick,
    account,
    unrealizedPnl,
    totalSpent,
    outcomeTokenBalance,
    collateralToken,
    hasMultipleCollateralTokens
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
                { (unrealizedPnl !== null && collateralToken !== null) &&
                  <>
                      <label>{trans('home.title.summary.pnl')}</label>
                      <p className={unrealizedPnl.gt("0") ? s.link__green : s.link__red }>
                          {unrealizedPnl.toString()}%
                      </p>
                  </>
                }
                { (totalSpent !== null && collateralToken !== null) &&
                  <>
                      <label>{trans('home.title.summary.totalSpent')}</label>
                      <p>
                          {/* display amount of collateral token if they are all the same */}
                          { (!hasMultipleCollateralTokens) && <span>{formatCollateralToken(totalSpent, collateralToken!.decimals)} {collateralToken?.tokenSymbol} / </span>}

                          {/* display collateral token amount in USD */}
                          {collateralToken?.priceSymbol}
                          {
                              String(Number(formatCollateralToken(totalSpent, collateralToken!.decimals))*collateralToken.price) // calculate dollar price of collateral token
                          }
                      </p>
                  </>
                }
                { (outcomeTokenBalance !== null && collateralToken !== null) &&
                  <>
                      <label>{trans('home.title.summary.totalBalance')}</label>
                      <p>{formatCollateralToken(outcomeTokenBalance, collateralToken!.decimals)}</p>
                  </>
                }
            </div>
            {process.env.REACT_APP_NETWORK !== "mainnet" && <Button onClick={onCreateMarketClick}>{trans('global.actions.createMarket')}</Button>}
        </div>
    );
}
