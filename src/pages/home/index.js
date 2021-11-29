import React from "react";

import { useHistory } from "react-router-dom";
import { useTheme, Box, Typography, Snackbar } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";
import Clipboard from "react-clipboard.js";

import Layout from "../../components/layout";
import TokenList from "../../components/token-list";
import StatisticInfo from "../../components/statistic-info";
import { currentWallet } from "../../store/atoms";
import { useRecoilValue } from "recoil";
import HiddenText from "../../components/hidden-text";
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from "./style";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
  const classes = useStyles(useTheme());
  const history = useHistory();
  const [showInfo, setToggleInfo] = React.useState(true);

  const addToken = () => { history.push("/add-token"); };

  const wallet = useRecoilValue(currentWallet);
  const shortWalletAddress =  wallet 
    ? wallet.address.slice(0, 6) + "..." + wallet.address.substr(-4)
    : "";
  const [openSuccess, setOpenSuccess] = React.useState(false);

  return (
    <Layout isShownWallet={false} >
      <Box className={classes.root}>
        <Box className={classes.clipboard}>
          <Clipboard
            component="button"
            button-href="#"
            data-clipboard-text={wallet && wallet.address}
            onClick={()=>setOpenSuccess(true)}
          >
            <Typography variant="h6" className={classes.walletaddress}>
              <Box><HiddenText show={showInfo} length={20}>{shortWalletAddress}</HiddenText></Box>
            </Typography>
          </Clipboard>
        </Box>
        <StatisticInfo showInfo={showInfo} setToggleInfo={()=>setToggleInfo(!showInfo)}/>

        <Box className={classes.mywallet}>
          <Box className={classes.description}>
            <h3>My Wallet</h3>
            <p onClick={addToken} style={{color: 'white'}}>Add token</p>
          </Box>
          <ScrollContainer className={classes.tokenlist} vertical={true}>
            <TokenList showInfo={showInfo}/>
          </ScrollContainer>
        </Box>
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Address copied
        </Alert>
      </Snackbar>
    </Layout>
  );
}
