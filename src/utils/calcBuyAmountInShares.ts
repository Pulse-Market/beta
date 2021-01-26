import Big from "big.js";

const ONE = new Big(10 ** 18);
const ZERO = new Big(0);

const ceilDiv = (a: Big, b: Big): Big => {
    return a.mod(b) === ZERO ? a.div(b) : a.div(b).add(1);
  };

/**
 * Computes the amount of shares that will be bought with `investmentAmount` amount collateral.
 *
 * @param investmentAmount The amount of collateral being put into the market maker
 * @param outcomeIndex The index of the outcome being bought
 * @param poolBalances How many tokens the market maker has of each outcome
 * @param fee The fee of the market maker, between 0 and 1
 */

export const calcBuyAmountInShares = (
  investmentAmount: Big,
  outcomeIndex: number,
  poolBalances: Big[],
  fee: number,
): Big => {
  if (outcomeIndex < 0 || outcomeIndex >= poolBalances.length) {
    throw new Error(`Outcome index '${outcomeIndex}' must be between 0 and '${poolBalances.length - 1}'`);
  }
  if (investmentAmount.eq(0) || poolBalances.every(x => x.eq(0))) return ZERO;

  const investmentAmountMinusFees = investmentAmount.mul(1 - fee);
  const newOutcomeBalance = poolBalances.reduce(
    (accumulator, poolBalance, i) =>
      i !== outcomeIndex
        ? ceilDiv(accumulator.mul(poolBalance), poolBalance.add(investmentAmountMinusFees))
        : accumulator.mul(poolBalance),
    ONE,
  );

  return poolBalances[outcomeIndex].add(investmentAmountMinusFees).sub(ceilDiv(newOutcomeBalance, ONE));
};
