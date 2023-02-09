import { ethers } from 'ethers';
import JSBI from 'jsbi';
import { TickMath, FullMath } from '@uniswap/v3-sdk';
import { JSON_RPC_URL, LM_TOKEN, WBTC_TOKEN, WETH_TOKEN } from '../config';

const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);

const baseToken = WBTC_TOKEN;
const quoteToken = WETH_TOKEN;

export async function main(
  baseToken: string,
  quoteToken: string,
  inputAmount: number,
  currentTick: number,
  baseTokenDecimals: number,
  quoteTokenDecimals: number
) {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(currentTick);
  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
  const baseAmount = JSBI.BigInt(inputAmount * 10 ** baseTokenDecimals);
  const shift = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(192));

  const quoteAmount: any = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);
  const result: any = quoteAmount.toString() / 10 ** quoteTokenDecimals;
  console.log(`result is ${result}`);
  return result;
}
main(baseToken, quoteToken, 1, 256555, 8, 18);
