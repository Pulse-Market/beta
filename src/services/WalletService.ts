import {
    Near,
    WalletConnection,
} from "near-api-js";

import FluxSdk from '@fluxprotocol/amm-sdk';

import { API_URL, NETWORK, NULL_CONTRACT, PROTOCOL_ACCOUNT_ID } from '../config';

let sdkInstance = new FluxSdk({
    network: NETWORK,
    protocolContractId: PROTOCOL_ACCOUNT_ID,
    nullContractId: NULL_CONTRACT,
    graphApiUrl: API_URL,
});

export async function connectSdk(): Promise<FluxSdk> {
    await sdkInstance.connect();
    return sdkInstance;
}

export async function connectNear(): Promise<Near> {
    const sdk = await connectSdk();
    return sdk.near!;
}

export async function connectWallet(): Promise<WalletConnection> {
    const sdk = await connectSdk();
    return sdk.walletConnection!;
}




