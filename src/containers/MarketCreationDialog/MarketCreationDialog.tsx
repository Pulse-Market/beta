import React, { ReactElement, useMemo, useRef, useState } from 'react';

import DateTimePicker from '../../components/DateTimePicker';
import Label from '../../components/Label';
import Tag from '../../components/Tag';
import TextInput from '../../components/TextInput';
import Dialog from '../../compositions/Dialog';
import { MarketCategory, MarketType } from '../../models/Market';
import { MarketFormValues } from '../../services/MarketService';
import trans from '../../translation/trans';
import AddableInputs from '../AddableInputs';
import createDefaultMarketFormValues from './utils/createDefaultMarketFormValues';

import s from './MarketCreationDialog.module.scss';
import Select from '../../components/Select';
import { SelectItem } from '../../components/Select/Select';
import { TokenMetadata } from '../../models/TokenMetadata';
import ToggleButtons from '../../components/ToggleButtons';
import Big from 'big.js';
import { validateMarketFormValues } from './utils/validateMarketFormValues';
import { formatCollateralToken } from '../../services/CollateralTokenService';
import { OracleConfig } from '../../models/OracleConfig';
import { TokenViewModel } from '../../models/TokenViewModel';
import { prettyFormatDate } from '../../services/DateService';

interface Props {
    open: boolean;
    oracleConfig: OracleConfig;
    submitLoading: boolean;
    tokenWhitelist: TokenMetadata[];
    tokens: TokenViewModel[];
    onRequestClose: () => void;
    onSubmit: (values: MarketFormValues) => void;
}

export default function MarketCreationDialog({
    open,
    tokenWhitelist,
    onRequestClose,
    onSubmit,
    tokens,
    submitLoading,
    oracleConfig,
}: Props): ReactElement {
    const formRef = useRef<HTMLFormElement>(null);
    const [formValues, setFormValues] = useState(createDefaultMarketFormValues());
    const marketCategories = useMemo(() => Object.values(MarketCategory).filter(category => category !== MarketCategory.Unknown), []);
    const selectedToken = tokens.find(token => token.id === formValues.selectedTokenId);

    function handleFormSubmit() {
        onSubmit(formValues);
    }

    function handleCategoryClick(category: MarketCategory) {
        let activeCategories = formValues.categories;

        if (activeCategories?.includes(category)) {
            activeCategories = activeCategories.filter(cat => cat !== category);
        } else {
            activeCategories?.push(category);
        }

        setFormValues({
            ...formValues,
            categories: activeCategories,
        });
    }

    function handleResolutionDateChange(date: Date | null) {
        if (!date) return;

        const newValues: MarketFormValues = {
            ...formValues,
            resolutionDate: date,
        };

        if (formValues.type === MarketType.CryptoPrice) {
            newValues.extraInfo = trans('marketCreation.description.cryptoPriceResolutionInfo', {
                url: `https://www.coingecko.com/en/coins/${selectedToken?.id ?? ''}`,
                time: newValues.resolutionDate.getTime().toString(),
                tokenSymbol: selectedToken?.tokenSymbol ?? '',
                tokenName: selectedToken?.tokenName ?? '',
            });

            newValues.description = trans('marketCreation.description.cryptoPrice', {
                tokenName: selectedToken?.tokenName ?? '',
                tokenSymbol: selectedToken?.tokenSymbol ?? '',
            });
        }

        setFormValues(newValues);
    }

    function handleCloseDateChange(date: Date | null) {
        if (!date) return;

        setFormValues({
            ...formValues,
            closeDate: date,
        });
    }

    function handleOutcomesChange(outcomes: string[]) {
        setFormValues({
            ...formValues,
            outcomes,
        });
    }

    function handleDescriptionChange(description: string) {
        setFormValues({
            ...formValues,
            description,
        });
    }

    function handleExtraInfoChange(extraInfo: string) {
        setFormValues({
            ...formValues,
            extraInfo,
        });
    }

    function handleCollateralChange(item: SelectItem) {
        setFormValues({
            ...formValues,
            collateralTokenId: item.value,
        });
    }

    function handleMarketTypeChange(type: MarketType | null) {
        if (type === null) return;
        setFormValues({
            ...formValues,
            type,
        });
    }

    function handleLowerBoundChange(value: string) {
        if (!value) return;

        setFormValues({
            ...formValues,
            lowerBound: new Big(value),
        });
    }

    function handleUpperBoundChange(value: string) {
        if (!value) return;

        setFormValues({
            ...formValues,
            upperBound: new Big(value),
        });
    }

    function handleTokenChange(item: SelectItem) {
        const token = tokens.find(token => token.id === item.value);

        setFormValues({
            ...formValues,
            selectedTokenId: item.value,
            description: trans('marketCreation.description.cryptoPrice', {
                tokenName: token?.tokenName ?? '',
                tokenSymbol: token?.tokenSymbol ?? '',
                date: prettyFormatDate(formValues.resolutionDate),
            }),
            extraInfo: trans('marketCreation.description.cryptoPriceResolutionInfo', {
                url: `https://www.coingecko.com/en/coins/${token?.id ?? ''}`,
                time: formValues.resolutionDate.getTime().toString(),
                tokenSymbol: token?.tokenSymbol ?? '',
                tokenName: token?.tokenName ?? '',
            }),
        });
    }

    function handleDecimalsChange(value: string) {
        setFormValues({
            ...formValues,
            decimals: value,
        });
    }

    const errors = validateMarketFormValues(formValues, oracleConfig);

    return (
        <Dialog
            open={open}
            submitLoading={submitLoading}
            title=""
            canSubmit={errors.canSubmit}
            onRequestClose={onRequestClose}
            onSubmitClick={handleFormSubmit}
        >
            <form className={s.filters} ref={formRef}>
                <div className={s.inputsWrapper}>
                    <label className={s.label}>
                        {trans('marketCreation.label.categorySelect')}
                    </label>
                    <div className={s.categories}>
                        {marketCategories.map((category) => (
                            <Tag
                                key={category}
                                category={category}
                                className={s.filter}
                                active={formValues.categories.includes(category)}
                                onClick={() => handleCategoryClick(category)}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
                <div className={s.inputsWrapper}>
                    <label className={s.label}>
                        {trans('marketCreation.label.collateralToken')}
                    </label>
                    <Select
                        onChange={handleCollateralChange}
                        value={formValues.collateralTokenId}
                        items={tokenWhitelist.map((metadata) => ({
                            label: metadata.symbol,
                            value: metadata.collateralTokenId,
                        }))}
                    />
                </div>
                <div className={s.inputsWrapper}>
                    <label className={s.label}>
                        {trans('marketCreation.label.marketType')}
                    </label>
                    <ToggleButtons
                        exclusive
                        buttonClassName={s.marketType}
                        selectedClassName={s['marketType--selected']}
                        value={formValues.type}
                        onChange={handleMarketTypeChange}
                        items={[
                            {
                                id: MarketType.Binary,
                                text: trans('marketCreation.label.binary'),
                            },
                            {
                                id: MarketType.Categorical,
                                text: trans('marketCreation.label.categorical'),
                            },
                            {
                                id: MarketType.Scalar,
                                text: trans('marketCreation.label.scalar'),
                            },
                            {
                                id: MarketType.CryptoPrice,
                                text: trans('marketCreation.label.cryptoPrice'),
                            }
                        ]}
                    />
                </div>

                {formValues.type !== MarketType.CryptoPrice && (
                    <>
                        <div className={s.inputsWrapper}>
                            <label className={s.label}>
                                {trans('marketCreation.label.description')}
                            </label>
                            <TextInput required multiline onChange={handleDescriptionChange} value={formValues.description} />
                        </div>
                        <div className={s.inputsWrapper}>
                            <label className={s.label}>
                                {trans('marketCreation.label.extraInfo')}
                            </label>
                            <TextInput required multiline onChange={handleExtraInfoChange} value={formValues.extraInfo} />
                        </div>
                    </>
                )}

                {formValues.type === MarketType.CryptoPrice && (
                    <div className={s.inputsWrapper}>
                        <label className={s.label}>
                            {trans('marketCreation.label.selectCoin')}
                        </label>
                        <Select
                            onChange={handleTokenChange}
                            value={formValues.selectedTokenId}
                            items={tokens.map((token) => ({
                                label: `${token.tokenName} - ${token.tokenSymbol}`,
                                value: token.id,
                            }))}
                        />
                    </div>
                )}

                {formValues.type === MarketType.Categorical && (
                    <div className={s.inputsWrapper}>
                        <Label text={trans('marketCreation.label.outcomes')} />
                        <AddableInputs
                            onChange={handleOutcomesChange}
                            values={formValues.outcomes}
                            disableAddButton={formValues.outcomes.length >= oracleConfig.maxOutcomes}
                        />
                    </div>
                )}

                {(formValues.type === MarketType.Scalar || formValues.type === MarketType.CryptoPrice) && (
                    <>
                        <div className={s.inputsWrapper}>
                            <Label text={trans('marketCreation.label.scalarDecimals')} />
                            <TextInput
                                type="number"
                                value={formValues.decimals.toString()}
                                onChange={handleDecimalsChange}
                                error={!!errors.decimals}
                                helperText={errors.decimals}
                            />
                        </div>
                        <div className={s.inputsWrapper}>
                            <Label text={trans('marketCreation.label.scalarLowerBound')} />
                            <TextInput type="number" value={formValues.lowerBound.toString()} onChange={handleLowerBoundChange} helperText={errors.lowerBound} error={!!errors.lowerBound} />
                        </div>
                        <div className={s.inputsWrapper}>
                            <Label text={trans('marketCreation.label.scalarUpperBound')} />
                            <TextInput type="number" value={formValues.upperBound.toString()} onChange={handleUpperBoundChange} helperText={errors.upperBound} error={!!errors.upperBound} />
                        </div>
                    </>
                )}

                <div className={s.inputsWrapper}>
                    <label className={s.label}>
                        {trans('marketCreation.label.marketClose')}
                    </label>

                    <DateTimePicker
                        value={formValues.closeDate}
                        onChange={handleCloseDateChange}
                        helperText={errors.closeDate || trans('marketCreation.label.helperText.marketClose')}
                        error={!!errors.closeDate}
                    />
                </div>

                <div className={s.inputsWrapper}>
                    <label className={s.label}>
                        {trans('marketCreation.label.resolutionDate')}
                    </label>

                    <DateTimePicker
                        value={formValues.resolutionDate}
                        onChange={handleResolutionDateChange}
                        helperText={errors.resolutionDate || trans('marketCreation.label.helperText.resolutionDate')}
                        error={!!errors.resolutionDate}
                    />
                </div>

                {formValues.type === MarketType.CryptoPrice && selectedToken && (
                    <>
                        <div className={s.inputsWrapper}>
                            <label className={s.label}>
                                {trans('marketCreation.label.cryptoPriceDescription')}
                            </label>
                            <p>
                                {formValues.description}
                            </p>
                        </div>

                        <div className={s.inputsWrapper}>
                            <label className={s.label}>
                                {trans('marketCreation.label.cryptoPriceResolutionInfo')}
                            </label>
                            <p>
                                {formValues.extraInfo}
                            </p>
                        </div>
                    </>
                )}

                <div className={s.inputsWrapper}>
                    {!errors.validityBond && trans('marketCreation.label.oracleBond', {
                        amount: formatCollateralToken(oracleConfig.validityBond.toString(), oracleConfig.token.decimals, 2),
                        tokenName: oracleConfig.token.tokenSymbol,
                    })}

                    {errors.validityBond}
                </div>
            </form>
        </Dialog>
    );
}
