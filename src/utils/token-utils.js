import Web3 from 'web3';
import ABI from '../config/20token';
import * as swap from './swap-utils';
import { DEFAULT_TOKEN } from '../config/tokens';

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

const isString = (x) => {
  return Object.prototype.toString.call(x) === '[object String]';
}

export const getContractAddress = (network, token) => {
  if(isString(token.contract)) {
    return token.contract
  }
  if(token.contract[network.id]) {
    return token.contract[network.id]
  }
  return undefined
}

export const getProviderContractDetails = async (network, contractAddress, ownAddress) => {
  let provider = getProvider(network);
  let contract = new provider.eth.Contract( ABI , contractAddress )
  const balance = await contract.methods.balanceOf(ownAddress).call();
  const allowance = await contract.methods.allowance(ownAddress, swap.getSwapRouter(network)).call();
  return { provider, contract, balance, allowance };
}

export const loadSingle = async (network, token, ownAddress) => {
  let { balance, allowance } = await getProviderContractDetails(network, getContractAddress(network, token) , ownAddress);
  return { balance, allowance };
}

export const approve = async (network, router, token, privateKey, amount=1000) => {
  let provider = getProvider(network);
  const account = provider.eth.accounts.privateKeyToAccount( privateKey );
  provider.eth.accounts.wallet.add(account);
  let amountIn = swap.formatBN(amount, token.decimals);

  let contract = new provider.eth.Contract( ABI , getContractAddress(network, token) )

  let payload = {
    from: account.address,
    gas: provider.utils.toHex(800000),
    gasPrice: provider.utils.toHex(provider.utils.toWei('30', 'gwei')),
  }

  const swapRouter = swap.getSwapRouter(network, router);

  const result = await contract.methods.approve(swapRouter, amountIn.toHexString()).send(payload);
  return result;
}

export const transferToAddresss = async (network, token, privateKey, amount, destAddress) => {
  const provider = getProvider(network);
  const contractAddress = getContractAddress(network, token);

  const account = provider.eth.accounts.privateKeyToAccount( privateKey );

  let { contract, balance } = await getProviderContractDetails(network, contractAddress, account.address);

  const nonceCount = await provider.eth.getTransactionCount(account.address);
  const gasPrice = await provider.eth.getGasPrice()
  const rawAmount = Math.pow(10, token.decimals) * parseFloat(amount);

  try {
    if(balance > rawAmount) {
          const transferAmount = "0x" + rawAmount.toString(16)
          const rawTransaction = {
              "from": account.address,
              "nonce": "0x" + nonceCount.toString(16),
              "gasPrice": gasPrice,
              "gasLimit": "0x250CA",
              "to": contractAddress,
              "value": "0x0",
              "data": contract.methods.transfer(destAddress, transferAmount).encodeABI()
          };

          const signedTransaction = await account.signTransaction(rawTransaction);

          const result = await provider.eth.sendSignedTransaction(signedTransaction.rawTransaction);
          return result;
      }
      return {status: false, msg: 'Insufficient balance'}
  } catch(e) {
      console.error(e);
  }
  return {status: false}
}

export const transferAmount = async (network, token, privateKey, amount, destAddress) => {
  const provider = getProvider(network);
  const account = provider.eth.accounts.privateKeyToAccount(privateKey)

  const gasPrice = await provider.eth.getGasPrice()

  const rawAmount = Math.pow(10, token.decimals) * parseFloat(amount);

  const signed = await account.signTransaction({to: destAddress,
    value: rawAmount,
    gas: 200000,
    gasPrice: gasPrice});

  const result = await provider.eth.sendSignedTransaction(signed.rawTransaction);

  return result;
}

export const doTransfer = async ( network, token, privateKey, amount, destAddress ) => {
  if(token.code === DEFAULT_TOKEN.code) {
    return await transferAmount(network, token, privateKey, amount, destAddress)
  } else {
    return await transferToAddresss(network, token, privateKey, amount, destAddress)
  }
}

export const deployContract = async ( network, privateKey, abi, bytecode ) => {
  const provider = getProvider(network)
  const account = provider.eth.accounts.privateKeyToAccount(privateKey)
  try {
    provider.eth.accounts.wallet.add(account);
    provider.eth.defaultAccount = account.address;

    let deploy_contract = new provider.eth.Contract(JSON.parse(abi));

    let payload = {
      from: account.address,
      gas: provider.utils.toHex(800000),
      gasPrice: provider.utils.toHex(provider.utils.toWei('30', 'gwei')),
      data: bytecode
    }

    const info = await deploy_contract.deploy({data: bytecode}).send(payload);

    return info;
  } catch(e) {
    console.log('deployContract error');
    console.error(e);
    return {};
  }
}

export const getTokenInfoByAddress = async (network,address) => {
  if(address == '')
    return null;

  try{
    const provider = getProvider(network)
    const tokenContract = new provider.eth.Contract(ABI, address);
    const [symbol,decimals, name] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
      tokenContract.methods.name().call(),
    ]);
    return { decimals, name, symbol };
  }catch(e)
  {
    console.log("getTokenInfoByAddress error",e);
  }

  return null;
}