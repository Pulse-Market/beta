import Big from "big.js";

export interface Account {
    balance: string;
    accountId: string;
    canUseApp: boolean;
    storageAvailable: Big;
    storageTotal: Big;
}
