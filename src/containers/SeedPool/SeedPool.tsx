import React, { useEffect, useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '../../components/Button';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import { Account } from '../../models/Account';
import { MarketViewModel } from '../../models/Market';
import trans from '../../translation/trans';
import createDefaultSeedPoolFormValues from './services/createDefaultSeedPoolFormValues';
import { validateSeedPool } from './services/validateSeedPool';
import { TokenViewModel } from '../../models/TokenViewModel';
import { SeedPoolFormValues } from '../../services/PoolService';

import s from './SeedPool.module.scss';
import Error from '../../components/Error';
import { toCollateralToken } from '../../services/CollateralTokenService';
import LabeledTokenSelect from '../LabeledTokenSelect';

interface Props {
    market: MarketViewModel;
    mainToken: TokenViewModel;
    account: Account | null,
    onSeedPool: (values: SeedPoolFormValues) => void;
}

export default function SeedPool({
    market,
    account,
    mainToken,
    onSeedPool,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultSeedPoolFormValues());

    function handlePercentageChange(index: number, value: string) {
        const percentages = formValues.outcomePercentages;
        percentages[index] = value;

        setFormValues({
            ...formValues,
            outcomePercentages: percentages
        });
    }

    function handleMainTokenChange(value: string) {
        setFormValues({
            ...formValues,
            mainTokenInputFormatted: value,
            mainTokenInput: value ? toCollateralToken(value, mainToken.decimals) : '',
        });
    }

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            mainTokenInputFormatted: mainToken.balanceFormatted,
            mainTokenInput: mainToken.balance,
        });
    }

    useEffect(() => {
        setFormValues((values) => ({
            ...values,
            outcomePercentages: market.outcomeTokens.map(() => '0')
        }));
    }, [market.outcomeTokens]);

    const errors = validateSeedPool(formValues, market);

    return (
        <div>
            <form>
                <p>{trans('seedPool.explanation', { tokenName: mainToken.tokenName })}</p>

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

                <h3>{trans('seedPool.weightsTitle')}</h3>
                {formValues.outcomePercentages.map((percentage, index) => (
                    <div className={s.inputWrapper} key={index}>
                        <Label text={market.outcomeTokens.find(outcome => outcome.outcomeId === index)?.tokenName || ""} />
                        <TextInput
                            value={percentage}
                            type="number"
                            onChange={(value) => handlePercentageChange(index, value)}
                            error={!!errors.outcomePercentages[index]}
                            helperText={errors.outcomePercentages[index]}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <span className={s.adornement}>%</span>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                ))}

                {!errors.canSeed && <p>{errors.message}</p>}

                <Button
                    className={s.confirmButton}
                    disabled={!errors.canSeed}
                    onClick={() => onSeedPool(formValues)}
                >
                    {trans('seedPool.action.submit')}
                </Button>
            </form>
        </div>
    );
}
