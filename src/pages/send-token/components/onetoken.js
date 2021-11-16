import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as LatomicNumber from '../../../utils/big.number'
import {tokenLogos} from "../../../config/token-info"
import Jazzicon from 'react-jazzicon';
import { useRecoilValue } from 'recoil';
import { currentNetwork  } from '../../../store/atoms';
import ARUCard from '../../../components/card';

const OneToken = (props) => {

  const classes = useStyles(useTheme());
  const { token, onClick } = props;

  const network = useRecoilValue( currentNetwork );

  return (
    <ARUCard className={classes.root} onClick={onClick}>
    { token 
      ? <Fragment>
          <Box className={classes.tokenimg}>
          { tokenLogos[token.code.toUpperCase()]
              ? <img src={tokenLogos[token.code.toUpperCase()]} alt={token.code} width={20} />
              : <Jazzicon diameter={40} seed={token.contract[network.id]} />
          }
          </Box>
          <Box className={classes.tokeninfo}>
            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <p className={classes.tokenname}>{token.code}</p>
              <p className={classes.tokenname}>{parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)).toFixed(4).toLocaleString()}</p>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <p className={classes.tokenprice}>${parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)).toFixed(4).toLocaleString()}</p>
              <p className={classes.tokenprice}>${(parseFloat(LatomicNumber.toDecimal(token.balance, token.decimals)) * token.trade).toFixed(4).toLocaleString()}</p>
            </Box>
            <Box><p className={classes.tokenprice}>BEP20</p></Box>
          </Box>
        </Fragment>
      : ''
    }
    </ARUCard>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    cursor:'pointer',
    height: 50,
    zIndex: 1,
    display: "flex",
    margin: "10px 0px",
    padding: '10px 20px 10px 12px',
    alignItems: 'center'
  },
  tokenimg:{
    width: 40,
    height: 40,
    borderRadius: 12,
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
    marginLeft: 10,
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
    margin: '2px 0px',
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
