import Web3 from 'web3';
import ABI from '../config/pancakeSwapABI.js';
import { BigNumber, ethers } from 'ethers'
import { DEFAULT_TOKEN } from '../config/tokens'

export const getProvider = (network) => {
  return new Web3( new Web3.providers.HttpProvider(network.main) );
}

export const getSwapRouter = (network, service="pancake") => {
    if (network.type == 'mainnet') {
        if (service == 'pancake') {
            return "0x10ED43C718714eb63d5aA57B78B54704E256024E";
        } else {
            return "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7";
        }
    } else {
        return "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
        if (service == 'pancake') {
            return "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
        } else {
            return "0x3380ae82e39e42ca34ebed69af67faa0683bb5c1";
        }
    }
}


export const formatBN = (value, decimals = 18) => {
    try {
        const formatted = ethers.utils.parseUnits(value.toString(), decimals)
        return formatted
    } catch(e) { console.log(e) }
    return BigNumber.from(0)
}

export const getExpectedAmounts = async (network, router, fromToken, toToken, amount) => {
    let provider = getProvider(network);

    let swapContractAddress = getSwapRouter(network, router);
    let contract = new provider.eth.Contract( ABI , swapContractAddress );
    let amountIn = formatBN(amount, fromToken.decimals);
    const path = [fromToken.contract, toToken.contract];

    let args = [amountIn.toHexString(), path];
    let res = await contract.methods.getAmountsOut(...args).call();
    return res;    
}

export const getGasInfo = async ( network, router, fromToken, toToken, amount, privateKey ) => {
    
    let provider = getProvider(network);
    const account = provider.eth.accounts.privateKeyToAccount( privateKey );
    provider.eth.accounts.wallet.add(account);
    provider.eth.defaultAccount = account.address;

    let swapContractAddress = getSwapRouter(network, router);
    let contract = new provider.eth.Contract( ABI , swapContractAddress );
    
    let amountIn = formatBN(amount, fromToken.decimals);

    const path = [fromToken.contract, toToken.contract]
    const to = account.address; // current account
    let deadline = Math.floor(Date.now() / 1000) + 60 * parseFloat(30) //default deadline 30mins

    let payload = {
        from: account.address,
    }

    let method = undefined;
    if (fromToken.code === DEFAULT_TOKEN.code) {
        const args = [0, path, to, deadline];
        payload = {...payload, value: amountIn};
        method = contract.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(...args)
    } else if (toToken.code === DEFAULT_TOKEN.code) {
        const args = [amountIn.toHexString(), 0, path, to, deadline];
        method = contract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(...args)
    } else {
        const args = [amountIn.toHexString(), 0, path, to, deadline]
        method = contract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(...args)
    }

    let [gasPrice, gasCost] = [0, 0]
    try {
        [gasPrice, gasCost] = await Promise.all([
            provider.eth.getGasPrice(),
            method.estimateGas(payload)
        ]);    
    } catch (e) {
        console.log(e.message);     
    }

    const res = {
        limit : gasCost,
        price: gasPrice
    }
    return res;
}

export const doSwap = async ( network, router, fromToken, toToken, amount, privateKey, gasOptions) => {

    let provider = getProvider(network);
    const account = provider.eth.accounts.privateKeyToAccount( privateKey );
    provider.eth.accounts.wallet.add(account);
    provider.eth.defaultAccount = account.address;

    let swapContractAddress = getSwapRouter(network, router);
    let contract = new provider.eth.Contract( ABI , swapContractAddress );
    
    let amountIn = formatBN(amount, fromToken.decimals);

    const path = [fromToken.contract, toToken.contract]
    const to = account.address; // current account
    let deadline = Math.floor(Date.now() / 1000) + 60 * parseFloat(30) //default deadline 30mins

    let payload = {
        from: account.address,
        gas: provider.utils.toHex(gasOptions.limit),
        gasPrice: provider.utils.toHex(provider.utils.toWei(gasOptions.price.toString(), 'gwei'))
    }

    let res = undefined;
    if (fromToken.code === DEFAULT_TOKEN.code) {
        const args = [0, path, to, deadline];
        payload = {...payload, value: amountIn};
        res = await contract.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(...args).send(payload)
    } else if (toToken.code === DEFAULT_TOKEN.code) {
        const args = [amountIn.toHexString(), 0, path, to, deadline];
        res = await contract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(...args).send(payload)
    } else {
        const args = [amountIn.toHexString(), 0, path, to, deadline]
        res = await contract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(...args).send(payload)
    }
    return res;
}
