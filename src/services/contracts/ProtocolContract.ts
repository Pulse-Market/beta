import { Account, Contract } from "near-api-js";
import { MAX_GAS, PROTOCOL_ACCOUNT_ID, STORAGE_BASE } from "../../config";
import { connectWallet } from "../WalletService";

class ProtocolContract {
    contract: Contract;

    constructor(account: Account) {
        this.contract = new Contract(account, PROTOCOL_ACCOUNT_ID, {
            viewMethods: [],
            changeMethods: ['create_market', 'exit_pool'],
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
