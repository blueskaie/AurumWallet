import { Router } from 'express';
import axios from 'axios';
const router = Router();

router.get('/lps/:tokenAddress', async (req, res) => {
  const tokenAddress = req.params.tokenAddress;
  try {
    const result = await axios.get(`https://www.dextools.io/chain-bsc/api/pair/search?s=${tokenAddress}`);
    const pancakelps = result.data && result.data
      .filter(item=>item.exchange == 'pancakev2' && (item.token0.symbol == 'WBNB' || item.token1.symbol == 'WBNB'))
      .map(item=>item.id);
    res.status(200).json(pancakelps);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/prices/:lpAddress', async (req, res) => {
  const lpAddress = req.params.lpAddress;
  try {
    const version = await axios.get(`https://www.dextools.io/chain-bsc/api/pancakeswap/1/pairexplorer-status?pair=${lpAddress}`)
    const result = await axios.get(`https://www.dextools.io/chain-bsc/api/pancakeswap/1/pairexplorer?pair=${lpAddress}&ts=${version.data}&h=1`);
    res.status(200).json(result.data && result.data.result && result.data.result.map(item=>item.price)); 
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/candles/:lpAddress', async (req, res) => {
  const lpAddress = req.params.lpAddress;
  try {
    const version = await axios.get(`https://www.dextools.io/chain-bsc/api/pancakeswap/1/history-candle-status?pair=${lpAddress}`)  
    const result = await axios.get(`https://www.dextools.io/chain-bsc/api/pancakeswap/history/candles?sym=usd&span=week&pair=${lpAddress}&ts=1638403200000&v=${version.data}&res=15m`);
    res.status(200).json(result.data && result.data.code == 'OK' && result.data.data.candles);
  } catch (err) {
    res.status(500).json(err)
  }
});

export default router;