import { ethers } from 'ethers';
import { CurrentConfig, JSONRPCURL } from './config';
import { POOL_FACTORY_CONTRACT_ADDRESS } from './constant';
// import { getProvider } from './providers';
import { computePoolAddress } from '@uniswap/v3-sdk';
import abi from '../abi/UniswapV3Pool.json';

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumber;
  liquidity: ethers.BigNumber;
  tick: number;
}

export async function getPoolInfo(): Promise<void> {
  // const provider = getProvider();
  // if (!provider) {
  //   throw new Error('No provider');
  // }

  const customHttpProvider = new ethers.providers.JsonRpcProvider(JSONRPCURL);

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.token0,
    tokenB: CurrentConfig.tokens.token1,
    fee: CurrentConfig.tokens.poolFee,
  });

  const poolContract = new ethers.Contract(currentPoolAddress, abi, customHttpProvider);

  const result = await poolContract.slot0();
  console.log(result);
}

getPoolInfo();
