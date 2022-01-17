import { Router } from 'express';
import axios from 'axios';
const router = Router();

router.get('/test', async (req, res) => {
    res.status(200).json('coingeco api test');
});

router.get('/coins/binance-smart-chain/contract/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${address}`);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/coins/:coinId/market_chart', async (req, res) => {
    const coinId = req.params.coinId;
    try {
        let data = { index: [], price: [], volumes: [] };
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=1m`);
        if (result && result.data) {
            for (const item of result.data.prices) {
                data.index.push(item[0]);
                data.price.push(item[1]);
            }
            for (const item of result.data.total_volumes) data.volumes.push(item[1]);
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/coins/:coinId/ohlc', async (req, res) => {
    const coinId = req.params.coinId;
    try {
      const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=30`);
      const data = result.data.map(item=>{
        return {
          x: new Date(item[0]),
          y: [item[1], item[2], item[3], item[4]]
        }
      })
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
});

export default router;