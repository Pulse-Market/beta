import FluxSdk from '@fluxprotocol/amm-sdk';
import Big from 'big.js';
import { format } from 'date-fns';
import { DEFAULT_FEE, DEFAULT_SLIPPAGE } from '../config';
import { Account } from '../models/Account';
import { EscrowStatus, transformEscrowStatusViewModel } from "../models/EscrowStatus";

import { MarketCategory, MarketType, MarketViewModel, transformToMarketViewModel } from '../models/Market';
import { TokenMetadata } from '../models/TokenMetadata';
import { TokenViewModel, transformToMainTokenViewModel, transformToTokenViewModels } from '../models/TokenViewModel';
import { UserBalance } from '../models/UserBalance';
import trans from '../translation/trans';
import cache from '../utils/cache';
import { getBalancesForMarketByAccount } from './AccountService';
import { createDefaultTokenMetadata, getCollateralTokenMetadata } from './CollateralTokenService';
import { getOracleDataRequest } from './OracleService';
import { SwapFormValues } from './SwapService';
import { connectSdk } from './WalletService';

export interface MarketFormValues {
    type: MarketType;
    selectedTokenId: string;
    isCategoricalMarket: boolean;
    categories: MarketCategory[];
    resolutionDate: Date;
    closeDate: Date;
    description: string;
    outcomes: string[];
    extraInfo: string;
    collateralTokenId: string;
    lowerBound: Big;
    upperBound: Big;
    decimals: string;
}

function createOutcomes(values: MarketFormValues): string[] {
    if (values.type === MarketType.Categorical) {
        return values.outcomes;
    }

    if (values.type === MarketType.Scalar || values.type === MarketType.CryptoPrice) {
        return [
            values.lowerBound.toString(),
            values.upperBound.toString(),
        ];
    }

    return [
        trans('market.outcomes.yes'),
        trans('market.outcomes.no'),
    ];
}

export async function createMarket(values: MarketFormValues): Promise<void> {
    try {
        const sdk = await connectSdk();
        const outcomes = createOutcomes(values);
        const tokenMetadata = await getCollateralTokenMetadata(values.collateralTokenId);
        const formattedFee = 100 / DEFAULT_FEE;

        sdk.createMarket({
            description: values.description,
            endDate: values.closeDate,
            resolutionDate: values.resolutionDate,
            extraInfo: values.extraInfo,
            outcomes,
            categories: values.categories,
            collateralTokenId: values.collateralTokenId,
            isScalar: values.type === MarketType.Scalar || values.type === MarketType.CryptoPrice,
            swapFee: new Big(`1e${tokenMetadata.decimals}`).div(formattedFee).toString(),
            scalarMultiplier: new Big(`1e${values.decimals}`).toString(),
        });
    } catch (error) {
        console.error('[createMarket]', error);
    }
}

export async function buyShares(market: MarketViewModel, values: SwapFormValues): Promise<void> {
    const sdk = await connectSdk();

    sdk.buy({
        marketId: market.id,
        collateralTokenId: market.collateralTokenId,
        outcomeId: values.toToken.outcomeId,
        amountIn: values.amountIn,
        amountOut: values.amountOut,
        slippage: DEFAULT_SLIPPAGE,
    }, {
        // can be removed once fees aren't funded
        value: '1'
    });
}

export async function sellShares(market: MarketViewModel, values: SwapFormValues) {
    const sdk = await connectSdk();

    sdk.sell({
        marketId: market.id,
        amountIn: values.amountIn,
        amountOut: values.amountOut,
        outcomeId: values.fromToken.outcomeId,
        slippage: DEFAULT_SLIPPAGE,
    }, {
        // can be removed once fees aren't funded
        value: '1',
    });
}

export async function getMarketById(marketId: string): Promise<MarketViewModel | null> {
    try {
        const sdk = await connectSdk();
        let accountId: string | undefined = undefined;

        if (sdk.isSignedIn()) {
            accountId = sdk.getAccountId();
        }

        const market = await sdk.getMarketById(marketId, accountId);
        let balances: UserBalance[] = [];

        if (accountId) {
            balances = await getBalancesForMarketByAccount(accountId, marketId);
        }

        const dataRequest = await getOracleDataRequest(marketId);
        const collateralToken = await transformToMainTokenViewModel(market.pool.collateral_token_id, accountId);

        return transformToMarketViewModel(market, collateralToken, balances, dataRequest);
    } catch (error) {
        console.error('[getMarketById]', error);
        return null;
    }
}

export interface MarketFilters {
    categories?: MarketCategory[];
    expired?: boolean;
    finalized?: boolean;
    limit?: number;
    offset?: number;
}

export async function getMarkets(filters: MarketFilters): Promise<MarketViewModel[]> {
    try {
        const sdk = await connectSdk();
        const markets = await sdk.getMarkets(filters);
        const marketsPromises = markets.items.map(async (market) => {
            const collateralToken = await transformToMainTokenViewModel(market.pool.collateral_token_id);
            return transformToMarketViewModel(market, collateralToken);
        });

        return Promise.all(marketsPromises);
    } catch (error) {
        console.error('[getMarketById]', error);
        return [];
    }
}

export async function getMarketOutcomeTokens(marketId: string, collateralToken?: TokenViewModel, account?: Account): Promise<TokenViewModel[]> {
    try {
        const sdk = await connectSdk();
        const result = await sdk.getMarketPoolBalances(marketId);
        const accountId = account?.accountId;
        let balances: UserBalance[] = [];
        let outcomeTags = result.outcome_tags;

        if (result.is_scalar) {
            outcomeTags = outcomeTags.map(tag => new Big(tag).div(result.scalar_multiplier ?? '100').toString());
        }

        if (accountId) {
            balances = await getBalancesForMarketByAccount(accountId, marketId);
        }

        return transformToTokenViewModels(
            outcomeTags,
            result.pool.pool_balances as any,
            balances,
            result.is_scalar ? MarketType.Scalar : MarketType.Categorical,
            false,
            collateralToken,
        );
    } catch (error) {
        console.error('[getMarketOutcomeTokens]', error);
        return [];
    }
}

export async function getResolutingMarkets(): Promise<MarketViewModel[]> {
    try {
        return getMarkets({
            expired: true,
            finalized: true,
        });
    } catch (error) {
        console.error('[getMarketById]', error);
        return [];
    }
}

export async function claimEarningsForMarket(marketId: string) {
    const sdk = await connectSdk();
    sdk.claimEarnings(marketId);
}

export function formatResolutionDate(resolutionDate: Date): string {
    return format(resolutionDate, 'MMMM d, yyyy HH:mm');
}

/**
 * Checks whether or not user is eligible for swapping their shares for a collateral token
 *
 * @export
 * @param {TokenViewModel[]} tokens
 * @return {boolean}
 */
export function isEligibleForRedeeming(tokens: TokenViewModel[]): boolean {
    return !tokens.some(token => token.balance === '0');
}

export function getEligibleAmountForRedeeming(tokens: TokenViewModel[]): Big {
    if (!isEligibleForRedeeming(tokens)) {
        return new Big(0);
    }

    let lowestBalance = new Big(tokens[0].balance);

    tokens.forEach((token) => {
        const balance = new Big(token.balance);

        if (balance.lt(lowestBalance)) {
            lowestBalance = balance;
        }
    });

    return lowestBalance;
}

export async function burnOutcomeTokensRedeemCollateral(marketId: string, toBurn: string) {
    const sdk = await connectSdk();
    await sdk.burnOutcomeTokensRedeemCollateral(marketId, toBurn);
}

export async function getTokenWhiteListWithDefaultMetadata(): Promise<TokenMetadata[]> {
    const sdk = await connectSdk();
    return cache('token_whitelist', async () => {
        const whitelist = await sdk.getTokenWhitelist();
        return whitelist.map(token => createDefaultTokenMetadata(token.tokenId));
    });
}

export async function getEscrowStatus(marketId: string, accountId: string): Promise<EscrowStatus[]> {
    const sdk = await connectSdk();
    const escrowStatus = await sdk.getEscrowStatus(accountId, marketId)
    return transformEscrowStatusViewModel(escrowStatus);
}

export function getScalarBounds(bounds: Big[]): { lowerBound: Big, upperBound: Big } {
    const sortedBounds = FluxSdk.utils.sortBig(bounds);

    return {
        lowerBound: sortedBounds[0],
        upperBound: sortedBounds[sortedBounds.length - 1],
    }
}

interface ScalarLongShortTokensResult {
    longToken: TokenViewModel,
    shortToken: TokenViewModel,
    lowerBound: Big,
    upperBound: Big,
}

export function getScalarLongShortTokens(tokens: TokenViewModel[]): ScalarLongShortTokensResult {
    const bounds = getScalarBounds(tokens.map(t => t.bound));

    return {
        longToken: tokens.find(t => t.bound.eq(bounds.upperBound)) as TokenViewModel,
        shortToken: tokens.find(t => t.bound.eq(bounds.lowerBound)) as TokenViewModel,
        lowerBound: bounds.lowerBound,
        upperBound: bounds.upperBound,
    }
}
