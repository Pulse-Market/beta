import React, { ReactElement, useState } from 'react';
import FluxSdk from '@fluxprotocol/amm-sdk';

import Error from '../../components/Error';
import IconButton from '../../components/IconButton';
import Dialog from '../../compositions/Dialog';
import { TokenViewModel } from '../../models/TokenViewModel';
import { WrapNearFormValues } from '../../services/NearService';
import trans from '../../translation/trans';
import swap from "./../../assets/images/icons/swap.svg";
import createDefaultWrapNearFormValues from './utils/createDefaultWrapNearFormValues';
import validateWrapNearFormValues from './utils/validateWrapNearFormValues';
import Button from '../../components/Button';
import LabeledTokenSelect from '../LabeledTokenSelect';

import s from './WrapNearDialog.module.scss';

interface Props {
    open: boolean;
    onRequestClose: () => void;
    onRequestSwitchPairs: () => void;
    onSubmit: (formValues: WrapNearFormValues) => void;
    input: TokenViewModel;
    output: TokenViewModel;
    requiredDeposit: string;
    onDepositClick: () => void;
}

export default function WrapNearDialog({
    open,
    onRequestClose,
    onRequestSwitchPairs,
    onSubmit,
    input,
    output,
    requiredDeposit,
    onDepositClick,
}: Props): ReactElement {
    const [formValues, setFormValues] = useState(createDefaultWrapNearFormValues());

    function handleSwitchTokenPlaces() {
        const wrapType = formValues.type === 'unwrap' ? 'wrap' : 'unwrap';

        setFormValues({
            ...formValues,
            amountInFormatted: '0',
            amountIn: '0',
            type: wrapType,
        });

        onRequestSwitchPairs();
    }

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            amountIn: input.balance,
            amountInFormatted: FluxSdk.utils.formatToken(input.balance, input.decimals, 2),
        });
    }

    function handleInputChange(value: string) {
        setFormValues({
            ...formValues,
            amountIn: value !== '' ? FluxSdk.utils.toToken(value, input.decimals) : '0',
            amountInFormatted: value,
        });
    }

    function handleSubmit() {
        onSubmit(formValues);
    }

    const errors = validateWrapNearFormValues(formValues, input);

    return (
        <Dialog
            title={trans('wrapNearDialog.title')}
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={handleSubmit}
            canSubmit={errors.canSubmit}
            hideButtons={requiredDeposit !== '0'}
        >

            {requiredDeposit === '0' && (
                <>
                    <p>{trans('wrapNearDialog.description')}</p>
                    <div className={s.token}>
                        <LabeledTokenSelect
                            label={trans('market.label.youPay')}
                            onTokenSwitch={() => { }}
                            value={formValues.amountInFormatted}
                            tokens={[input]}
                            selectedToken={input}
                            onValueChange={(v) => handleInputChange(v)}
                            showPrice={false}
                            onBalanceClick={handleBalanceClick}
                        />
                    </div>

                    <div className={s.switchTokens}>
                        <IconButton onClick={handleSwitchTokenPlaces} icon={swap} alt={trans('market.action.switchTokens')} />
                    </div>

                    <div className={s.token}>
                        <LabeledTokenSelect
                            label={trans('market.label.youReceive')}
                            onTokenSwitch={() => { }}
                            value={formValues.amountInFormatted}
                            tokens={[output]}
                            selectedToken={output}
                            disabledInput
                            showPrice={false}
                        />
                    </div>
                </>
            )}

            {requiredDeposit !== '0' && (
                <>
                    <p>{trans('wrapNearDialog.requiredDeposit.description', { amount: FluxSdk.utils.formatToken(requiredDeposit, 24, 5) })}</p>
                    <div className={s.depositButtons}>
                        <Button className={s.depositCancelButton} onClick={onDepositClick}>{trans('global.action.cancel')}</Button>
                        <Button onClick={onDepositClick}>{trans('wrapNearDialog.requiredDeposit.submit', { amount: FluxSdk.utils.formatToken(requiredDeposit, 24, 5) })}</Button>
                    </div>
                </>
            )}

            <Error error={errors.amountIn} />
        </Dialog>
    );
}
