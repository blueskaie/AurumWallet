import React, {useMemo} from 'react';
import { Box,Icon } from "@material-ui/core";
import { useRecoilValue } from 'recoil';
import { tokenList } from '../store/atoms';
import { makeStyles } from "@material-ui/core/styles";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StatisticInfo() {
  const list = useRecoilValue(tokenList);
  const classes = useStyles();

  const total = useMemo(() => {
    if (list && list.length) {
      let totalAmount = 0;
      for (let token of list) {
        totalAmount += token.balance * token.trade;
      }
      return totalAmount;
    }
    return 0;
  }, list)
  return (
      <Box className={classes.portfolio}>
        <Box style={{flex: '4', fontWeight: '300', padding: '10px'}}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <Box style={{fontWeight: '500', fontSize: '25px'}}>Portfolio</Box>
            <Icon className={classes.eyeIcon}>
              <img src="images/hide.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
            </Icon>
          </Box>
          <Box>$ {total.toFixed(4).toLocaleString()}</Box>
          <Box style={{fontSize: '15px'}}>
            <FontAwesomeIcon icon={faCaretDown} style={{color: 'red'}} />
            {/* <FontAwesomeIcon icon={faCaretUp} style={{color: 'green'}} /> */}
            <span style={{color: 'red', marginTop: '10px'}}>$7,578.44/7.8%</span>
            <span style={{marginLeft: '10px', marginTop: '10px'}}>24h</span>
          </Box>
        </Box>
        <Box style={{flex: '1', fontSize:'12px'}}>
          <select style={{fontWeight: '400', borderRadius: '5px'}}>
            <option value='USD'>USD</option>
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
  eyeIcon: {
    marginLeft: 10,
    width: 25
  }
}));