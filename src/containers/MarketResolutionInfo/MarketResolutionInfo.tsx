import React from 'react';
import { ReactElement } from 'react';
import { ORACLE_EXPLORER_URL } from '../../config';
import { MarketViewModel } from '../../models/Market';
import trans from '../../translation/trans';

import s from './MarketResolutionInfo.module.scss';
interface Props {
    market: MarketViewModel;
}

export default function MarketResolutionInfo({
    market,
}: Props): ReactElement {
    return (
        <section className={s.root}>
            <h2 className={s.title}>{trans('market.label.resolutionInfo')}</h2>
            <p>{market.extraInfo}</p>
            {market.oracleId && (
                <a className={s.link} href={`${ORACLE_EXPLORER_URL}#!/request/near/${market.oracleId}`}>
                    {trans('marketResolutionInfo.text.oracle')}
                </a>
            )}
        </section>
    );
}
