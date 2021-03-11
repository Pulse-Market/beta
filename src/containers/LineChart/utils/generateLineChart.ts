import FluxSdk from '@fluxprotocol/amm-sdk';
import Big from 'big.js';
import Chart from 'chart.js';
import { MarketType, MarketViewModel } from '../../../models/Market';
import { PriceHistoryData } from '../../../models/PriceHistoryData';
import { getScalarBounds, getScalarLongShortTokens } from '../../../services/MarketService';
import trans from '../../../translation/trans';
import { getColorForOutcome } from '../../../utils/getColorForOutcome';
import getCssVariableValue from '../../../utils/getCssVariableValue';
import { prettyFormatNumber } from '../../../utils/prettyFormatNumber';

function generateScalarChartData(priceHistoryData: PriceHistoryData[], market: MarketViewModel): Chart.ChartDataSets[] {
    const dataSets: Chart.ChartDataSets[] = [];
    const scalarTokens = getScalarLongShortTokens(market.outcomeTokens);
    const scalarData: number[] = [];

    priceHistoryData.forEach((historyData) => {
        const longPriceOutcome = historyData.dataPoints.find(dp => dp.outcome === scalarTokens.longToken.outcomeId);
        const scalarValue = FluxSdk.utils.calcScalarValue(scalarTokens.lowerBound, scalarTokens.upperBound, new Big(longPriceOutcome?.price ?? 0));

        scalarData.push(scalarValue.toNumber());
    });

    dataSets.push({
        data: scalarData,
        label: trans('market.label.estimate'),
        fill: false,
        borderWidth: 2,
        borderColor: `${getCssVariableValue('--c-blue')}`,
        cubicInterpolationMode: 'monotone',
    });

    return dataSets;
}

export function generateChartData(priceHistoryData: PriceHistoryData[], market: MarketViewModel): Chart.ChartData {
    const outcomeData: Map<number, number[]> = new Map();
    const isScalar = market.type === MarketType.Scalar;
    const dataSets: Chart.ChartDataSets[] = isScalar ? generateScalarChartData(priceHistoryData, market) : [];

    priceHistoryData.forEach((historyData) => {
        historyData.dataPoints.forEach((outcomePriceData) => {
            const outcomeDataPoints = outcomeData.get(outcomePriceData.outcome);

            if (Array.isArray(outcomeDataPoints)) {
                outcomeDataPoints.push(Number(outcomePriceData.price) * 100);
            } else {
                outcomeData.set(outcomePriceData.outcome, [Number(outcomePriceData.price) * 100]);
            }
        });
    });

    outcomeData.forEach((data, outcomeId) => {
        const outcomeToken = market.outcomeTokens.find(token => token.outcomeId === outcomeId);

        dataSets.push({
            data,
            label: outcomeToken?.tokenName,
            fill: false,
            showLine: !isScalar,
            hidden: isScalar,
            pointRadius: isScalar ? 0 : undefined,
            borderWidth: 2,
            borderColor: `${getCssVariableValue(getColorForOutcome(outcomeId, isScalar))}`,
            cubicInterpolationMode: 'monotone',
        });

        // Scalar markets do not need a dotted line for price since it's hidden
        if (isScalar) return;

        // Dotted line for latest price
        dataSets.push({
            data: new Array(data.length).fill(data[data.length - 1]),
            fill: false,
            borderWidth: 1,
            borderColor: `${getCssVariableValue(getColorForOutcome(outcomeId))}`,
            borderDash: [2, 5],
            cubicInterpolationMode: 'monotone',
            hidden: isScalar,
            pointHitRadius: 0,
            pointHoverRadius: 0,
            pointRadius: 0,
            label: '',
            hideInLegendAndTooltip: true,
        });
    });

    return {
        labels: priceHistoryData.map(point => point.pointKey),
        datasets: dataSets,
    };
}

export default function generateLineChart(canvas: HTMLCanvasElement, market: MarketViewModel): Chart | null {
    const context = canvas.getContext('2d');
    if (!context) return null;

    let min = 0;
    let max = 100;

    if (market.type === MarketType.Scalar) {
        const bounds = getScalarBounds(market.outcomeTokens.map(t => t.bound));
        min = bounds.lowerBound.toNumber();
        max = bounds.upperBound.toNumber();
    }

    const chartConfig: Chart.ChartConfiguration = {
        type: 'line',

        options: {
            responsive: true,
            legend: {
                display: false,
            },

            animation: {
                duration: 0,
            },

            elements: {
                line: {
                    tension: 0,
                },
            },

            tooltips: {
                mode: market.type === MarketType.Scalar ? 'index' : 'point',
                intersect: false,
                callbacks: {
                    label: (tooltipItem, data) => {
                        const dataSets = data.datasets ?? [];
                        const dataSet = dataSets[tooltipItem.datasetIndex ?? 0];
                        const dataSetData = dataSet.data ?? []
                        const price = dataSetData[tooltipItem.index ?? 0] as number / 100;

                        return `${dataSet.label}: ${price.toFixed(3)} ${market.collateralToken.tokenSymbol}`;
                    },
                }
            },

            scales: {
                yAxes: [{
                    type: 'linear',
                    gridLines: {
                        color: '#d8d8d8',
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        fontColor: getCssVariableValue('--c-text'),
                        min,
                        max,
                        maxTicksLimit: 6,
                        stepSize: (max - min) / 4,
                        padding: 10,
                        callback: (value) => {
                            if (market.type === MarketType.Scalar) {
                                return prettyFormatNumber(value.toString());
                            }

                            return (Number(value) / 100).toFixed(2)
                        },
                    }
                }],
                xAxes: [{
                    gridLines: {
                        color: '#d8d8d8',
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        fontColor: getCssVariableValue('--c-text'),
                        padding: 10,
                    }
                }],
            },
        },
    };

    if (market.type === MarketType.Scalar) {
        // For filtering labels with prices
        const outcomeTokenNames = market.outcomeTokens.map(t => t.tokenName);

        // Typescript check....
        if (chartConfig.options?.tooltips?.callbacks) {

            // Combining the price and estimated value into 1 tooltip
            chartConfig.options.tooltips.callbacks.label = (tooltipItem, data) => {
                const itemsData = data.datasets?.map(item => {
                    const itemData = item.data ?? [];
                    const itemValue = itemData[tooltipItem.index ?? 0] ?? 0;

                    // The label is a outcome token so we can format it as price
                    if (outcomeTokenNames.includes(item.label ?? '')) {
                        const price = itemValue as number / 100
                        return `${item.label}: ${price.toFixed(3)} ${market.collateralToken.tokenSymbol}`;
                    }

                    return `${item.label}: ${itemValue}`;
                });

                return itemsData ?? [];
            }
        }
    }

    return new Chart(context, chartConfig);
}

