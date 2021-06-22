import { COINGECKO_API_URL } from "../config";
import { FetchResult, FetchResultType } from "../models/FetchResult";
import { createEmptyTokenViewModel, TokenViewModel } from "../models/TokenViewModel";

export async function getTokenPriceByTicker(ticker: string, currency = 'usd'): Promise<FetchResult<number, string>> {
    try {
        const response = await fetch(`${COINGECKO_API_URL}/coins/${ticker}?localization=false`);
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

export async function getPopularTokens(currency = 'usd'): Promise<TokenViewModel[]> {
    try {
        const response = await fetch(`${COINGECKO_API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1`);
        const data: any[] = await response.json();

        return data.map<TokenViewModel>((token) => {
            return createEmptyTokenViewModel(token.name, token.symbol.toUpperCase(), '0', 0, token.id);
        });
    } catch (error) {
        console.error('[getTop100Tokens]', error);
        return [];
    }
}
