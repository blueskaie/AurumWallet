// import React from 'react';
// import OneAccount from "./oneaccount";
import React, {useState, useEffect, useMemo} from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as LatomicNumber from '../../utils/big.number'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HiddenText from "../../components/hidden-text";

const OneAccount = (props) => {

  const classes = useStyles(useTheme());
  const history = useHistory();
  const { name, balance, address, decimals, showAccountInfo, index, onClick, visible } = props;

  const clicked = () => {
    onClick(index);
  }

  return (
    <Box className={classes.oneaccount} onClick={clicked}>
      <Box className={classes.accountinfo}>
        <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <p className={classes.accountname} style={{fontSize: '18px', fontWeight: '500'}}>{name}</p>
          <p className={classes.accountname}>$<HiddenText show={showAccountInfo} text={parseFloat(LatomicNumber.toDecimal(balance,decimals)).toFixed(4).toLocaleString()}/></p>
          <p className={classes.accountname} style={{color: '#555555'}}><HiddenText show={showAccountInfo} text={address}/></p>
        </Box>
        <Box>
          {visible && <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', width: '25px', height: '25px'}} /> }
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  oneaccount: {
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
    background: '#222222',
    alignItems: 'center'

  },
  accountinfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-start",
    marginLeft: 7,
    width: '100%',
    zIndex: 3
  },
  accountname: {
    color: "white",
    margin: 0,
    fontSize: 14,
  },
}));

const accountList = [
  {
  "name": "Account1",
  "balance": 2000,
  "address": "0xhk12j3h4vj12h34g1k2h3j"
  },
  {
  "name": "Account2",
  "balance": 1000,
  "address": "0xhk12j3h4vj12h34g1k2h3j"
  },
  {
  "name": "Account3",
  "balance": 3000,
  "address": "0xhk12j3h4vj12h34g1k2h3j"
  }
];

export default function AccountList(props) {
  const [visibleId, setVisible] = useState(-1);
  const onClick = (index) => () => {
    setVisible(index);
  }
  return (
    <>
      {accountList.map((item, index) => {
        return <OneAccount {...props} {...item} 
                          key={`oneToken-${index}`} 
                          index = {index} 
                          onClick={onClick(index)}
                          visible={visibleId === index}
              />;
      })}
    </>
  )
}