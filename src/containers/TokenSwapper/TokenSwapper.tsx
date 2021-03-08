import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import FluxSdk from '@fluxprotocol/amm-sdk';
import Big from 'big.js';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';
import SwapOverview from './components/SwapOverview/SwapOverview';
import createDefaultSwapFormValues from './utils/createDefaultSwapFormValues';
import { SwapFormValues } from '../../services/SwapService';
import mutateFormValues from './utils/formValuesMutation';
import { MarketType, MarketViewModel } from '../../models/Market';
import { toCollateralToken } from '../../services/CollateralTokenService';
import { BUY, SELECTED_OUTCOME_TOKEN_STORAGE_KEY, SELL } from '../../config';
import swap from "./../../assets/images/icons/swap.svg";
import { validateSwapFormValues } from './utils/validateSwapFormValues';
import Error from '../../components/Error';
import { getScalarLongShortTokens } from '../../services/MarketService';
import { SwapType } from '../../services/PriceService';
import LabeledTokenSelect from '../LabeledTokenSelect';

import s from './TokenSwapper.module.scss';
import { getNumberFromStorage } from '../../utils/storage';

interface TokenSwapperProps {
    inputs: TokenViewModel[];
    outputs: TokenViewModel[];
    onRequestSwitchPairs: () => void;
    onConfirm: (formData: SwapFormValues) => Promise<void>;
    className?: string;
    market: MarketViewModel;
}

export default function TokenSwapper({
    market,
    inputs,
    outputs,
    onConfirm,
    onRequestSwitchPairs,
    className = '',
}: TokenSwapperProps): ReactElement {
    const rememberedOutcome = getNumberFromStorage(sessionStorage, `${SELECTED_OUTCOME_TOKEN_STORAGE_KEY}${market.id}`) ?? 0;
    const [formValues, setFormValues] = useState(createDefaultSwapFormValues(inputs[0], outputs[rememberedOutcome]));
    const collateralToken = inputs.length === 1 ? inputs[0] : outputs[0];

    function handleSubmit(mutatedValues: SwapFormValues) {
        onConfirm(mutatedValues);
    }

    function handleInputTokenSwitch(token: TokenViewModel) {
        if (!token.isCollateralToken) {
            sessionStorage.setItem(`${SELECTED_OUTCOME_TOKEN_STORAGE_KEY}${market.id}`, token.outcomeId.toString());
        }

        setFormValues({
            ...formValues,
            fromToken: token
        });
    }

    function handleOutputTokenSwitch(token: TokenViewModel) {
        if (!token.isCollateralToken) {
            sessionStorage.setItem(`${SELECTED_OUTCOME_TOKEN_STORAGE_KEY}${market.id}`, token.outcomeId.toString());
        }

        setFormValues({
            ...formValues,
            toToken: token
        });
    }

    function handleAmountInChange(value: string) {
        setFormValues({
            ...formValues,
            formattedAmountIn: value,
            amountIn: value ? toCollateralToken(value, collateralToken.decimals) : "0"
        });
    }

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            amountIn: formValues.fromToken.balance,
            formattedAmountIn: formValues.fromToken.balanceFormatted,
        });
    }

    // TODO: mutation makes token values after switch go down recursively, should only switch between 2 states
    function switchTokenPlaces() {
        setFormValues({
            ...formValues,
            type: inputs.length === 1 ? SELL : BUY,
            amountIn: formValues.amountOut,
            amountOut: formValues.amountIn,
            formattedAmountIn: formValues.formattedAmountOut,
            formattedAmountOut: formValues.formattedAmountIn,
            fromToken: formValues.toToken,
            toToken: formValues.fromToken,
        });
        onRequestSwitchPairs();
    }

    const poolTokens = outputs.length > 1 ? outputs : inputs;
    const mutation = mutateFormValues(formValues, poolTokens, market);
    const errors = validateSwapFormValues(mutation, market);
    const scalarTokens = getScalarLongShortTokens(market.outcomeTokens);
    const swapType = mutation.type as SwapType;
    const newEstimate = FluxSdk.utils.calcScalarValue(
        scalarTokens.lowerBound,
        scalarTokens.upperBound,
        new Big(mutation.newPrices[scalarTokens.longToken.outcomeId])
    );

    return (
        <form className={classnames(s['token-swapper'], className)}>
            <LabeledTokenSelect
                label={trans('market.label.youPay')}
                onBalanceClick={handleBalanceClick}
                onTokenSwitch={handleInputTokenSwitch}
                value={mutation.formattedAmountIn}
                tokens={inputs}
                selectedToken={mutation.fromToken}
                onValueChange={(v) => handleAmountInChange(v)}
                newPrice={mutation.fromToken.isCollateralToken ? undefined : mutation.newPrices[mutation.fromToken.outcomeId]}
            />

            <div className={s['token-swapper__switch-tokens']}>
                <IconButton onClick={switchTokenPlaces} icon={swap} alt={trans('market.action.switchTokens')} />
            </div>

            <div className={s.receiveInputs}>
                <LabeledTokenSelect
                    label={trans('market.label.youReceive')}
                    onTokenSwitch={handleOutputTokenSwitch}
                    value={mutation.formattedAmountOut}
                    tokens={outputs}
                    selectedToken={mutation.toToken}
                    disabledInput
                    newPrice={mutation.toToken.isCollateralToken ? undefined : mutation.newPrices[mutation.toToken.outcomeId]}
                />
            </div>

            {market.type === MarketType.Scalar && swapType === SwapType.Buy && (
                <div className={s.newEstimateWrapper}>
                    <span className={s.newEstimateText}>
                        {scalarTokens.longToken.outcomeId === mutation.toToken.outcomeId ?
                            trans('market.overview.estimateMoreAfterTrade') :
                            trans('market.overview.estimateLessAfterTrade')
                        }
                    </span>
                    <span>{newEstimate.toFixed(2)}</span>
                </div>
            )}

            <SwapOverview formValues={mutation} market={market} />
            <Error error={errors.message} />

            <Button disabled={!errors.canSubmit} onClick={() => handleSubmit(mutation)} className={s['token-swapper__confirm']}>
                {trans('market.action.confirmSwap')}
            </Button>
        </form>
    );
}
