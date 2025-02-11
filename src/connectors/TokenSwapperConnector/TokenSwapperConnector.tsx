import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BUY } from '../../config';
import TokenSwapper from '../../containers/TokenSwapper';
import TokenSwapperLoader from '../../containers/TokenSwapper/TokenSwapperLoader';
import { TokenViewModel } from '../../models/TokenViewModel';
import { reloadTokens } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { buyShares, sellShares } from '../../services/MarketService';
import { SwapFormValues } from '../../services/SwapService';

const TOKEN_FETCH_INTERVAL_MS = 5000;

interface Props {
    className?: string;
}

export default function TokenSwapperConnector({
    className,
}: Props): ReactElement {
    const dispatch = useDispatch();
    const [switched, setSwitched] = useState(false);
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const intervalId = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            // @ts-ignore
            clearInterval(intervalId.current);
        }
    }, []);

    useEffect(() => {
        if (!market) return;

        clearInterval(intervalId.current as unknown as number);

        intervalId.current = setInterval(() => {
            dispatch(reloadTokens(market.id, market.collateralToken));
        }, TOKEN_FETCH_INTERVAL_MS);

        return () => {
            clearInterval(intervalId.current as unknown as number);
        }
    }, [market, dispatch]);

    async function onConfirm(
        values: SwapFormValues
    ): Promise<void> {
        if (!market) throw new Error("Market is undefined");

        if (values.type === BUY) {
            buyShares(market, values);
        } else {
            sellShares(market, values);
        }
    }

    function handleRequestSwitchPairs() {
        setSwitched(!switched);
    }

    if (!market) {
        return <TokenSwapperLoader />;
    }

    const inputs: TokenViewModel[] = [market.collateralToken];

    return (
        <TokenSwapper
            market={market}
            inputs={switched ? market.outcomeTokens : inputs}
            outputs={switched ? inputs : market.outcomeTokens}
            onConfirm={onConfirm}
            onRequestSwitchPairs={handleRequestSwitchPairs}
            className={className}
        />
    );
}
