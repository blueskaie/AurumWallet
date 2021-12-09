import { Router } from 'express';
import axios from 'axios';
const router = Router();

router.get('/info/:tokenAddress', async (req, res) => {
  const tokenAddress = req.params.tokenAddress;
  try {
    const result = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`);
    res.status(200).json(result.data.data);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

export default router;