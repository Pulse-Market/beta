import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { MarketViewModel } from '../../models/Market';
import MarketInfoCard from '../../components/MarketInfoCard';

import s from './MarketCard.module.scss';
import MarketOpinionCard from '../MarketOpinionCard';

interface Props {
    market: MarketViewModel;
    className?: string;
    href: string;
    showAllInfo: boolean;
}

export default function MarketCard({
    market,
    href,
    showAllInfo,
    className = '',
}: Props) {
    return (
        <Link to={{ pathname: href, state: { canGoBack: true } }} className={classnames(s.root, className)}>
            <MarketInfoCard market={market} className={s.infoCard} />
            <MarketOpinionCard market={market} showAllInfo={showAllInfo} />
        </Link>
    );
}
