import React, {useState, useEffect, useMemo} from "react";
// get our fontawesome imports
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box } from '@material-ui/core';
import useStyles from './style';
import { tokenList, allTokens, currentNetwork, currentCurrencyCode  } from '../../store/atoms';
import TransactionsLocal from '../../components/transactions-local';
import ARUCard from '../../components/card';
import ReactApexChart from 'react-apexcharts';
import { faCaretDown, faCaretUp, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout";
import * as LatomicNumber from '../../utils/big.number'
import {tokenLogos} from "../../config/token-info"
import Jazzicon from 'react-jazzicon';

const TokenDetail = (props) => {

  const classes = useStyles();
  const {code} = props.match.params;

  const network = useRecoilValue( currentNetwork );
  const currency = useRecoilValue( currentCurrencyCode );
  const list = useRecoilValue(tokenList);
  const history = useHistory();

  const setAllTokens = useSetRecoilState(allTokens);
  const goToSendToken = (token) => {
    if (token && token.code) {
      history.push(`/send-token/${token.code}`);
    }
  }

  const deleteToken = (event) => {
    event.preventDefault();

    setAllTokens((tokens) => {
      const array = tokens.map(x=>x);
      const index = array.findIndex((token)=>token.code === code);

      const token = {
        ...array[index],
        contract: {
          ...array[index].contract,
          [network.id]: ""
        }
      }
      array.splice(index, 1, token);
      return [...array];
    });
    history.push("/home");
  }

  const coin = useMemo(()=>{
    if (code && list) {
      return list.find((item)=>item.code === code)
    }
    return null;
  }, [list, code]);

  const options = {
    chart: {
      type: 'candlestick',
      height: 250
    },
    title: {
      text: `${coin && coin.code} Trading View`,
      align: 'left',
      style: {
        color: '#ffffff'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: '#ffffff'
        }
      }
    },
    colors:['#F44336', '#E91E63', '#9C27B0'],
    dataLabels: {
      style: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
      }
    }
  };

  const series = [{
    data: coin.coingecko && coin.coingecko.ohlc
  }];

  const curPrice = coin && coin.coingecko ? coin.coingecko.market.price[coin.coingecko.market.price.length - 1] : 0
  const curVolumn = coin && coin.coingecko ? coin.coingecko.market.volumes[coin.coingecko.market.volumes.length - 1] : 0
  const prevVolumn = coin && coin.coingecko ? coin.coingecko.market.volumes[0] : 0
  const percent = (curVolumn - prevVolumn) / prevVolumn * 100;

  return (
    <Layout isShownBackButton = {true} isShownWallet = {false}>
      {/* main_div */}
      <Box className={classes.root}>
        {coin && coin.code && coin.code !== 'BNB' && <div style={{marginBottom: 20, textAlign: 'right'}}>
          <span className={classes.deleteBtn} onClick={deleteToken}>Delete Token</span>
        </div>}
        <ARUCard>
          <ReactApexChart options={options} series={series} type="candlestick" height={250} style={{margin: '10px'}} />
        </ARUCard>
        <ARUCard className={classes.tokenInfo}>
          <Box className={classes.tokenImg}>
            {tokenLogos[code.toUpperCase()]
              ? <img src={tokenLogos[coin.code.toUpperCase()]} alt={code} width={40} />
              : <Jazzicon diameter={40} seed={coin.contract} />
            }
          </Box>
          <Box className={classes.tokenRow}>
            <Box className={classes.tokenLeft}>
              <Box>{coin.code}</Box>
              <Box style={{marginTop: 5, marginBottom: 5}}>
                {currency == 'USD' ? '$' : '€'}
                {parseFloat(curPrice * coin.trade.cmp).toFixed(2)}
              </Box>
              <Box style={{color: percent > 0?'green':'red'}}>
                {percent > 0 ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} /> }
                <span>{percent.toFixed(2)}%</span>
              </Box>
            </Box>
            <Box className={classes.tokenLeft} style={{alignItems: 'flex-end', marginRight: '5px'}}>
              <Box style={{fontSize: '18px', fontWeight: '500'}}>
                {parseFloat(LatomicNumber.toDecimal(coin.balance, coin.decimals)).toFixed(2)}
              </Box>
              <Box style={{marginTop: '5px'}}>
                {currency == 'USD' ? '$' : '€'}
                {(parseFloat(LatomicNumber.toDecimal(coin.balance, coin.decimals)) * coin.trade.abs * coin.trade.cmp).toFixed(2).toLocaleString()}
              </Box>
              <Box style={{color: '#999999', marginTop: '5px', cursor: 'pointer'}} onClick={()=>goToSendToken(coin)} >
                <span>Send</span>
                <FontAwesomeIcon icon={faSignOutAlt} style={{marginLeft: '5px'}} />
              </Box>
            </Box>
          </Box>
        </ARUCard>
        {coin && <TransactionsLocal token={coin} height={80} />}
      </Box>
    </Layout>
  );
};

export default TokenDetail;
