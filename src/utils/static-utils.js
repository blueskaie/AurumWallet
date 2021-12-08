import callAPI from "./api-utils";

const api_endpoint = 'http://localhost:3001';

export const getLps = async (tokenAddress) => {
    let data = null;
    if (tokenAddress) {
        data = await callAPI(`${api_endpoint}/dextools/lps/${tokenAddress}`);
    }
    return data;
}

export const getPrices = async (lpAddress, timestamp) => {
    let data = null;
    if (lpAddress) {
        data = await callAPI(`${api_endpoint}/dextools/prices/${lpAddress}`);
    }
    return data;
}

export const getCandles = async (lpAddress) => {
    let data = null;
    if (lpAddress) {
        data = await callAPI(`${api_endpoint}/dextools/candles/${lpAddress}`);
    }
    return data;
}