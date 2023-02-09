const { ethers } = require('ethers');
const JSBI = require('jsbi');
const { TickMath, FullMath } = require('@uniswap/v3-sdk');
require('dotenv').config();
const INFURA_URL_MAINNET = process.env.INFURA_URL_MAINNET;

// console.log(INFURA_URL_MAINNET);

// 1 WBTC 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599  == ? WETH 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
const baseToken = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'; // WBTC token contract address

const quoteToken = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH token contract address

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

main(baseToken, quoteToken, 1, 256555, 8, 18);
// https://etherscan.io/address/0xcbcdf9626bc03e24f779434178a73a0b4bad62ed#readContract
// https://info.uniswap.org/#/pools/0xcbcdf9626bc03e24f779434178a73a0b4bad62ed
