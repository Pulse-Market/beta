import { DateMetric } from '@fluxprotocol/amm-sdk';
import { subDays, subMonths, subWeeks, differenceInDays } from 'date-fns';
import { MarketViewModel } from '../models/Market';
import { PriceHistoryData } from '../models/PriceHistoryData';
import { connectSdk } from './WalletService';

export enum Period {
    OneDay = '1d',
    OneWeek = '1w',
    OneMonth = '1m',
    ThreeWeeks = '3w',
    All = 'all',
}

export function getAllHistoryMetric(creationDate: Date, endDate: Date): DateMetric {
    const diffDays = differenceInDays(endDate, creationDate);

    // Market takes longer than 4 weeks
    if (diffDays > 28) {
        return DateMetric.week;
    }

    // Market takes less than 7 days but more than 1 day
    if (diffDays <= 7 && diffDays > 1) {
        return DateMetric.day;
    }

    return DateMetric.hour;
}

export async function getPricesHistoryByMarketId(market: MarketViewModel, period: Period): Promise<PriceHistoryData[]> {
    try {
        const now = new Date();
        let chosenPeriondDate = new Date();
        let metric = DateMetric.month;

        switch(period) {
            case Period.OneDay:
                chosenPeriondDate = subDays(now, 1);
                metric = DateMetric.hour;
                break;
            case Period.OneWeek:
                chosenPeriondDate = subWeeks(now, 1);
                metric = DateMetric.day;
                break;
            case Period.ThreeWeeks:
                chosenPeriondDate = subWeeks(now, 3);
                metric = DateMetric.day;
                break;
            case Period.OneMonth:
                chosenPeriondDate = subMonths(now, 1);
                metric = DateMetric.day;
                break;
            case Period.All:
                chosenPeriondDate = new Date(0);
                metric = getAllHistoryMetric(market.creationDate ?? new Date(0), market.resolutionDate);
                break;
        }

        const sdk = await connectSdk();
        const history = await sdk.getPriceHistoryByMarketId(market.id, {
            beginDate: chosenPeriondDate,
            metric,
        });

        return history;
    } catch (error) {
        console.error('[getPricesHistoryByMarketId]', error);
        return [];
    }
}
