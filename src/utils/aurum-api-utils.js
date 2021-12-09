import callAPI from "./api-utils";

const api_endpoint = 'http://18.219.122.201';

export const getCurrentPrice = async (tokenAddress) => {
    try {
        const res = await callAPI(`${api_endpoint}/pancakeswap/info/${tokenAddress}`);
        return res.price;
    } catch (e) {
        return 0;
    }
}