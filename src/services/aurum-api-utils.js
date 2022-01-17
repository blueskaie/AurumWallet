import callAPI from "../utils/api-utils";

const api_endpoint = 'http://18.219.122.201';
// const api_endpoint = 'http://127.0.0.1:3000';

export const getCurrentPrice = async (tokenAddress) => {
    try {
        const res = await callAPI(`${api_endpoint}/pancakeswap/info/${tokenAddress}`);
        return res.price;
    } catch (e) {
        return 0;
    }
}

export const getCoingeckoInfoByAddress = async (address) => {
    try {
        let result = await callAPI(`${api_endpoint}/coingeko/coins/binance-smart-chain/contract/${address}`);
        return result;
    } catch (e) {
        return {};
    }
}

export const getMarketChart = async (coinId) => {
    if (coinId) {
        let result = await callAPI(`${api_endpoint}/coingeco/coins/${coinId}/market_chart`);
        return result;
    }
    return {};
}

export const getOHLC = async (coinId) => {
    if (coinId) {
        let result = await callAPI(`${api_endpoint}/coingeco/coins/${coinId}/ohlc`);
        return result;
    }
    return {};
}