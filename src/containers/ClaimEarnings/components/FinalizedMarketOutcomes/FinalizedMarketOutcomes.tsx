import React from 'react';
import { MarketViewModel } from '../../../../models/Market';
import trans from '../../../../translation/trans';
import { getColorForOutcome } from '../../../../utils/getColorForOutcome';

import s from './FinalizedMarketOutcomes.module.scss';

interface Props {
    market: MarketViewModel;
}

export default function FinalizedMarketOutcomes({
    market,
}: Props) {
    const payoutNumerator = market.payoutNumerator || [];

    return (
        <div>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>{trans('market.claimEarnings.label.outcome')}</th>
                        <th>{trans('market.claimEarnings.label.payout')}</th>
                        <th>{trans('market.claimEarnings.label.balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    {payoutNumerator.map((numerator, index) => {
                        const outcome = market.outcomeTokens.find(token => token.outcomeId === index);
                        const color = getColorForOutcome(index);

                        return (
                            <tr>
                                <td style={{ color: `var(${color})` }}>{outcome?.tokenName}</td>
                                <td>{numerator}</td>
                                <td>{outcome?.balanceFormatted}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
