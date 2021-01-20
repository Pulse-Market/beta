import React, { ReactElement, useMemo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import Tag from '../../components/Tag';
import MarketCard from '../../compositions/MarketCard';
import { MarketCategory, MarketViewModel } from '../../models/Market';
import { routePaths } from '../../routes';
import { MarketFilters } from '../../services/MarketService';

import s from './MarketOverview.module.scss';

interface Props {
    markets: MarketViewModel[];
    loading: boolean;
    onFilterChange: (filters: MarketFilters) => void;
    activeFilters: MarketFilters;
}

export default function MarketOverview({
    markets,
    onFilterChange,
    activeFilters,
    loading,
}: Props): ReactElement {
    const marketCategories = useMemo(() => Object.values(MarketCategory).filter(category => category !== MarketCategory.Unknown), []);

    function handleCategoryClick(category: MarketCategory) {
        let activeCategories = activeFilters.categories;

        if (activeCategories?.includes(category)) {
            activeCategories = activeCategories.filter(cat => cat !== category);
        } else {
            activeCategories?.push(category);
        }

        onFilterChange({
            ...activeFilters,
            categories: activeCategories,
        });
    }

    console.log('[] loading -> ', loading);

    return (
        <div className={s.root}>
            <div className={s.filters}>
                {marketCategories.map((category) => (
                    <Tag
                        key={category}
                        className={s.filter}
                        category={category}
                        active={activeFilters.categories?.includes(category)}
                        onClick={() => handleCategoryClick(category)}
                        type="button"
                    />
                ))}
            </div>
            <div className={s.markets}>
                {markets.map(market => (
                    <MarketCard
                        key={market.id}
                        href={routePaths.marketDetail(market.id)}
                        className={s.market}
                        market={market}
                    />
                ))}

                {loading && (
                    new Array(9).fill('').map(() => (
                        <div className={s.market}>
                            <Skeleton variant="rect" height={288} className={s.skeleton} />
                            <Skeleton variant="rect" height={100} className={s.skeleton} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}