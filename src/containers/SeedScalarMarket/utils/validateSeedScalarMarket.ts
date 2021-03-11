import Big from "big.js";
import { MarketViewModel } from "../../../models/Market";
import { getScalarBounds } from "../../../services/MarketService";
import { SeedScalarMarketFormValues } from "../../../services/PoolService";
import trans from "../../../translation/trans";

export interface SeedScalarMarketFormErrors {
    canSubmit: boolean;
    message: string;
    mainTokenInput: string;
    initialValue: string;
}

export function validateSeedScalarMarket(formValues: SeedScalarMarketFormValues, market: MarketViewModel): SeedScalarMarketFormErrors {
    const errors: SeedScalarMarketFormErrors = {
        canSubmit: true,
        message: '',
        mainTokenInput: '',
        initialValue: '',
    };

    const bounds = getScalarBounds(market.outcomeTokens.map(token => token.bound));

    if (formValues.initialValue.lt(bounds.lowerBound)) {
        errors.canSubmit = false;
        errors.initialValue = trans('seedScalarMarket.errors.initialValue.ltLowerBound');
    }

    if (formValues.initialValue.gt(bounds.upperBound)) {
        errors.canSubmit = false;
        errors.initialValue = trans('seedScalarMarket.errors.initialValue.gtUpperBound');
    }

    if (formValues.mainTokenInput) {
        const amountIn = new Big(formValues.mainTokenInput);

        if (amountIn.lte(0)) {
            errors.canSubmit = false;
        }
    }

    return errors;
}
