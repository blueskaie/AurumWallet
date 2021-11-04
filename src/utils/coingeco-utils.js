import callAPI from "./api-utils";

export const getMarketChart = async (coinId) => {
    let data = { index: [], price: [], volumes: [] };
    if (coinId) {
        let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=1m`);
        for (const item of result.prices) {
            data.index.push(item[0]);
            data.price.push(item[1]);
        }
        for (const item of result.total_volumes) data.volumes.push(item[1]);
    }
    return data;
}

export const getOHLC = async (coinId) => {
    if (coinId) {
        let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=30`);
        result = result.map(item=>{
          return {
            x: new Date(item[0]),
            y: [item[1], item[2], item[3], item[4]]
          }
        })
        return result;
    }
    return null;
}