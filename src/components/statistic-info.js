import React, {useState, useMemo, useEffect} from 'react';
import { Box, Icon, IconButton } from "@material-ui/core";
import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenList, currentCurrencyCode } from '../store/atoms'
import { makeStyles } from "@material-ui/core/styles";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HiddenText from "./hidden-text";
import * as LatomicNumber from '../utils/big.number'

export default function StatisticInfo({showInfo, setToggleInfo}) {
  const list = useRecoilValue(tokenList);
  const classes = useStyles();
  const [currency, setCurrency] = useRecoilState(currentCurrencyCode);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalVolumnAmount, setTotalVolumnAmount] = useState(0);
  const [volumnProfit, setVolumnProfit] = useState(0);

  const onCurrencyChange = async (e) => {
    const cur = e.target.value;
    setCurrency(cur);
  }

  useEffect(() => {
    if (list && list.length) {
      let totalAmount = 0;
      let curTotalVolumn = 0;
      let prevTotalVolumn = 0;
      for (let token of list) {
        totalAmount += parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)) * token.trade.abs * token.trade.cmp;

        const curVolumn = token && token.coingecko ? token.coingecko.market.volumes[token.coingecko.market.volumes.length - 1] : 0;
        const prevVolumn = token && token.coingecko ? token.coingecko.market.volumes[0] : 0;
        curTotalVolumn += curVolumn * token.trade.cmp;
        prevTotalVolumn += prevVolumn * token.trade.cmp;
      }
      setTotalAmount(totalAmount);
      setTotalVolumnAmount(curTotalVolumn);
      setVolumnProfit((curTotalVolumn - prevTotalVolumn) / prevTotalVolumn * 100);
    }
  }, [list])

  
  return (
      <Box className={classes.portfolio}>
        <Box style={{flex: '4', fontWeight: '300', padding: '10px'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <Box style={{fontWeight: '500', fontSize: '25px'}}>Portfolio</Box>
            <IconButton
              className={classes.toggleButton}
              onClick={setToggleInfo}
            >
              <Icon className={classes.eyeIcon}>
              {
                showInfo 
                  ?<img src="images/hide.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
                  :<img src="images/show.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              }
              </Icon>
            </IconButton>
          </Box>
          <Box>
            <HiddenText show={showInfo}>
              {currency == 'USD' ? '$' : '€'}
              {totalAmount.toFixed(4).toLocaleString()}
            </HiddenText>
          </Box>
          <Box style={{fontSize: '15px'}}>
            {
              volumnProfit > 0
                ? <FontAwesomeIcon icon={faCaretUp} style={{color: 'green', marginRight: 3}} />
                : <FontAwesomeIcon icon={faCaretDown} style={{color: 'red', marginRight: 3}} />
            }
            <span style={{color: 'red', marginTop: '10px'}}>
              <HiddenText show={showInfo}>
                {currency == 'USD' ? '$' : '€'}
                {totalVolumnAmount.toFixed(4)}/{volumnProfit.toFixed(2)}%
              </HiddenText>
            </span>
            <span style={{marginLeft: '10px', marginTop: '10px'}}>24h</span>
          </Box>
        </Box>
        <Box className={classes.currency}>
          <select style={{fontWeight: '400', borderRadius: '5px'}} onChange={onCurrencyChange} value={currency}>
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
          </select>
        </Box>
      </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  portfolio: {
    color: 'white',
    border: '1px solid white',
    borderRadius: '10px',
    fontSize: '20px',
    marginTop: 20,
    marginBottom: 20,
    padding: '10px',
    position: 'relative'
  },
  currency: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 12
  },
  toggleButton: {
    padding: 0
  },
  eyeIcon: {
    marginLeft: 10,
    width: 25
  }
}));