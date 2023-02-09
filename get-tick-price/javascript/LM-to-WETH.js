const { ethers } = require('ethers');
const JSBI = require('jsbi');
const { TickMath, FullMath } = require('@uniswap/v3-sdk');
require('dotenv').config();
const INFURA_URL_MAINNET = process.env.INFURA_URL_MAINNET;

// console.log(INFURA_URL_MAINNET);

// 1 WETH 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 == ? LM 0x7BEC98609cB6378D6F995e8f8097Ee78376fbec9
const baseToken = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH token contract address

const quoteToken = '0x7BEC98609cB6378D6F995e8f8097Ee78376fbec9'; // LM token contract address

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL_MAINNET);

async function main(
  baseToken,
  quoteToken,
  inputAmount,
  currentTick,
  baseTokenDecimals,
  quoteTokenDecimals
) {
  //code

  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(currentTick);
  const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
  const baseAmount = JSBI.BigInt(inputAmount * 10 ** baseTokenDecimals);
  const shift = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(192));

  quoteAmount = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);
  console.log(quoteAmount.toString() / 10 ** quoteTokenDecimals);
}

main(baseToken, quoteToken, 1, 81933, 18, 18);
//
// https://info.uniswap.org/#/pools/0x68bc9319bce394b1e9683d941aaf3a7cdd50b09c
