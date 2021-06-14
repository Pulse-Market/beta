import React, { useCallback, useState } from 'react';
import Big from 'big.js';
import FluxSdk from '@fluxprotocol/amm-sdk';
import Dialog from '../../compositions/Dialog';
import { Account } from '../../models/Account';
import trans from '../../translation/trans';
import validateStorageManagerFormValues from './services/validateStorageManagerFormValues';

import createDefaultStorageManagerFormValues, { StorageManagerFormValues } from './services/createDefaultStorageManagerFormValues';
import s from './StorageManagerDialog.module.scss';
import { NATIVE_TOKEN_DECIMALS, NATIVE_TOKEN_NAME } from '../../config';
import LabeledTokenSelect from '../LabeledTokenSelect';
import { createEmptyTokenViewModel } from '../../models/TokenViewModel';

interface Props {
    open: boolean;
    account: Account;
    onRequestClose: () => void;
    onSubmit: (formValues: StorageManagerFormValues) => void;
}

export default function StorageManagerDialog({
    open,
    account,
    onRequestClose,
    onSubmit,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultStorageManagerFormValues());

    const errors = validateStorageManagerFormValues(formValues, account);
    const nearToken = createEmptyTokenViewModel(
        trans('storageManagerDialog.label.storageTokenName', { nativeToken: NATIVE_TOKEN_NAME }),
        NATIVE_TOKEN_NAME,
        account.storageAvailable.toString(),
        NATIVE_TOKEN_DECIMALS
    );

    function handleAmountChange(amount: string) {
        if (amount && new Big(amount).lt(0)) {
            return;
        }

        setFormValues({
            amount: amount ? FluxSdk.utils.toToken(amount, NATIVE_TOKEN_DECIMALS) : '0',
            amountFormatted: amount ? amount : '',
        });
    }

    const handleMaxClick = useCallback(() => {
        setFormValues({
            amount: account.storageAvailable.toString(),
            amountFormatted: FluxSdk.utils.formatToken(account.storageAvailable.toString(), NATIVE_TOKEN_DECIMALS, 4),
        });
    }, [account]);

    return (
        <Dialog
            open={open}
            onRequestClose={onRequestClose}
            title={trans('storageManagerDialog.title')}
            onSubmitClick={() => onSubmit(formValues)}
            canSubmit={errors.canSubmit}
        >
            <form>
                <p>
                    {trans('storageManagerDialog.description')}
                </p>
                <p>
                    {trans('storageManagerDialog.label.amountAvailable', {
                        amount: FluxSdk.utils.formatToken(account.storageAvailable.toString(), NATIVE_TOKEN_DECIMALS, 4),
                    })}
                </p>
                <div className={s.formItem}>
                    <LabeledTokenSelect
                        label={trans('storageManagerDialog.label.withdrawAmount')}
                        onTokenSwitch={() => {}}
                        selectedToken={nearToken}
                        tokens={[nearToken]}
                        value={formValues.amountFormatted}
                        onBalanceClick={handleMaxClick}
                        onValueChange={handleAmountChange}
                    />
                </div>
            </form>
        </Dialog>
    );
}
