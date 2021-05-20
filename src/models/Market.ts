import FluxSdk, { DataRequest } from "@fluxprotocol/amm-sdk";
import Big from "big.js";
import trans from "../translation/trans";
import { ClaimViewModel, GraphClaimResponse, transformToClaimViewModel } from "./Claim";
import { TokenViewModel, transformToTokenViewModels } from "./TokenViewModel";
import { UserBalance } from "./UserBalance";

export enum MarketCategory {
    Stocks = 'stocks',
    Esports = 'esports',
    Meme = 'meme',
    Politics = 'politics',
    Viral = 'viral',
    Crypto = 'crypto',
    Sports = 'sports',
    Startups = 'startups',
    Unknown = 'unknown',
}

export enum MarketType {
    Binary = 'binary',
    Categorical = 'categorical',
    Scalar = 'scalar',
}

export interface GraphMarketResponse {
    creation_date: string | null;
    description: string;
    outcome_tags: string[];
    end_time: string;
    resolution_time: string | null;
    extra_info: string;
    finalized: boolean;
    id: string;
    volume: string;
    liquidity: string | null;
    categories: string[];
    payout_numerator?: string[] | null;
    claimed_earnings?: GraphClaimResponse;
    is_scalar?: boolean;
    pool: {
        owner: string;
        collateral_token_id: string;
        pool_balances: {
            weight: string;
            outcome_id: number;
            balance: string;
            price: number;
        }[];
        tokens_info?: {
            is_pool_token: boolean;
            total_supply: string;
        }[];
    }
}

export interface MarketViewModel {
    id: string;
    finalized: boolean;
    creationDate?: Date;
    owner: string;
    description: string;
    closeDate: Date;
    resolutionDate: Date;
    volume: string;
    volumeInMoney: string;
    liquidity: string;
    liquidityInMoney: string;
    category: (MarketCategory | string)[];
    extraInfo: string;
    collateralTokenId: string;
    outcomeTokens: TokenViewModel[];
    collateralToken: TokenViewModel;
    invalid: boolean;
    payoutNumerator: string[] | null;
    claim?: ClaimViewModel;
    oracleId?: string;
    type: MarketType;
    poolTokenInfo: {
        totalSupply: string;
    };
}

export async function transformToMarketViewModel(
    graphResponse: GraphMarketResponse,
    collateralToken: TokenViewModel,
    userBalances: UserBalance[] = [],
    dataRequest?: DataRequest,
): Promise<MarketViewModel> {
    const tokensInfo = graphResponse.pool.tokens_info || [];
    const poolTokenInfo = tokensInfo.find(info => info.is_pool_token);
    const payoutNumerator = graphResponse.payout_numerator ? graphResponse.payout_numerator : null;
    const marketType = graphResponse.is_scalar ? MarketType.Scalar : MarketType.Categorical;

    const formattedVolume = FluxSdk.utils.formatToken(graphResponse.volume, collateralToken.decimals);
    const volumeInMoney = new Big(formattedVolume).mul(collateralToken.price).toString();
    const formattedLiquidity = FluxSdk.utils.formatToken(graphResponse.liquidity ?? '0', collateralToken.decimals);
    const liquidityInMoney = new Big(formattedLiquidity).mul(collateralToken.price).toString();

    return {
        id: graphResponse.id,
        type: marketType,
        category: graphResponse.categories || [],
        creationDate: graphResponse.creation_date ? new Date(Number(graphResponse.creation_date)) : undefined,
        description: graphResponse.description,
        extraInfo: graphResponse.extra_info,
        finalized: graphResponse.finalized,
        owner: graphResponse.pool.owner,
        oracleId: dataRequest?.id,
        // Old markets use the end_time as resolution time
        resolutionDate: new Date(parseInt(graphResponse.resolution_time ?? graphResponse.end_time)),
        closeDate: new Date(parseInt(graphResponse.end_time)),
        volume: graphResponse.volume,
        volumeInMoney,
        liquidity: graphResponse.liquidity ?? '0',
        liquidityInMoney,
        collateralTokenId: graphResponse.pool.collateral_token_id,
        collateralToken,
        invalid: graphResponse.finalized && payoutNumerator === null,
        payoutNumerator,
        claim: graphResponse.claimed_earnings ? transformToClaimViewModel(graphResponse.claimed_earnings, collateralToken) : undefined,
        outcomeTokens: transformToTokenViewModels(
            graphResponse.outcome_tags,
            graphResponse.pool.pool_balances as any,
            userBalances,
            marketType,
            false,
            collateralToken,
        ),
        poolTokenInfo: {
            totalSupply: poolTokenInfo?.total_supply || '0',
        }
    }
}


export function getMarketStatusTranslation(endTime: number, payoutNumerator: string[] | null, finalized: boolean): string {
    const now = new Date();

    if (finalized && payoutNumerator !== null) {
        return trans('marketStatus.finalized');
    } else if (finalized && payoutNumerator === null) {
        return trans('marketStatus.invalid');
    } else if (!finalized && now.getTime() >= endTime) {
        return trans('marketStatus.resoluting');
    } else {
        return trans('marketStatus.ongoing');
    }
}
