import React from 'react';
import TokenWeightsBar from '../../../../components/TokenWeightsBar';
import trans from '../../../../translation/trans';
import { MarketViewModel } from '../../../../models/Market';
import { prettyFormatNumber } from '../../../../utils/prettyFormatNumber';
import { formatCollateralToken } from '../../../../services/CollateralTokenService';

import s from './CategoricalOpinionCard.module.scss';

interface Props {
    market: MarketViewModel;
    showAllInfo: boolean;
}

export default function CategoricalOpinionCard({
    market,
    showAllInfo,
}: Props) {
    return (
        <>
            <h2 className={s['title']}>
                {trans('market.label.opinion')}
            </h2>
            <TokenWeightsBar tokens={market.outcomeTokens} className={s['token-weight-bar']} />
            <div className={s['outcomes-wrapper']}>
                {market.outcomeTokens.map((outcome, index) => (
                    <div key={outcome.outcomeId} className={s['outcome']}>
                        <div className={s['outcome-label-wrapper']}>
                            <div style={{ backgroundColor: `var(${outcome.colorVar})` }} className={s.colorLabel} />
                            <span className={s.tokenName}>{outcome.tokenName}</span>
                        </div>
                        <span className={s.percentage}>{outcome.odds.mul(100).toNumber().toFixed(2)}%</span>
                    </div>
                ))}
            </div>
            <div className={s.volumeWrapper}>
                <span>{trans('market.label.totalVolume')}</span>
                <span>
                    {prettyFormatNumber(formatCollateralToken(market.volume, market.collateralToken.decimals))} {market.collateralToken.tokenSymbol}
                </span>
            </div>
            {showAllInfo && (
                <div className={s.volumeWrapper}>
                    <span>{trans('market.label.totalVolumeInUSD')}</span>
                    <span>
                        $ {Number(market.volumeInMoney).toFixed(2)}
                    </span>
                </div>
            )}
            <div className={s.volumeWrapper}>
                <span>{trans('market.label.totalLiquidity')}</span>
                <span>
                    {prettyFormatNumber(formatCollateralToken(market.liquidity, market.collateralToken.decimals))} {market.collateralToken.tokenSymbol}
                </span>
            </div>
            {showAllInfo && (
                <div className={s.volumeWrapper}>
                    <span>{trans('market.label.totalLiquidityInUSD')}</span>
                    <span>
                        $ {Number(market.liquidityInMoney).toFixed(2)}
                    </span>
                </div>
            )}
        </>
    );
}
