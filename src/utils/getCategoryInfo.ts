import circleCrypto from '../assets/images/circle-crypto.png';
import cardCrypto from '../assets/images/card-crypto.png';
import iconCrypto from '../assets/images/icons/icon-crypto.png';

import circleEsports from '../assets/images/circle-esports.png';
import cardEsports from '../assets/images/card-esports.png';
import iconEsports from '../assets/images/icons/icon-esports.png';

import circleMeme from '../assets/images/circle-meme.png';
import cardMeme from '../assets/images/card-meme.png';
import iconMeme from '../assets/images/icons/icon-meme.png';

import circlePolitics from '../assets/images/circle-politics.png';
import cardPolitics from '../assets/images/card-politics.svg';
import iconPolitics from '../assets/images/icons/icon-politics.png';

import circleSports from '../assets/images/circle-sports.png';
import cardSports from '../assets/images/card-sports.png';
import iconSports from '../assets/images/icons/icon-sports.png';

import circleStartups from '../assets/images/circle-startups.png';
import cardStartups from '../assets/images/card-startups.png';
import iconStartups from '../assets/images/icons/icon-startups.png';

import circleStocks from '../assets/images/circle-stocks.png';
import cardStocks from '../assets/images/card-stockmarket.png';
import iconStocks from '../assets/images/icons/icon-stockmarket.png';

import circleViral from '../assets/images/circle-viral.png';
import cardViral from '../assets/images/card-viral.png';
import iconViral from '../assets/images/icons/icon-viral.png';

import { MarketCategory } from "../models/Market";
import trans from '../translation/trans';

interface CategoryInfo {
    icon: string;
    cardIcon: string;
    circleIcon: string;
    category: MarketCategory;
    title?: string;
    color: string;
}

export default function getCategoryInfo(category?: MarketCategory | string): CategoryInfo {
    switch (category) {
        case MarketCategory.Crypto:
            return {
                circleIcon: circleCrypto,
                category,
                cardIcon: cardCrypto,
                icon: iconCrypto,
                title: trans('market.category.crypto'),
                color: '#5E60CE',
            };
        case MarketCategory.Esports:
            return {
                circleIcon: circleEsports,
                category,
                cardIcon: cardEsports,
                icon: iconEsports,
                title: trans('market.category.esports'),
                color: '#8E00E0',
            };
        case MarketCategory.Meme:
            return {
                circleIcon: circleMeme,
                category,
                cardIcon: cardMeme,
                icon: iconMeme,
                title: trans('market.category.meme'),
                color: '#48BFE3',
            };
        case MarketCategory.Politics:
            return {
                circleIcon: circlePolitics,
                category,
                cardIcon: cardPolitics,
                icon: iconPolitics,
                title: trans('market.category.politics'),
                color: '#6930C3',
            };
        case MarketCategory.Sports:
            return {
                circleIcon: circleSports,
                category,
                cardIcon: cardSports,
                icon: iconSports,
                title: trans('market.category.sports'),
                color: '#7DEECE',
            };
        case MarketCategory.Startups:
            return {
                circleIcon: circleStartups,
                category,
                cardIcon: cardStartups,
                icon: iconStartups,
                title: trans('market.category.startups'),
                color: '#5390D9',
            };
        case MarketCategory.Stocks:
            return {
                circleIcon: circleStocks,
                category,
                cardIcon: cardStocks,
                icon: iconStocks,
                title: trans('market.category.stocks'),
                color: '#4EA8DE',
            };
        case MarketCategory.Viral:
            return {
                circleIcon: circleViral,
                category,
                cardIcon: cardViral,
                icon: iconViral,
                title: trans('market.category.viral'),
                color: '#56CFE1',
            };
        default:
            return {
                circleIcon: circleStocks,
                category: MarketCategory.Unknown,
                cardIcon: cardStocks,
                icon: iconStocks,
                title: category,
                color: '#4EA8DE',
            };
    }
}
