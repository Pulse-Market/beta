import Big from "big.js";
import { TokenViewModel } from "./TokenViewModel";

export interface OracleConfig {
    validityBond: Big;
    maxOutcomes: number;
    token: TokenViewModel;
}
