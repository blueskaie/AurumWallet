import React, {useState, useEffect, useMemo} from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as LatomicNumber from '../utils/big.number'
import {tokenLogos} from "../config/token-info"
import Jazzicon from 'react-jazzicon';
import { useRecoilValue } from 'recoil';
import { currentNetwork  } from '../store/atoms'
import callAPI from "../utils/api-utils";
import ReactApexChart from 'react-apexcharts';
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HiddenText from "./hidden-text";

const OneToken = (props) => {

  const classes = useStyles(useTheme());
  const history = useHistory();
  const { code, balance, coinId, decimals, contract, trade, showInfo } = props;

  const network = useRecoilValue( currentNetwork );
  const [chartData, setChartData] = useState([]);

  const goToDetail = () => { history.push(`/token-detail/${code}`); }

  const fetchData = async () => {
    let data = { index: [], price: [], volumes: [] };
    if (coinId) {
      let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=1m`);
      for (const item of result.prices) {
          data.index.push(item[0]);
          data.price.push(item[1]);
      }
      for (const item of result.total_volumes) data.volumes.push(item[1]);
    }
    return data;
  };

  useEffect(() => {
		fetchData().then((res) => {
      setChartData(res)
		});
	}, []);

  const series = useMemo(()=>{
    return [{data: chartData.price}]
  }, [chartData])

  const options = {
    chart: {
      type: 'area',
      height: 90,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    },
    colors: ['#272626'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 1,
        opacityTo: 1,
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 1.5
    },
    grid: {
      show: false,
      padding: {left: 0, right:0, top: 0, bottom: 0}
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      show: false
    }
  };

  const up = Math.random() * 20 - 10;

  return (
    <Box className={classes.onetoken} onClick={goToDetail}>
      <Box className={classes.tokenimg}>
        { tokenLogos[code.toUpperCase()]
            ? <img src={tokenLogos[code.toUpperCase()]} alt={code} width={20} />
            : <Jazzicon diameter={40} seed={contract[network.id]} />
        }
      </Box>
      <Box className={classes.tokeninfo}>
        <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <p className={classes.tokenname}>{code}</p>
          <p className={classes.tokenname}><HiddenText show={showInfo} text={parseFloat(LatomicNumber.toDecimal(balance,decimals)).toFixed(4).toLocaleString()}/></p>
        </Box>
        <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <p className={classes.tokenprice}>${parseFloat(LatomicNumber.toDecimal(balance,decimals)).toFixed(4).toLocaleString()}</p>
          <p className={classes.tokenprice}><HiddenText show={showInfo} text={(parseFloat(LatomicNumber.toDecimal(balance,decimals)) * trade).toFixed(4).toLocaleString()}/></p>
        </Box>
        <Box style={{color: up > 0?'green':'red'}} >
          {up > 0 ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} /> }
          <span style={{marginLeft: 5}}>{Math.abs(up.toFixed(2))}%</span>
        </Box>
      </Box>
      <Box className={classes.pricechart}>
        <ReactApexChart options={options} series={series} type="area" height={90}/>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  onetoken: {
    position: 'relative',
    cursor:'pointer',
    height: 70,
    zIndex: 1,
    display: "flex",
    margin: "8px 0px",
    boxSizing: "border-box",
    boxShadow: '0px 3px 3px #000000c2',
    padding: 10,
    borderRadius: 10,
    // background: "#1e1d1d",
    background: 'linear-gradient(to bottom, #1e1d1d 0%,#1e1d1d 60px,#000000 50%,#272626 60px,#272626 70px)',
    alignItems: 'center'

  },
  tokenimg:{
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow:'hidden',
    zIndex: 3,
    "& > img": {
      width: 40,
    },
  },
  tokeninfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "center",
    marginLeft: 7,
    width: 'calc(100% - 50px)',
    zIndex: 3
  },
  tokenname: {
    color: "white",
    margin: 0,
    fontSize: 14,
  },
  tokenprice: {
    color: "#bcc5e1",
    fontSize: 12,
    margin: '5px 0px',
  },
  pricechart: {
    position: 'absolute',
    top: -5,
    right: 0,
    width: '100%',
    height :'100%',
    zIndex: 2
  },
}));

export default OneToken;
