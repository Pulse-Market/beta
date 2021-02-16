import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { TokenViewModel } from '../../models/TokenViewModel';

import s from './TokenSelect.module.scss';
import trans from '../../translation/trans';
import Token from '../../components/Token';
import NonLinkButton from '../../components/NonLinkButton';
import TokenDropdown from './components/TokenDropdown/TokenDropdown';
import Error from '../../components/Error';
import { getColorForOutcome } from '../../utils/getColorForOutcome';

interface Props {
    className?: string;
    selectedToken: TokenViewModel;
    tokens: TokenViewModel[];
    value: string;
    error?: string;
    showPrice?: boolean;
    onValueChange?: (newValue: string) => void;
    onTokenSwitch: (token: TokenViewModel) => void;
    placeholder?: string;
    disabledInput?: boolean;
}

export default function TokenSelect({
    selectedToken,
    tokens,
    value,
    onTokenSwitch,
    onValueChange = () => {},
    showPrice = true,
    className = '',
    placeholder = '0',
    disabledInput = false,
}: Props) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleChangePairClick = useCallback(() => {
        setDropdownOpen(!isDropdownOpen);
    }, [isDropdownOpen]);

    const handleTokenClick = useCallback((token: TokenViewModel) => {
        setDropdownOpen(false);
        onTokenSwitch(token);
    }, [onTokenSwitch]);

    const priceClassName = classnames(s.price, {
        [s['price--symbol-right']]: selectedToken.priceSymbolPosition === 'right',
    });

    return (
        <div className={classnames(s['token-select'], className)}>
            <div className={s['token-select__info']}>
                <span>{selectedToken.tokenName} {trans('global.token')}</span>
                {showPrice && (
                    <span className={priceClassName}>
                        <span className={s.priceSymbol}>{selectedToken.priceSymbol}</span>
                        <span>{selectedToken.price.toFixed(3)}</span>
                    </span>
                )}
                {!showPrice && <span />}
            </div>
            <div className={s['token-select__inputs']}>
                <div className={s['token-select__inputs-info']}>
                    <Token
                        tokenName={selectedToken.tokenName}
                        tokenImage={selectedToken.tokenImage}
                        colorVar={getColorForOutcome(selectedToken.outcomeId)}
                        className={s['token-select__token-icon']}
                    />

                    {tokens.length === 1 && (
                        <span className={s['token-select__token-name']}>{selectedToken.tokenName}</span>
                    )}

                    {tokens.length > 1 && (
                        <NonLinkButton type="button" onClick={handleChangePairClick}>
                            {isDropdownOpen ? trans('global.action.cancel') : trans('market.action.changeTradingPair')}
                        </NonLinkButton>
                    )}
                </div>
                <input
                    type="number"
                    value={value}
                    placeholder={placeholder}
                    disabled={disabledInput}
                    className={s['token-select__input']}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>
            {tokens.length > 1 && isDropdownOpen && (
                <TokenDropdown onTokenClick={handleTokenClick} tokens={tokens} />
            )}
        </div>
    );
}
