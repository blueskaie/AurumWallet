import Web3 from 'web3';
import ABI from '../config/aggregatorV3InterfaceABI.js';
import * as LatomicNumber from '../utils/big.number'
import pairs from "../config/dataFeedsPairs";

export const getProvider = (network) => {
    return new Web3( new Web3.providers.HttpProvider(network.main) );
}


export const getCurrencyPerToken = async (network, tokenCode, pairCode='USD') => {
    let provider = getProvider(network);
    const matched = pairs.find((pair)=>pair["0"] === tokenCode && pair["1"] === pairCode)
    let res = null;
    if (matched) {
        try {
            const priceFeed = new provider.eth.Contract(ABI, matched.proxy);
            res = await priceFeed.methods.latestRoundData().call();
            res = parseFloat(LatomicNumber.toDecimal(res["answer"], matched.decimal));
        } catch (error) {
            res = 1;
        }
    } else {
        res = 1;
    }
    return res;
}