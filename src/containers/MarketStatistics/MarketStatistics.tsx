import React, { ReactElement } from 'react';
import classnames from 'classnames';

import s from './MarketStatistics.module.scss';
import LineChart from '../LineChart';
import { PriceHistoryData } from '../../models/PriceHistoryData';
import ToggleButtons from '../../components/ToggleButtons';
import trans from '../../translation/trans';
import { Period } from '../../services/PricesHistoryService';
import { MarketViewModel } from '../../models/Market';

interface Props {
    className?: string;
    period?: Period;
    market: MarketViewModel;
    pricesHistory: PriceHistoryData[];
    onPeriodChange: (period: Period) => void;
}

export default function MarketStatistics({
    pricesHistory,
    market,
    onPeriodChange,
    period = Period.OneDay,
    className = '',
}: Props): ReactElement {

    function handlePeriodChange(period: Period | null) {
        if (!period) return;

        onPeriodChange(period);
    }

    return (
        <div className={classnames(s['market-statistics'], className)}>
            <div className={s.timePeriodButtons}>
                <ToggleButtons
                    exclusive
                    value={period}
                    onChange={handlePeriodChange}
                    items={[
                        {
                            id: Period.OneDay,
                            text: trans('priceHistory.labels.1d'),
                        },
                        {
                            id: Period.OneWeek,
                            text: trans('priceHistory.labels.1w'),
                        },
                        {
                            id: Period.ThreeWeeks,
                            text: trans('priceHistory.labels.3w'),
                        },
                        {
                            id: Period.OneMonth,
                            text: trans('priceHistory.labels.1m'),
                        },
                        {
                            id: Period.All,
                            text: trans('priceHistory.labels.all'),
                        }
                    ]}
                />
            </div>
            <LineChart pricesHistory={pricesHistory} market={market} />
        </div>
    )
}
