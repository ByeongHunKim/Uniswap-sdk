import { Token } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { WETH_TOKEN, LM_TOKEN } from './constant';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

export const JSONRPCURL = process.env.INFURA_URL_MAINNET;

console.log(JSONRPCURL);

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  MAINNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
  };
  wallet: {
    address: string;
    privateKey: string;
  };
  tokens: {
    token0: Token;
    token0Amount: number;
    token1: Token;
    token1Amount: number;
    poolFee: FeeAmount;
    token0AmountToAdd: number;
    token1AmountToAdd: number;
  };
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: '',
  },
  wallet: {
    address: '',
    privateKey: '',
  },
  tokens: {
    token0: WETH_TOKEN,
    token0Amount: 0.0015,
    token1: LM_TOKEN,
    token1Amount: 0.0015,
    poolFee: FeeAmount.MEDIUM,
    token0AmountToAdd: 0.0015,
    token1AmountToAdd: 0,
  },
};
