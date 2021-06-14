import Big from "big.js";

import { TokenViewModel } from "../models/TokenViewModel";
import { formatCollateralToken } from "./CollateralTokenService";
import { connectSdk, connectWallet } from "./WalletService";
import wrappedNearIcon from '../assets/images/icons/wrapped-near.svg';
import nearIcon from '../assets/images/icons/near-icon.png';
import createWrappedNearContract from "./contracts/WrappedNearContract";
import cache from "../utils/cache";
import { MAX_GAS, PROTOCOL_ACCOUNT_ID } from "../config";

export async function getNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'NEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        tokenSymbol: 'NEAR',
        spent: "0",
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
        tokenImage: nearIcon,
        bound: new Big(0),
        colorVar: '--c-blue',
    }

    try {
        const sdk = await connectSdk();
        const balance = await sdk.getNearBalance();

        return {
            ...defaults,
            balance: balance.available,
            balanceFormatted: formatCollateralToken(balance.available, 24),
        }
    } catch (error) {
        console.error('[getNearToken]', error);
        return defaults;
    }
}

export async function getWrappedNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'wNEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        spent: "0",
        tokenSymbol: 'wNEAR',
        tokenImage: wrappedNearIcon,
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
        bound: new Big(0),
        colorVar: '--c-blue',
    }

    try {
        const wNearContract = await createWrappedNearContract();
        const sdk = await connectSdk();
        const accountId = sdk.getAccountId();

        if (accountId) {
            const balance = await wNearContract.getBalance(accountId);

            return {
                ...defaults,
                balance,
                balanceFormatted: formatCollateralToken(balance, 24),
            }
        }

        return defaults;
    } catch (error) {
        console.error('[getWrappedNearToken]', error);
        return defaults;
    }
}

export interface WrapNearFormValues {
    amountIn: string;
    amountInFormatted: string;
    type: 'wrap' | 'unwrap';
}

export async function wrapNear(amountIn: string) {
    const wNearContract = await createWrappedNearContract();
    wNearContract.wrapNear(amountIn);
}

export async function unwrapNear(amountIn: string) {
    const wNearContract = await createWrappedNearContract();
    wNearContract.unwrapNear(amountIn);
}

export async function getWrappedNearStorageBalance(): Promise<{ total: string, available: string }> {
    const wNearContract = await createWrappedNearContract();
    const sdk = await connectSdk();
    const accountId = sdk.getAccountId();

    if (!accountId) {
        return {
            total: '0',
            available: '0',
        }
    }

    const result = await cache('wrapped_near_storage_balance', async () => {
        return wNearContract.getStorageBalance(accountId)
    });

    if (!result) {
        return {
            total: '0',
            available: '0',
        };
    }

    return result;
}

export async function getRequiredWrappedNearStorageDeposit() {
    const wNearContract = await createWrappedNearContract();
    return wNearContract.getMinimumRequiredStorageBalance();
}

export async function depositWrappedNearStorage(amount: string, accountId?: string) {
    const wNearContract = await createWrappedNearContract();
    return wNearContract.depositStorage(amount, accountId);
}

export async function withdrawStorage(amount: string) {
    const wallet = await connectWallet();
    const account = wallet.account();

    await account.functionCall(PROTOCOL_ACCOUNT_ID, 'storage_withdraw', {
        amount,
        // @ts-ignore
    }, MAX_GAS, '1');
}
