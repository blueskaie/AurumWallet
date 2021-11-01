import React, {useState, useMemo} from 'react';
import { Box, Icon, IconButton } from "@material-ui/core";
import { useRecoilValue } from 'recoil';
import { currentNetwork, currentWallet, networkProvider, allContracts, tokenList } from '../store/atoms'
import { makeStyles } from "@material-ui/core/styles";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrencyPerToken } from '../utils/chainlink-utils'
import HiddenText from "./hidden-text";

export default function StatisticInfo({showInfo, setToggleInfo}) {
  const list = useRecoilValue(tokenList);
  const classes = useStyles();
  const [currency, setCurrency] = useState('USD');
  const [tradeRate, setTradeRate] = useState(1);

  const network = useRecoilValue( currentNetwork );

  const onCurrencyChange = async (e) => {
    const cur = e.target.value;
    setCurrency(cur);
    try {
      const result = await getCurrencyPerToken(network, cur, 'USD');
      setTradeRate(result > 0 ? 1 / result : 1);
    } catch (e) {
      setTradeRate(1);
    }
  }

  const total = useMemo(() => {
    if (list && list.length) {
      let totalAmount = 0;
      for (let token of list) {
        totalAmount += 1 * token.trade * tradeRate;
      }
      return totalAmount;
    }
    return 0;
  }, [list, tradeRate])

  
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
          <Box><HiddenText show={showInfo}>&euro;{total.toFixed(4).toLocaleString()}</HiddenText></Box>
          <Box style={{fontSize: '15px'}}>
            <FontAwesomeIcon icon={faCaretDown} style={{color: 'red', marginRight: 5}} />
            {/* <FontAwesomeIcon icon={faCaretUp} style={{color: 'green'}} /> */}
            <span style={{color: 'red', marginTop: '10px'}}><HiddenText show={showInfo}>$7,578.44/7.8%</HiddenText></span>
            <span style={{marginLeft: '10px', marginTop: '10px'}}>24h</span>
          </Box>
        </Box>
        <Box style={{flex: '1', fontSize:'12px'}}>
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
    display: 'flex',
    flexDirection: 'row'
  },
  toggleButton: {
    padding: 0
  },
  eyeIcon: {
    marginLeft: 10,
    width: 25
  }
}));