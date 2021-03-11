import React, { useState } from 'react';

import FluxSdk from '@fluxprotocol/amm-sdk';
import Big from 'big.js';

import Button from '../../components/Button';
import Error from '../../components/Error';
import LabeledTextInput from '../../compositions/LabeledTextInput';
import { MarketViewModel } from '../../models/Market';
import { getScalarBounds } from '../../services/MarketService';
import { SeedScalarMarketFormValues } from '../../services/PoolService';
import trans from '../../translation/trans';
import LabeledTokenSelect from '../LabeledTokenSelect';
import { createDefaultSeedScalarFormValues } from './utils/createDefaultSeedScalarFormValues';
import { validateSeedScalarMarket } from './utils/validateSeedScalarMarket';

import s from './SeedScalarMarket.module.scss';
import { prettyFormatNumber } from '../../utils/prettyFormatNumber';

interface Props {
    market: MarketViewModel;
    onSubmit: (values: SeedScalarMarketFormValues) => void;
}

export default function SeedScalarMarket({
    market,
    onSubmit,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultSeedScalarFormValues(market));
    const mainToken = market.collateralToken;
    const bounds = getScalarBounds(market.outcomeTokens.map(token => token.bound));

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            mainTokenInputFormatted: mainToken.balanceFormatted,
            mainTokenInput: mainToken.balance,
        });
    }

    function handleMainTokenChange(value: string) {
        const settedValue = value || '0';

        setFormValues({
            ...formValues,
            mainTokenInput: FluxSdk.utils.toToken(settedValue, mainToken.decimals),
            mainTokenInputFormatted: settedValue,
        });
    }

    function handleInitialValueChange(value: string) {
        if (!value) return;

        setFormValues({
            ...formValues,
            initialValue: new Big(value),
        });
    }

    const errors = validateSeedScalarMarket(formValues, market);

    return (
        <section>
            <form>
                <p>
                    {trans('seedScalarMarket.explanation', {
                        tokenName: market.collateralToken.tokenSymbol,
                    })}
                </p>

                <div className={s.inputWrapper}>
                    <LabeledTokenSelect
                        label=""
                        onBalanceClick={handleBalanceClick}
                        onTokenSwitch={() => { }}
                        value={formValues.mainTokenInputFormatted}
                        tokens={[mainToken]}
                        selectedToken={mainToken}
                        onValueChange={handleMainTokenChange}
                        placeholder="1000"
                    />
                    <Error error={errors.mainTokenInput} />
                </div>

                <div className={s.inputWrapper}>
                    <div className={s.bounds}>
                        <span>{trans('seedScalarMarket.label.lowerBound', { amount: prettyFormatNumber(bounds.lowerBound.toString()) })}</span>
                        <span>{trans('seedScalarMarket.label.upperBound', { amount: prettyFormatNumber(bounds.upperBound.toString()) })}</span>
                    </div>
                    <LabeledTextInput
                        type="number"
                        label={trans('seedScalarMarket.label.initialValue')}
                        value={formValues.initialValue.toString()}
                        onChange={handleInitialValueChange}
                        helperText={errors.initialValue}
                        error={!!errors.initialValue}
                    />
                </div>

                <Button
                    className={s.confirmButton}
                    disabled={!errors.canSubmit}
                    onClick={() => onSubmit(formValues)}
                >
                    {trans('seedScalarMarket.action.submit')}
                </Button>
            </form>
        </section>
    );
}
