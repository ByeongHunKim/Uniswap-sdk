import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

export const JSON_RPC_URL = process.env.INFURA_URL_MAINNET;

export const LM_TOKEN = '0x7BEC98609cB6378D6F995e8f8097Ee78376fbec9';

export const WETH_TOKEN = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

export const WBTC_TOKEN = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
