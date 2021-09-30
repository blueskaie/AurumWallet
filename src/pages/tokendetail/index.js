import React, {useState, useEffect, useMemo} from "react";
// get our fontawesome imports
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Container } from '@material-ui/core';
import useStyles from './style';
import BackButtonHeader from '../../components/back-button-header';
import callAPI from "../../utils/api-utils";
import { tokenList, allTokens, currentNetwork  } from '../../store/atoms';
import Transactions from '../../components/transactions';
import ReactApexChart from 'react-apexcharts';

const TokenDetail = (props) => {

  const classes = useStyles();
  const {code} = props.match.params;

  const network = useRecoilValue( currentNetwork );
  const list = useRecoilValue(tokenList);
  const [ohlc, setOhlcData] = useState(null);
  const history = useHistory();

  const setAllTokens = useSetRecoilState(allTokens);
  
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
    <div style={{background: '#111111', height: '100%'}}>
      <div className={classes.header}>
        <BackButtonHeader title={`${coin && coin.code} Detail`} />
      </div>
      {/* main_div */}
      <Container className={classes.root}>
        {coin && coin.code && coin.code !== 'BNB' && <div style={{marginBottom: 20, textAlign: 'right'}}>
          <span className={classes.deleteBtn} onClick={deleteToken}>Delete Token</span>
        </div>}
        {coin && <ReactApexChart options={options} series={series} type="candlestick" height={250} /> }
        {coin && <Transactions token={coin} height={200}/>}
      </Container>

    </div>
  );
};

export default TokenDetail;
