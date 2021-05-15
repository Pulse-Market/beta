import React, { ReactElement } from 'react';
import Big from "big.js";

import Button from '../../components/Button';
import { Account } from '../../models/Account';
import { TokenViewModel } from "../../models/TokenViewModel";
import trans from '../../translation/trans';

import s from './HomeHeader.module.scss';

interface Props {
    onCreateMarketClick: () => void;
    account: Account | null;
    unrealizedPnl: Big | null;
    totalSpent: string | null;
}

export default function HomeHeader({
    onCreateMarketClick,
    account,
    unrealizedPnl,
    totalSpent,
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
                { totalSpent !== null &&
                  <>
                      <label>{trans('home.title.summary.totalSpent')}</label>
                      <p>
                          {totalSpent}
                      </p>
                  </>
                }
                { (unrealizedPnl !== null && totalSpent !== null) &&
                  <>
                      <label>{trans('home.title.summary.pnl')}</label>
                      <p className={unrealizedPnl.gt("0") ? s.link__green : s.link__red }>
                          {unrealizedPnl.toString()}% / {totalSpent.charAt(0)}{ (Number(totalSpent.slice(1)) + ((Number(unrealizedPnl)/100) * Number(totalSpent.slice(1)))).toFixed(2) }
                      </p>
                  </>
                }
            </div>
            {process.env.REACT_APP_NETWORK !== "mainnet" && <Button onClick={onCreateMarketClick}>{trans('global.actions.createMarket')}</Button>}
        </div>
    );
}
