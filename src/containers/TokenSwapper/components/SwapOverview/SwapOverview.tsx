import React, { ReactElement } from 'react';
import { DEFAULT_SLIPPAGE } from '../../../../config';
import { SwapFormValues } from '../../../../services/SwapService';
import trans from '../../../../translation/trans';

import s from './SwapOverview.module.scss';
import mutateFormValues from './utils/overviewMutation';

interface SwapOverviewProps {
    formValues: SwapFormValues
}

export default function SwapOverview({formValues}: SwapOverviewProps): ReactElement {
    let formattedFormValues = mutateFormValues(formValues);

    return (
        <div className={s['swap-overview']}>
            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.rate')}</span>
                <span className={s['swap-overview__info-value']}>{formattedFormValues.rateInOut} {formValues.fromToken.tokenSymbol} / {formValues.toToken.tokenSymbol}</span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.inverseRate')}</span>
                <span className={s['swap-overview__info-value']}>{formattedFormValues.rateOutIn} {formValues.toToken.tokenSymbol} / {formValues.fromToken.tokenSymbol}</span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.estimatedFee')}</span>
                <span className={s['swap-overview__info-value']}>${formattedFormValues.feePaid}</span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.maxSlippage')}</span>
                <span className={s['swap-overview__info-value']}>{DEFAULT_SLIPPAGE}%</span>
            </div>
        </div>
    );
}
