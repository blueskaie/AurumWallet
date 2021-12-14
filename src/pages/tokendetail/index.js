import React, {useMemo} from "react";
// get our fontawesome imports
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box } from '@material-ui/core';
import useStyles from './style';
import { tokenList, allTokens, currentNetwork  } from '../../store/atoms';
import TransactionsLocal from '../../components/transactions-local';
import ARUCard from '../../components/card';
import OneToken from "../../components/onetoken";
import ReactApexChart from 'react-apexcharts';
import Layout from "../../components/layout";

const TokenDetail = (props) => {

  const classes = useStyles();
  const {code} = props.match.params;

  const network = useRecoilValue( currentNetwork );
  const list = useRecoilValue(tokenList);
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

  const options = {
    chart: {
      type: 'candlestick',
      height: 250
    },
    title: {
      text: `${coin && coin.code}`,
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

  return (
    <Layout isShownBackButton = {true} isShownWallet = {false}>
      <Box className={classes.root}>
        {coin && coin.code && coin.code !== 'BNB' && <div style={{marginBottom: 20, textAlign: 'right'}}>
          <span className={classes.deleteBtn} onClick={deleteToken}>Delete Token</span>
        </div>}
        <ARUCard>
          <ReactApexChart options={options} series={series} type="candlestick" height={250} style={{margin: '10px'}} />
        </ARUCard>
        <OneToken {...coin} showSendLink={true}/>
        {coin && <TransactionsLocal token={coin} height={80}/>}
      </Box>
    </Layout>
  );
};

export default TokenDetail;
