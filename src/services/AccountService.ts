import Big from "big.js";
import { Account } from "../models/Account";
import { PoolToken, transformToPoolToken } from "../models/PoolToken";
import { transformToUserBalance, UserBalance } from "../models/UserBalance";
import { getCollateralTokenMetadata } from "./CollateralTokenService";
import createAuthContract from "./contracts/AuthContract";
import { connectSdk } from "./WalletService";
import { ENABLE_WHITELIST } from "../config";
import { EscrowStatus, transformEscrowStatusViewModel } from "../models/EscrowStatus";
import { ParticipatedMarket, transformToParticipatedMarket } from "../models/ParticipatedMarket";
import { Pagination } from "@fluxprotocol/amm-sdk/dist/models/Pagination";

export async function signUserIn() {
    const sdk = await connectSdk();
    sdk.signIn();
}

export async function getAccountId(): Promise<string | null> {
    const sdk = await connectSdk();
    return sdk.getAccountId() ?? null;
}

export async function getAccountInfo(): Promise<Account | null> {
    const sdk = await connectSdk();

    if (!sdk.isSignedIn()) {
        return null;
    }

    let canUseApp = true;
    const accountId = sdk.getAccountId() ?? '';

    if (ENABLE_WHITELIST) {
        const auth = await createAuthContract();
        canUseApp = await auth.isAuthenticated(accountId);
    }

    return {
        accountId,
        balance: (await sdk.getNearBalance()).available,
        canUseApp,
    };
}


export async function fetchEscrowStatus(accountId: string): Promise<EscrowStatus[]> {
    const sdk = await connectSdk();

    const escrowStatus = await sdk.getEscrowStatus(accountId, undefined, {
        onlyActive: true,
    });

    return transformEscrowStatusViewModel(escrowStatus);
};

export async function signUserOut() {
    const sdk = await connectSdk();
    sdk.signOut();
}

interface AccountBalancesInfo {
    poolTokens: PoolToken[];
    marketBalances: UserBalance[];
}

export async function getAccountBalancesInfo(accountId: string): Promise<AccountBalancesInfo> {
    try {
        const sdk = await connectSdk();
        const accountBalances = await sdk.getAccountInfo(accountId, {
            removeClaimedBalances: true,
            removeZeroBalances: true,
        });

        // Find all collateral tokens
        let allCollateralTokenIds: string[] = accountBalances.earned_fees.map(item => item.market?.pool.collateral_token_id || '');
        allCollateralTokenIds.push(...accountBalances.balances.map(item => item.market?.pool.collateral_token_id || ''));
        allCollateralTokenIds = allCollateralTokenIds.filter(item => item);

        // Fetch all token metadata
        const tokensMetadata = await Promise.all(allCollateralTokenIds.map(item => getCollateralTokenMetadata(item)));

        // Transform the fees
        const poolTokens = accountBalances.earned_fees.map((data) => {
            const tokenMetadata = tokensMetadata.find(metadata => metadata.collateralTokenId === data.market?.pool.collateral_token_id);
            return transformToPoolToken(data, tokenMetadata!);
        });

        // Transform the balances
        const marketBalances = accountBalances.balances.map((data) => {
            const tokenMetadata = tokensMetadata.find(metadata => metadata.collateralTokenId === data.market?.pool.collateral_token_id);
            return transformToUserBalance(data, tokenMetadata!);
        }).sort((a, b) => {
            if (a.profitPercentage.gt(b.profitPercentage)) return -1;
            if (a.profitPercentage.eq(b.profitPercentage)) return 0;
            return 1;
        });

        return {
            poolTokens,
            marketBalances,
        };
    } catch (error) {
        console.error('[getPoolTokensByAccountId]', error);
        return {
             poolTokens: [],
             marketBalances: [],
        };
    }
}

export async function getAccountUnrealizedPnl(accountId: string): Promise<Big> {
    let accountBalancesInfo = await getAccountBalancesInfo(accountId);
    console.log(accountBalancesInfo);

    let totalAvgPaidPrice = new Big("0");
    let totalOutcomePrice = 0;
    for (let i = 0; i < accountBalancesInfo.marketBalances.length; i++) {
        totalAvgPaidPrice = accountBalancesInfo.marketBalances[i].avgPaidPrice.add(totalAvgPaidPrice);
        totalOutcomePrice = accountBalancesInfo.marketBalances[i].outcomePrice + totalOutcomePrice;
    }
    // const unrealizedPnl = avgPaidPrice.gt("0") ? new Big(currentPrice).minus(avgPaidPrice).div(avgPaidPrice).mul(100).round(2) : new Big("0")
    const unrealizedPnl = totalAvgPaidPrice.gt("0") ? new Big(totalOutcomePrice).minus(totalAvgPaidPrice).div(totalAvgPaidPrice).mul(100).round(2) : new Big("0")

    return unrealizedPnl;
}

export async function getBalancesForMarketByAccount(accountId: string, marketId: string): Promise<UserBalance[]> {
    try {
        const sdk = await connectSdk();
        const balances = await sdk.getAccountBalancesForMarket(marketId, accountId);
        const colletaralTokenIds = balances.map(item => item.market?.pool.collateral_token_id || '').filter(x => x);
        const tokenMetadata = await Promise.all(colletaralTokenIds.map(id => getCollateralTokenMetadata(id)));

        return balances.map((balance) => {
            const metadata = tokenMetadata.find(metadata => metadata.collateralTokenId === balance.market?.pool.collateral_token_id);
            return transformToUserBalance(balance, metadata!)
        });
} catch (error) {
    console.error('[getBalancesForMarketByAccount]', error);
        return [];
    }
}

export async function getPoolBalanceForMarketByAccount(accountId: string, marketId: string): Promise<PoolToken | null> {
    try {
        const sdk = await connectSdk();
        const data = await sdk.getPoolTokenBalance(accountId, marketId);

        if (!data) {
            return null;
        }

        const collateralTokenMetadata = await getCollateralTokenMetadata(data.market?.pool.collateral_token_id || '');
        return transformToPoolToken(data, collateralTokenMetadata);
    } catch (error) {
        console.error('[getBalancesForMarketByAccount]', error);
        return null;
    }
}

export async function getParticipatedMarkets(accountId: string, limit: number, offset: number): Promise<Pagination<ParticipatedMarket>> {
    const sdk = await connectSdk();
    const result = await sdk.getParticipatedMarkets(accountId, {
        limit,
        offset,
    });

    if (!result) return {
        total: 0,
        items: []
    }

    const participatedMarkets = result.items.map((item) => {
        return transformToParticipatedMarket(item);
    });

    return {
        items: participatedMarkets,
        total: result.total,
    }
}
