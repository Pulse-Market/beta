import { utils } from 'near-api-js';
import { COINGECKO_API_URL } from "../config";
import { FetchResult, FetchResultType, isFetchResultSuccesful } from '../models/FetchResult';
import { TokenViewModel } from '../models/TokenViewModel';
import { sleep } from '../utils/sleep';
import { getAccountInfo } from './AccountService';

const MAIN_TOKEN = 'near';

export async function getCurrentMainTokenPrice(currency = 'usd'): Promise<FetchResult<number, string>> {
    try {
        const response = await fetch(`${COINGECKO_API_URL}/coins/${MAIN_TOKEN}?localization=false`);
        const data = await response.json();

        return {
            type: FetchResultType.Success,
            data: data.market_data.current_price[currency],
            status: response.status,
        }
    } catch (error) {
        console.error('[getCurrentMainTokenPrice]', error);

        return {
            type: FetchResultType.Error,
            error,
            status: 500,
        }
    }
}

export function formatMainToken(balance: string, digits: number = 3) {
    return utils.format.formatNearAmount(balance, digits);
}

export async function getMainToken(): Promise<FetchResult<TokenViewModel, string>> {
    try {
        const priceDataResponse = await getCurrentMainTokenPrice();
        const account = await getAccountInfo();

        if (!isFetchResultSuccesful(priceDataResponse)) {
            throw new Error('Could not fetch pricing data');
        }

        const accountBalance = account ? account.balance : '0';

        await sleep(2000);

        return {
            type: FetchResultType.Success,
            status: 200,
            data: {
                balance: accountBalance,
                price: priceDataResponse.data,
                tokenName: MAIN_TOKEN.toUpperCase(),
                balanceFormatted: formatMainToken(accountBalance),
            },
        };
    } catch (error) {
        return {
            type: FetchResultType.Error,
            error,
            status: 500,
        }
    }
}