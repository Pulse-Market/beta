import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';

import MarketHeaderConnector from '../../connectors/MarketHeaderConnector';
import MarketResolutionInfoConenctor from '../../connectors/MarketResolutionInfoConnector';
import MarketStatisticsConnector from '../../connectors/MarketStatisticsConnector';
import TokenSwapperConnector from '../../connectors/TokenSwapperConnector';
import Page from '../../containers/Page';
import { loadMarket } from '../../redux/market/marketActions';
import trans from '../../translation/trans';
import ActionsCard from '../../components/ActionsCard';
import TabbedView from '../../containers/TabbedViews';
import LiquidityProviderConnector from '../../connectors/LiquidityProviderConnector';
import { Reducers } from '../../redux/reducers';
import ClaimEarningsConnector from '../../connectors/ClaimEarningsConnector';
import SeedPoolConnector from '../../connectors/SeedPoolConnector';
import MarketClosed from '../../containers/MarketClosed';
import ExitPoolConnector from '../../connectors/ExitPoolConnector';
import NotLoggedInConnector from '../../connectors/NotLoggedInConnector';
import { setMarketDetail } from '../../redux/market/market';
import NoBalanceCardConnector from '../../connectors/NoBalanceCardConnector';
import { isEligibleForRedeeming } from '../../services/MarketService';
import RedeemConnector from '../../connectors/RedeemConnector';
import NotInWhitelistCard from '../../containers/NotInWhitelistCard';
import { MarketType } from '../../models/Market';
import SeedScalarMarketConnector from '../../connectors/SeedScalarMarketConnector';
import MarketCommentsConnector from '../../connectors/MarketCommentsConnector';

import s from './MarketPage.module.scss';
import NoBalanceDialogconnector from '../../connectors/NoBalanceDialogConnector';

interface RouterParams {
    marketId: string;
}

export default function MarketPage() {
    const dispatch = useDispatch();
    const account = useSelector((store: Reducers) => store.account.account);
    const accountLoading = useSelector((store: Reducers) => store.account.loading);
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const poolToken = useSelector((store: Reducers) => store.market.poolTokenBalance);
    const { marketId } = useParams<RouterParams>();

    const hasMarketLiquidity = market?.poolTokenInfo.totalSupply !== '0';
    const isExpired = market?.resolutionDate ? market.resolutionDate <= new Date() : false;
    const canRedeem = isEligibleForRedeeming(market?.outcomeTokens || []);

    useEffect(() => {
        dispatch(loadMarket(marketId));

        return () => {
            dispatch(setMarketDetail(undefined));
        }
    }, [dispatch, marketId]);

    return (
        <Page hasNavigation size="unrestricted" className={s.root}>
            <NoBalanceDialogconnector />
            <Helmet>
                <title>
                    {trans('market.title.head', {
                        appName: trans('global.appName'),
                        description: market?.description || '',
                    })}
                </title>
            </Helmet>
            <MarketHeaderConnector />
            <div className={s.details}>
                <div className={s.infoWrapper}>
                    <MarketStatisticsConnector className={s.stats} />
                    <MarketResolutionInfoConenctor />
                </div>
                <div className={s.actionsWrapper}>
                    {account?.canUseApp && (<NoBalanceCardConnector />)}
                    <ActionsCard>
                        <TabbedView
                            items={[{
                                element: <TokenSwapperConnector />,
                                label: trans('market.label.swap'),
                                show: account !== null && market?.finalized === false && !isExpired && hasMarketLiquidity && account.canUseApp,
                                id: '0',
                            }, {
                                element: <LiquidityProviderConnector />,
                                label: trans('market.label.liquidity'),
                                show: account !== null && market?.finalized === false && !isExpired && hasMarketLiquidity && account.canUseApp,
                                id: '1',
                            }, {
                                element: <ClaimEarningsConnector />,
                                label: trans('market.label.claimEarnings'),
                                show: account !== null && market?.finalized === true && account.canUseApp,
                                id: '2',
                            }, {
                                element: <SeedPoolConnector />,
                                label: trans('market.label.seedPool'),
                                show: account !== null && market?.type !== MarketType.Scalar && market?.finalized === false && !isExpired && !hasMarketLiquidity && account.canUseApp,
                                id: '3',
                            }, {
                                element: <MarketClosed />,
                                label: trans('market.label.marketClosed'),
                                show: market?.finalized === false && isExpired,
                                id: '4',
                            }, {
                                element: <ExitPoolConnector />,
                                label: trans('market.label.exitPool'),
                                show: account !== null && hasMarketLiquidity && !!poolToken && !isExpired && account.canUseApp,
                                id: '5',
                            }, {
                                element: <NotLoggedInConnector />,
                                label: trans('market.label.notLoggedIn'),
                                show: !accountLoading && account === null,
                                id: '6',
                            }, {
                                element: <RedeemConnector />,
                                label: trans('market.label.redeem'),
                                show: account !== null && market?.finalized === false && canRedeem && account.canUseApp,
                                id: '7',
                            }, {
                                element: <SeedScalarMarketConnector />,
                                label: trans('market.label.seedPool'),
                                show: account !== null && market?.type === MarketType.Scalar && market?.finalized === false && !isExpired && !hasMarketLiquidity,
                                id: '8',
                            }, {
                                element: <NotInWhitelistCard />,
                                label: trans('market.label.notInWhitelist'),
                                show: account !== null && !account.canUseApp,
                                id: '9',
                            }]}
                        />
                    </ActionsCard>
                </div>
            </div>
            <div className={s.comments}>
                <h2>{trans('global.comments')}</h2>
                <MarketCommentsConnector />
            </div>
        </Page>
    );
}
