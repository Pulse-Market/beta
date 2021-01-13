import React from 'react';
import classnames from 'classnames';
import LinkButton from '../../components/LinkButton';
import { MarketViewModel } from '../../models/Market';
import { formatResolutionDate } from '../../services/MarketService';
import trans from '../../translation/trans';

import s from './MarketHeader.module.scss';
import MarketOpinionCard from '../../compositions/MarketOpinionCard';
import { getBubbleForCategory } from '../../utils/getBubbleForCategory';

interface Props {
    market: MarketViewModel;
    className?: string;
}

export default function MarketHeader({
    market,
    className = '',
}: Props) {
    return (
        <header className={classnames(s['root'], className)}>
            <div className={s['wrapper']}>
                <div className={s['header-item']}>
                    <LinkButton className={s['market-header__back-button']} href="/">
                        {trans('navigation.back')}
                    </LinkButton>
                    <h1 className={s['market-header__title']}>{market.description}</h1>
                    <span className={s['market-header__resolution-date']}>
                        <span className={s['market-header__resolution-date-title']}>
                            {trans('market.resolutionDate')} —&nbsp;
                        </span>
                        <span className={s['market-header__resolution-date-stamp']}>
                            {formatResolutionDate(market.resolutionDate)}
                        </span>
                    </span>
                </div>
                <div className={classnames(s['header-item'], s['opinion-card-wrapper'])}>
                    <MarketOpinionCard market={market} />
                </div>
                <div className={s['bubble']} style={{ backgroundImage: `url(${getBubbleForCategory(market.category)})` }} />
            </div>
        </header>
    );
}
