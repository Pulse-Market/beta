import Big from "big.js";
import { Account } from "../models/Account";
import { TokenViewModel, transformToMainTokenViewModel } from "../models/TokenViewModel";
import { PoolToken, transformToPoolToken } from "../models/PoolToken";
import { transformToUserBalance, UserBalance } from "../models/UserBalance";
import { getCollateralTokenMetadata, formatCollateralToken } from "./CollateralTokenService";
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

interface AccountBalancesSummary {
    unrealizedPnl: Big;
    totalSpent: string;
    collateralTokens: TokenViewModel[];
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

export async function getAccountBalancesSummary(accountId: string): Promise<AccountBalancesSummary> {
    let accountBalancesInfo = await getAccountBalancesInfo(accountId);

    if (accountBalancesInfo.marketBalances.length === 0) {
        return {
            unrealizedPnl: new Big("0"),
            totalSpent: "0",
            collateralTokens: []
        }
    }

    let totalAvgPaidPrice = new Big("0");
    let totalOutcomePrice = 0;
    let spent = "0.00";
    let collateralTokens = [];
    let account = await getAccountId();

    // loop through each market balance to find collateral token balances
    for (let i = 0; i < accountBalancesInfo.marketBalances.length; i++) {
        totalAvgPaidPrice = accountBalancesInfo.marketBalances[i].avgPaidPrice.add(totalAvgPaidPrice);
        totalOutcomePrice += accountBalancesInfo.marketBalances[i].outcomePrice;

        // find collateral token and add if it is unique
        let collateralToken = await transformToMainTokenViewModel(accountBalancesInfo.marketBalances[i].collateralTokenMetadata.collateralTokenId, account!);
        if (collateralTokens.includes(collateralToken) === false) collateralTokens.push(collateralToken); // skips duplicates

        // calculate the price of the collateral token and add it to the total spent
        let collateralTokenPrice = Number(formatCollateralToken(accountBalancesInfo.marketBalances[i].spent, collateralToken!.decimals)) * collateralToken.price;
        spent = String(
            (Number(spent) + collateralTokenPrice).toFixed(2)
        );
    }

    const unrealizedPnl = totalAvgPaidPrice.gt("0") ? new Big(totalOutcomePrice).minus(totalAvgPaidPrice).div(totalAvgPaidPrice).mul(100).round(2) : new Big("0");
    const totalSpent = String(spent);

    return {
        unrealizedPnl,
        totalSpent,
        collateralTokens,
    };
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
