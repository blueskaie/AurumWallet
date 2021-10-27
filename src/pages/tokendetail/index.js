import React, {useState, useEffect, useMemo} from "react";
// get our fontawesome imports
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box } from '@material-ui/core';
import useStyles from './style';
import callAPI from "../../utils/api-utils";
import { tokenList, allTokens, currentNetwork  } from '../../store/atoms';
import Transactions from '../../components/transactions';
import ARUCard from '../../components/card';
import ReactApexChart from 'react-apexcharts';
import { faCaretDown, faCaretUp, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout";

const TokenDetail = (props) => {

  const classes = useStyles();
  const {code} = props.match.params;

  const network = useRecoilValue( currentNetwork );
  const list = useRecoilValue(tokenList);
  const [ohlc, setOhlcData] = useState(null);
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

  useEffect(async ()=>{
    const fetchData = async (coinId) => {
      if (coinId) {
        let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=30`);
        result = result.map(item=>{
          return {
            x: new Date(item[0]),
            y: [item[1], item[2], item[3], item[4]]
          }
        })
        return result;
      }
      return null;
    };

    if (coin) {
      const data = await fetchData(coin.coinId);
      setOhlcData(data);
    }
  }, [coin]);

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
    data: ohlc
  }];
  
  return (
    <Layout isShownBackButton = {true} isShownWallet = {false} varient = 'secondary'>
      {/* main_div */}
      <Box className={classes.root}>
        {coin && coin.code && coin.code !== 'BNB' && <div style={{marginBottom: 20, textAlign: 'right'}}>
          <span className={classes.deleteBtn} onClick={deleteToken}>Delete Token</span>
        </div>}
        <ARUCard style={{padding: '5px'}}>
          {coin && <ReactApexChart options={options} series={series} type="candlestick" height={250} /> }
        </ARUCard>
        <ARUCard className={classes.tokenInfo}>
          <Box style={{marginRight: '10px'}} >
            <img src={`images/tokens/${coin.icon}`} className={classes.tokenIcon} />
          </Box>
          <Box className={classes.tokenRow}>
            <Box className={classes.tokenLeft}>
              <Box>{coin.code}</Box>
              <Box style={{marginTop: '10px'}}>$380.50</Box>
              <Box style={{color: 'red', marginTop: '5px'}}>
                <FontAwesomeIcon icon={faCaretDown} />
                <span>5.32%</span>
              </Box>
            </Box>
            <Box className={classes.tokenLeft} style={{alignItems: 'flex-end', marginRight: '5px'}}>
              <Box style={{fontSize: '18px', fontWeight: '500'}}>2150</Box>
              <Box style={{marginTop: '5px'}}>$818,075</Box>
              <Box style={{color: '#333333', marginTop: '5px', cursor: 'pointer'}} onClick={()=>goToSendToken(coin)} >
                <span>Send</span>
                <FontAwesomeIcon icon={faSignOutAlt} style={{marginLeft: '5px'}} />
              </Box>
            </Box>
          </Box>
        </ARUCard>
        {coin && <Transactions token={coin} height={80} />}
      </Box>
    </Layout>
  );
};

export default TokenDetail;
