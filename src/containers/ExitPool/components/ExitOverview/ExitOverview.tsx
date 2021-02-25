import React, { ReactElement } from 'react';
import Big from "big.js";
import { MarketViewModel } from '../../../../models/Market';
import Overview from '../../../../components/Overview';
import FluxSdk from '@fluxprotocol/amm-sdk';


interface ExitOverviewProps {
    market: MarketViewModel
    amount: string
}

export default function ExitOverview({
    market,
    amount
}: ExitOverviewProps): ReactElement {
    const poolTokenTotalSupply = new Big(market.poolTokenInfo.totalSupply);
    const relativeBal = amount ? new Big(amount).div(poolTokenTotalSupply) : new Big("0");

    const data = market.outcomeTokens.map(tokenData => ({
        key: tokenData.tokenName + " returned on exit",
        value: FluxSdk.utils.formatToken(relativeBal.mul(new Big(tokenData.poolBalance)).toString(), market.collateralToken.decimals)
    }))

    return (
        <Overview data={data} />
    )
}
