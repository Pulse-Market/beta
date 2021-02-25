import React, { ReactElement } from 'react';
import Big from "big.js";
import { MarketViewModel } from '../../../../models/Market';
import Overview from '../../../../components/Overview';
import FluxSdk from '@fluxprotocol/amm-sdk';
import trans from '../../../../translation/trans';


interface Props {
    market: MarketViewModel
    amount: string
}

export default function LiquidityOverview({
    market,
    amount
}: Props): ReactElement {
    const maxBalance = new Big(market.outcomeTokens.reduce((s, t) => new Big(t.poolBalance).gt(new Big(s))  ? t.poolBalance : s, "0"));
    const collateralIn = amount ? new Big(amount) : new Big("0");

    const data = market.outcomeTokens.map(t => {
        const balance = new Big(t.poolBalance);
        return  {
            key: t.tokenName + trans('market.label.spaceTokens'),
            value: FluxSdk.utils.formatToken(collateralIn.minus(collateralIn.mul(balance).div(maxBalance)).toString(), t.decimals)
        }
    });
    
    data.push({
        key: trans('market.label.lp') + trans('market.label.spaceTokens'),
        value: FluxSdk.utils.formatToken(collateralIn.mul(new Big(market.poolTokenInfo.totalSupply)).div(maxBalance).toString(), market.collateralToken.decimals)
    })

    return (
        <Overview data={data} header={trans('market.label.youReceive', {}, true)}/>
    )
}
