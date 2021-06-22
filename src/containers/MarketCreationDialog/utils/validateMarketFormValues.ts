import Big from "big.js";
import { MarketType } from "../../../models/Market";
import { OracleConfig } from "../../../models/OracleConfig";
import { formatCollateralToken } from "../../../services/CollateralTokenService";
import { MarketFormValues } from "../../../services/MarketService";
import trans from "../../../translation/trans";

export interface MarketFormErrors {
    canSubmit: boolean;
    upperBound: string;
    lowerBound: string;
    resolutionDate: string;
    closeDate: string;
    validityBond: string;
    decimals: string;
}

export function validateMarketFormValues(formValues: MarketFormValues, oracleConfig: OracleConfig): MarketFormErrors {
    const errors: MarketFormErrors = {
        canSubmit: true,
        upperBound: '',
        lowerBound: '',
        resolutionDate: '',
        closeDate: '',
        validityBond: '',
        decimals: '',
    };

    if (formValues.decimals) {
        const decimals = Number(formValues.decimals);

        // Number contains a floating number
        if (decimals % 1 !== 0) {
            errors.canSubmit = false;
            errors.decimals = trans('marketCreation.errors.cantBeFloating');
        }

        if (decimals < 0) {
            errors.canSubmit = false;
            errors.decimals = trans('marketCreation.errors.negativeDecimals');
        }

        if (decimals > 18) {
            errors.canSubmit = false;
            errors.decimals = trans('marketCreation.errors.decimalsCantBeTooHigh');
        }
    } else {
        errors.canSubmit = false;
    }

    if (formValues.type === MarketType.Scalar || formValues.type === MarketType.CryptoPrice) {
        if (formValues.upperBound.lte(formValues.lowerBound)) {
            errors.canSubmit = false;
            errors.upperBound = trans('marketCreation.errors.upperBoundLessThanLowerBound');
        }

        if (formValues.decimals) {
            const decimalsInUpperbound = formValues.upperBound.toString().split('.')[1]?.length ?? 0;
            const decimalsInLowerbound = formValues.lowerBound.toString().split('.')[1]?.length ?? 0;
            const decimals = Number(formValues.decimals);

            if (decimals < decimalsInLowerbound) {
                errors.lowerBound = trans('marketCreation.errors.tooManyDecimals', { decimals: decimals.toString() });
                errors.canSubmit = false;
            }

            if (decimals < decimalsInUpperbound) {
                errors.upperBound = trans('marketCreation.errors.tooManyDecimals', { decimals: decimals.toString() });
                errors.canSubmit = false;
            }
        }
    }

    if (formValues.type === MarketType.CryptoPrice) {
        if (!formValues.selectedTokenId) {
            errors.canSubmit = true;
        }
    }

    if (!formValues.description) {
        errors.canSubmit = false;
    }

    if (!formValues.extraInfo) {
        errors.canSubmit = false;
    }

    if (formValues.resolutionDate) {
        const now = new Date();

        if (now.getTime() >= formValues.resolutionDate.getTime()) {
            errors.canSubmit = false;
            errors.resolutionDate = trans('marketCreation.errors.resolutionDateEarlierThanToday');
        }
    }

    if (formValues.closeDate) {
        const now = new Date();

        if (now.getTime() >= formValues.closeDate.getTime()) {
            errors.canSubmit = false;
            errors.closeDate = trans('marketCreation.errors.closeDateEarlierThanToday');
        }

        if (formValues.closeDate.getTime() > formValues.resolutionDate.getTime()) {
            errors.canSubmit = false;
            errors.closeDate = trans('marketCreation.errors.closeDateLaterThanResolution');
        }
    }

    if (formValues.type === MarketType.Categorical) {
        if (formValues.outcomes.length <= 1) {
            errors.canSubmit = false;
        }

        if (formValues.outcomes.some(o => o.trim() === '')) {
            errors.canSubmit = false;
        }
    }

    if (new Big(oracleConfig.token.balance).lt(oracleConfig.validityBond)) {
        errors.validityBond = trans('marketCreation.errors.validityBond', {
            amount: formatCollateralToken(oracleConfig.validityBond.toString(), oracleConfig.token.decimals, 2),
            tokenName: oracleConfig.token.tokenSymbol,
        });
        errors.canSubmit = false;
    }

    return errors;
}
