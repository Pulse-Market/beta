import { BUY } from "../../../config";
import { TokenViewModel } from "../../../models/TokenViewModel";
import { SwapFormValues } from "../../../services/SwapService";

export default function createDefaultSwapFormValues(fromToken: TokenViewModel, toToken: TokenViewModel): SwapFormValues {
    return {
        type: BUY,
        fromToken,
        toToken,
        amountIn: "1", // TODO: Remove
        amountOut: "0",
        formattedAmountIn: "",
        formattedAmountOut: ""
    }
}
