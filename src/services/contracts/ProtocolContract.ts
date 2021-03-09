import BN from "bn.js";

import { Account, Contract } from "near-api-js";
import { DEFAULT_SLIPPAGE, MAX_GAS, PROTOCOL_ACCOUNT_ID, STORAGE_BASE } from "../../config";
import { SwapFormValues } from "../SwapService";
import { connectWallet } from "../WalletService";

class ProtocolContract {
    contract: Contract;

    constructor(account: Account) {
        this.contract = new Contract(account, PROTOCOL_ACCOUNT_ID, {
            viewMethods: [],
            changeMethods: ['create_market', 'exit_pool', 'claim_earnings'],
        });
    }

    async exitPool(
        marketId: string,
        totalIn: string,
    ): Promise<void> {
        // @ts-ignore
        this.contract.exit_pool({
            market_id: marketId,
            total_in: totalIn,
        }, MAX_GAS, STORAGE_BASE);
    }

    async claimEarnings(
        marketId: string,
    ): Promise<void> {
        // @ts-ignore
        this.contract.claim_earnings({
            market_id: marketId,
        }, MAX_GAS, STORAGE_BASE)
    }
}

let protocolInstance: ProtocolContract;

export default async function createProtocolContract(): Promise<ProtocolContract> {
    if (protocolInstance) {
        return protocolInstance;
    }

    const wallet = await connectWallet();
    protocolInstance = new ProtocolContract(wallet.account());

    return protocolInstance;
}
