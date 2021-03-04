import React from 'react';
import classnames from 'classnames';
import TextButton from '../../components/TextButton';
import trans from '../../translation/trans';

import TokenSelect, { TokenSelectProps } from '../TokenSelect/TokenSelect';

import s from './LabeledTokenSelect.module.scss';

interface Props extends TokenSelectProps {
    label: string;
    onBalanceClick?: () => void;
}

export default function LabeledTokenSelect({
    label,
    selectedToken,
    onBalanceClick,
    ...props
}: Props) {
    return (
        <div>
            <div className={classnames(s.tokenHeader, s.noMargin)}>
                <span>{label}</span>
                <TextButton disabled={!Boolean(onBalanceClick)} onClick={onBalanceClick} className={s.balanceButton}>
                    {trans('global.balance', {}, true)}: {selectedToken.balanceFormatted}
                </TextButton>
            </div>
            <TokenSelect
                {...props}
                selectedToken={selectedToken}
            />
        </div>
    );
}
