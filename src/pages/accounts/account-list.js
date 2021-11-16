import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Icon } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HiddenText from "../../components/hidden-text";

const OneAccount = (props) => {

  const classes = useStyles(useTheme());
  const history = useHistory();
  const { name, account, visible, onClick } = props;

  const shortWalletAddress =  account && account.address 
    ? account.address.slice(0, 8) + "..." + account.address.substr(-6)
    : "";

  return (
    <Box className={classes.oneaccount} onClick={()=>onClick(account)}>
      <Box className={classes.accountinfo}>
        <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <p className={classes.name}>{name}</p>
          <p className={classes.address}><HiddenText show={visible}>{shortWalletAddress}</HiddenText></p>
        </Box>
        {account.current && <Icon className={classes.checkIcon}>
          <img src="images/checked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
        </Icon>}
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
    borderRadius: 12,
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
  name: {
    color: "white",
    margin: 0,
    fontSize: 18,
    fontWeight: 300
  },
  balance: {
    color: "white",
    margin: 0,
    fontSize: 14,
    fontWeight: 300
  },
  address: {
    color: "#555555",
    margin: 0,
    fontSize: 14,
    fontWeight: 300
  },
  checkIcon: {
    width: 30,
    height: 30
  },
}));

export default function AccountList(props) {
  return (
    <>
      {props.list && props.list.map((item, index) => {
        return <OneAccount
                  key={`oneToken-${index}`} 
                  name={`Account-${index+1}`}
                  account={item}
                  visible={props.showAccountInfo}
                  onClick={props.onSelectWallet}
              />;
      })}
    </>
  )
}