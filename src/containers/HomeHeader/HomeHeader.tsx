import React, { ReactElement } from 'react';
import Big from "big.js";

import Button from '../../components/Button';
import { Account } from '../../models/Account';
import trans from '../../translation/trans';

import s from './HomeHeader.module.scss';

interface Props {
    onCreateMarketClick: () => void;
    account: Account | null;
    unrealizedPnl: Big | null;
    totalSpent: string | null;
    priceSymbol: string | null;
}

export default function HomeHeader({
    onCreateMarketClick,
    account,
    unrealizedPnl,
    totalSpent,
    priceSymbol,
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
            <div className={s.right}>
                <div className={s.stats}>
                    { totalSpent !== null &&
                      <>
                          <label>{trans('home.title.summary.totalSpent')}</label>
                          <p>
                              {priceSymbol}{totalSpent}
                          </p>
                      </>
                    }
                    { (unrealizedPnl !== null && totalSpent !== null) &&
                      <>
                          <label>{trans('home.title.summary.pnl')}</label>
                          <p className={unrealizedPnl.gt("0") ? s.link__green : s.link__red }>
                              {unrealizedPnl.toString()}% / {priceSymbol}{ ((Number(unrealizedPnl)/100) * Number(totalSpent)).toFixed(2) }
                          </p>
                      </>
                    }
                </div>
                {process.env.REACT_APP_NETWORK !== "mainnet" && <Button onClick={onCreateMarketClick}>{trans('global.actions.createMarket')}</Button>}
            </div>
        </div>
    );
}
