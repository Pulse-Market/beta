import React from 'react';

import classnames from 'classnames';

import { UserBalance } from '../../models/UserBalance';
import trans from '../../translation/trans';
import { Link } from 'react-router-dom';
import { formatCollateralToken } from '../../services/CollateralTokenService';
import { routePaths } from '../../routes';
import s from './UserBalancesOverview.module.scss';
import Big from 'big.js';
import { DUST_AMOUNT } from '../../config';

interface Props {
    balances: UserBalance[];
    className?: string;
}

export default function UserBalancesOverview({
    balances,
    className = '',
}: Props) {
    return (
        <section className={classnames(s.root, className)}>
            <header className={s.header}>
                {trans('userbalances.title')}
            </header>
            <div className={s.tableWrapper}>
                <table className={s.table}>
                    <thead className={s.tableHead}>
                        <tr className={s.tableHeadRow}>
                            <th>{trans('userbalances.table.market')}</th>
                            <th>{trans('userbalances.table.outcome')}</th>
                            <th>{trans('userbalances.table.balance')}</th>
                            <th>{trans('userbalances.table.price')}</th>
                            <th>{trans('userbalances.table.spent')}</th>
                            <th>{trans('userbalances.table.profit')}</th>
                            <th>{trans('userbalances.table.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/** Filters out any pool tokens */}
                        {balances.filter(balance => balance.outcomeTag && new Big(balance.balance).gt(DUST_AMOUNT)).map((info) => {
                            const href = {
                                pathname: routePaths.marketDetail(info.marketId),
                                state: {
                                    canGoBack: true,
                                }
                            };

                            const profitLinkClassName = classnames(s.link, {
                                [s.link__green]: info.profitPercentage.gt("0"),
                                [s.link__red]: info.profitPercentage.lt("0")
                            });

                            return (
                                <tr className={s.tableRow} key={`${info.marketId}_${info.outcomeId}`}>
                                    <td className={s.marketDescriptionCell}>
                                        <Link to={href} className={classnames(s.link, s.marketDescription)}>
                                            {info.marketDescription}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={href} className={s.link}>
                                            {info.outcomeTag}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={href} className={s.link}>
                                            {formatCollateralToken(info.balance, info.collateralTokenMetadata.decimals)}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={href} className={s.link}>
                                            {`${info.avgPaidPrice.round(2).toString()} ${info.collateralTokenMetadata.symbol}`}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={href} className={s.link}>
                                            {formatCollateralToken(info.spent, info.collateralTokenMetadata.decimals)} {info.collateralTokenMetadata.symbol}
                                        </Link>
                                    </td>
                                    <td >
                                        <Link to={href} className={profitLinkClassName}>
                                            {`${info.profitPercentage.toString()}%`}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={href} className={s.link}>
                                            {info.marketStatus}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
