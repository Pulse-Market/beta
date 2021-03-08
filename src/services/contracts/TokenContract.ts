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

    async buy(
        marketId: string,
        values: SwapFormValues
    ): Promise<void> {
        let msg = JSON.stringify({
            function: "buy",
            args: {
                market_id: marketId,
                outcome_target: values.toToken.outcomeId,
                min_shares_out: new BN(values.amountOut).mul(new BN("100").sub(new BN(DEFAULT_SLIPPAGE))).div(new BN("100")).toString() // TODO: add default slippage check to amountOut and make it expectedAmountOut
            }
        });

        // @ts-ignore
        return this.contract.ft_transfer_call({
                receiver_id: PROTOCOL_ACCOUNT_ID,
                amount: values.amountIn,
                msg,
            },
            MAX_GAS,
            new BN(1),
            // STORAGE_BASE.mul(new BN(2)),
        );
    }

    async addLiquidity(marketId: string, amountIn: string, weightIndication: string[] = []) {
        let msg = JSON.stringify({
            function: "add_liquidity",
            args: {
                market_id: marketId,
                weight_indication: weightIndication.length ? weightIndication : null,
            }
        });

        // Each weight is used seperatly in near requiring more storage
        // const storageRequired = new BN('80000000000000000000000').mul(new BN(weightIndication.length));

        // @ts-ignore
        return this.contract.ft_transfer_call({
            receiver_id: PROTOCOL_ACCOUNT_ID,
            amount: amountIn,
            msg
        },
            MAX_GAS,
            new BN(1),
            // storageRequired,
        );
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
