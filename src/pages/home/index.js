import React from "react";

import { useHistory } from "react-router-dom";
import { useTheme, Box, Typography } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";
import Clipboard from "react-clipboard.js";

import Layout from "../../components/layout";
import TokenList from "../../components/token-list";
import StatisticInfo from "../../components/statistic-info";
import { currentWallet } from "../../store/atoms";
import { useRecoilValue } from "recoil";
import HiddenText from "../../components/hidden-text";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import SliderList from "../../components/slider-list";

import useStyles from "./style";

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
        {/* <React.Suspense fallback={<Box className="slidebar"></Box>}>
          <SliderList />
        </React.Suspense> */}
        <Box className={classes.clipboard}>
          <Clipboard
            component="button"
            button-href="#"
            data-clipboard-text={wallet && wallet.address}
            onClick={()=>setOpenSuccess(true)}
          >
            <Typography variant="h6" className={classes.title}>
              <Box><HiddenText show={showInfo} text={shortWalletAddress}/></Box>
            </Typography>
          </Clipboard>
        </Box>
        <React.Suspense fallback={<Box className="slidebar"></Box>}>
          <StatisticInfo showInfo={showInfo} setToggleInfo={()=>setToggleInfo(!showInfo)}/>
        </React.Suspense>

        <Box className={classes.mywallet}>
          <Box className={classes.description}>
            <h3>My Wallet</h3>
            <p onClick={addToken} style={{color: 'white'}}>Add token</p>
          </Box>
          <ScrollContainer className={classes.tokenlist} vertical={true}>
            <React.Suspense fallback={<Box>Loading...</Box>}>
              <TokenList showInfo={showInfo}/>
            </React.Suspense>
          </ScrollContainer>
        </Box>
      </Box>
    </Layout>
  );
}
