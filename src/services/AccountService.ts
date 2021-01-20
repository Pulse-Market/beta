import { NULL_CONTRACT } from "../config";
import { Account } from "../models/Account";
import { PoolToken } from "../models/PoolToken";
import trans from "../translation/trans";
import { connectWallet } from "./WalletService";

export async function signUserIn() {
    const connectedWallet = await connectWallet();

    connectedWallet.requestSignIn(NULL_CONTRACT, trans('global.appName'));
}

export async function getAccountInfo(): Promise<Account | null> {
    const connectedWallet = await connectWallet();

    if (!connectedWallet.isSignedIn()) {
        return null;
    }

    const nearAccount = connectedWallet.account();

    return {
        accountId: nearAccount.accountId,
        balance: (await nearAccount.getAccountBalance()).available,
    };
}

export async function signUserOut() {
    const connectedWallet = await connectWallet();
    connectedWallet.signOut();
}

export async function getPoolTokensByAccountId(accountId: string): Promise<PoolToken[]> {
    try {
        const x: PoolToken[] = [
            {
                marketId: "1",
                fees: '10000',
                outcomeId: 1,
                poolId: "1",
                marketDescription: 'Will x do y?',
                balance: '10000',
            }
        ];

        return x;
    } catch (error) {
        console.error('[getPoolTokensByAccountId]', error);
        return [];
    }
}