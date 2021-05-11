import { MarketType } from "../../../models/Market";
import { MarketFormValues } from "../../../services/MarketService";
import trans from "../../../translation/trans";

export interface MarketFormErrors {
    canSubmit: boolean;
    upperBound: string;
    resolutionDate: string;
    closeDate: string;
}

export function validateMarketFormValues(formValues: MarketFormValues): MarketFormErrors {
    const errors: MarketFormErrors = {
        canSubmit: true,
        upperBound: '',
        resolutionDate: '',
        closeDate: '',
    };

    if (formValues.type === MarketType.Scalar) {
        if (formValues.upperBound.lte(formValues.lowerBound)) {
            errors.canSubmit = false;
            errors.upperBound = trans('marketCreation.errors.upperBoundLessThanLowerBound');
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

    return errors;
}
