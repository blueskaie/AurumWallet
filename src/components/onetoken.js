import React, {useState, useEffect, useMemo} from "react";
import { useHistory } from "react-router-dom";

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

const OneToken = (props) => {

  const classes = useStyles(useTheme());
  const history = useHistory();
  const { code, balance, coinId, decimals, contract } = props;

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
    colors: ['#222222'],
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

  return (
    <div className={classes.onetoken} onClick={goToDetail}>
      <div className={classes.tokenimg}>
        { tokenLogos[code.toUpperCase()]
            ? <img src={tokenLogos[code.toUpperCase()]} alt={code} className="tokenImage" />
            : <Jazzicon diameter={40} seed={contract[network.id]} />
        }
      </div>
      <div className={classes.tokeninfo}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <p className={classes.tokenname}>{code}</p>
          <p className={classes.tokenname}>2,150</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <p className={classes.tokenprice}>{parseFloat(LatomicNumber.toDecimal(balance,decimals)).toFixed(4)}</p>
          <p className={classes.tokenprice}>$818,075</p>
        </div>
        <div style={{color: 'red'}} >
          <FontAwesomeIcon icon={faCaretDown} />
          {/* <FontAwesomeIcon icon={faCaretUp} style={{color: 'green'}} /> */}
          <span>5.35%</span>
        </div>
      </div>
      <div className={classes.pricechart}>
        <ReactApexChart options={options} series={series} type="area" height={90}/>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  onetoken: {
    position: 'relative',
    cursor:'pointer',
    maxHeight: 60,
    zIndex: 2,
    display: "flex",
    margin: "10px 0px",
    boxSizing: "border-box",
    padding: "5px 10px",
    borderRadius: 10,
    background: "#222222",

  },
  tokenimg:{
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow:'hidden',
    "& > img": {
      width: 46,
    },
  },
  tokeninfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "center",
    marginLeft: 7,
    width: '100%'
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
    top: -8,
    right: 0,
    width: '100%',
    height :'100%'
  },
}));

export default OneToken;
