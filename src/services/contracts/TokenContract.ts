import BN from "bn.js";

import { Account, Contract } from "near-api-js";
import { DEFAULT_SLIPPAGE, MAX_GAS, PROTOCOL_ACCOUNT_ID, STORAGE_DEFAULT } from "../../config";
import { SwapFormValues } from "../SwapService";
import { connectWallet } from "../WalletService";

export class TokenContract {
    contract: Contract;

    constructor(account: Account, tokenAccountId: string) {
        this.contract = new Contract(account, tokenAccountId, {
            viewMethods: ['ft_balance_of'],
            changeMethods: ['ft_transfer_call', 'register_account'],
        });
    }

    async registerAccount(accountId = this.contract.account.accountId) {
        // @ts-ignore
        return this.contract.register_account({
            account_id: accountId,
        },
            MAX_GAS,
            STORAGE_DEFAULT,
        );
    }

    async getBalance(accountId: string): Promise<void> {
        // @ts-ignore
        return this.contract.ft_balance_of({account_id: accountId});
    }
}

let tokenInstances: Map<string, TokenContract> = new Map();

// @ts-ignore
window.createTokenContract = createTokenContract;

export default async function createTokenContract(tokenAccountId: string): Promise<TokenContract> {
    const instance = tokenInstances.get(tokenAccountId)
    if (instance) {
        return instance;
    }

    const wallet = await connectWallet();
    const newInstance = new TokenContract(wallet.account(), tokenAccountId);

    tokenInstances.set(tokenAccountId, newInstance);

    return newInstance;
}
