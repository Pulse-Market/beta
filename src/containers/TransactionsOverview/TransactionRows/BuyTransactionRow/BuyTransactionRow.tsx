import FluxSdk from '@fluxprotocol/amm-sdk';
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Transaction } from '../../../../models/Transaction';
import { prettyFormatDate } from '../../../../services/DateService';
import trans from '../../../../translation/trans';

interface Props {
    transaction: Transaction;
    className?: string;
    linkClassName?: string;
    href: any;
}

export default function BuyTransactionRow({
    transaction,
    href,
    className = '',
    linkClassName = '',
}: Props) {
    return (
        <tr className={className}>
            <td>
                <Link to={href} className={linkClassName}>
                    {trans('accountTransactionsOverview.buy.type')}
                </Link>
            </td>
            <td>
                <Link to={href} className={classnames(linkClassName, 'txoverview__market-description')}>
                    {transaction.marketDescription}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                    {FluxSdk.utils.formatToken(transaction.input, transaction.collateralToken.decimals)} {transaction.collateralToken.tokenSymbol}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                ➔
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                    {FluxSdk.utils.formatToken(transaction.output, transaction.collateralToken.decimals)} {transaction.tokenName}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                    {prettyFormatDate(transaction.date)}
                </Link>
            </td>
        </tr>
    );
}
