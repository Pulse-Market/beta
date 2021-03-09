import FluxSdk from "@fluxprotocol/amm-sdk";
import Big from "big.js";
import { MarketViewModel } from "../models/Market";
import { getScalarBounds } from "./MarketService";
import { connectSdk } from "./WalletService";

export interface SeedPoolFormValues {
    outcomePercentages: string[];
    mainTokenInput: string;
    mainTokenInputFormatted: string;
}

export interface SeedScalarMarketFormValues {
    initialValue: Big;
    mainTokenInput: string;
    mainTokenInputFormatted: string;
}

export async function seedPool(marketId: string, tokenId: string, values: SeedPoolFormValues) {
    const sdk = await connectSdk();

    sdk.addLiquidity(tokenId, marketId, values.mainTokenInput, values.outcomePercentages.map(p => Number(p)), {
        value: '1',
    });
}

export async function seedScalarMarket(market: MarketViewModel, values: SeedScalarMarketFormValues) {
    const sdk = await connectSdk();
    const bounds = getScalarBounds(market.outcomeTokens.map(token => token.bound));
    const weightsInPercentages = FluxSdk.utils.calcScalarDistributionPercentages(values.initialValue, bounds.lowerBound, bounds.upperBound);
    return sdk.addLiquidity(market.collateralTokenId, market.id, values.mainTokenInput, weightsInPercentages, {
        value: '1',
    });
}

export async function joinPool(marketId: string, amountIn: string, tokenId: string) {
    const sdk = await connectSdk();
    sdk.addLiquidity(tokenId, marketId, amountIn, undefined, {
        value: '1',
    });
}

export async function exitPool(marketId: string, amountIn: string) {
    const sdk = await connectSdk();
    sdk.exitPool(marketId, amountIn);
}
