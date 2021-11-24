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
  const [diffAmount, setDiffAmount] = useState(0);
  const [profitAmount, setProfit] = useState(0);

  const onCurrencyChange = async (e) => {
    const cur = e.target.value;
    setCurrency(cur);
  }

  useEffect(() => {
    if (list && list.length) {
      let ctotalAmount = 0;
      let pTotalAmount = 0;
      for (let token of list) {
        const curPrice = token && token.coingecko && token.coingecko.market.price && token.coingecko.market.price.length ? token.coingecko.market.price[token.coingecko.market.price.length - 1] : 0;
        const prevPrice = token && token.coingecko && token.coingecko.market.price && token.coingecko.market.price.length ? token.coingecko.market.price[0] : 0;

        ctotalAmount += parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)) * curPrice * token.trade.cmp;
        pTotalAmount += parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)) * prevPrice * token.trade.cmp;
      }
      setTotalAmount(ctotalAmount);
      setDiffAmount(ctotalAmount - pTotalAmount);
      setProfit(pTotalAmount > 0 ? (ctotalAmount - pTotalAmount) / pTotalAmount * 100 : 0);
    }
  }, [list])


  return (
      <Box className={classes.portfolio}>
        <Box style={{flex: '4', fontWeight: '400', padding: 5}}>
          <Box style={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
            <Box style={{fontWeight: 600, fontSize: '25px'}}>Portfolio</Box>
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
          <Box style={{marginBottom: 5}}>
            <HiddenText show={showInfo} length={10}>
              {currency == 'USD' ? '$' : '€'}
              {totalAmount.toFixed(4).toLocaleString()}
            </HiddenText>
          </Box>
          <Box style={{fontSize: '15px'}}>
            {
              profitAmount >= 0
                ? <FontAwesomeIcon icon={faCaretUp} style={{color: 'green', marginRight: 3}} />
                : <FontAwesomeIcon icon={faCaretDown} style={{color: 'red', marginRight: 3}} />
            }
            <span style={{color: profitAmount >= 0 ? 'green' : 'red', marginTop: '10px'}}>
              <HiddenText show={showInfo} length={18}>
                {currency == 'USD' ? '$' : '€'}
                {diffAmount.toFixed(4)}/{profitAmount.toFixed(2)}%
              </HiddenText>
            </span>
            <span style={{marginLeft: '10px', marginTop: '10px'}}>24h</span>
          </Box>
        </Box>
        <Box className={classes.currency}>
          <select style={{fontWeight: '400', borderRadius: '6px'}} onChange={onCurrencyChange} value={currency}>
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
    borderRadius: '6px',
    fontSize: '20px',
    marginTop: 15,
    marginBottom: 15,
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