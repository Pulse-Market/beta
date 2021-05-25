import Big from "big.js";
import { OracleConfig } from "../models/OracleConfig";
import { transformToMainTokenViewModel } from "../models/TokenViewModel";
import { connectSdk } from "./WalletService";

export async function getOracleConfig(): Promise<OracleConfig> {
    const sdk = await connectSdk();
    const config = await sdk.getOracleConfig();
    const token = await transformToMainTokenViewModel(config.bond_token, sdk.getAccountId(), false);

    return {
        token,
        validityBond: new Big(config.validity_bond),
    }
}

export async function getOracleDataRequest(marketId: string) {
    const sdk = await connectSdk();
    return sdk.getOracleDataRequest(marketId);
}
