import Big from "big.js";
import { Account } from "../../../models/Account";
import trans from "../../../translation/trans";
import { StorageManagerFormValues } from "./createDefaultStorageManagerFormValues";

interface StorageManagerErrors {
    amount: string;
    canSubmit: boolean;
}

export default function validateStorageManagerFormValues(formValues: StorageManagerFormValues, account: Account): StorageManagerErrors {
    const errors: StorageManagerErrors = {
        amount: '',
        canSubmit: true,
    }

    if (formValues.amount) {
        const amountToWithdraw = new Big(formValues.amount);

        if (amountToWithdraw.gt(account.storageAvailable)) {
            errors.amount = trans('storageManagerDialog.errors.withdrawAmount.notEnoughToWithdraw');
            errors.canSubmit = false;
        }

        if (amountToWithdraw.lte(0)) {
            errors.canSubmit = false;
        }
    }

    return errors;
}
