import React from "react";

import { useHistory } from "react-router-dom";
import { useTheme, Toolbar, Snackbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ScrollContainer from "react-indiana-drag-scroll";
import Clipboard from "react-clipboard.js";
import { useRecoilValue , useRecoilState} from "recoil";
import { currentWallet, refreshCalled } from "../../store/atoms";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MuiAlert from '@material-ui/lab/Alert';
import NetworkSelector from "../../components/network-selector";
import Options from "../../components/options";
import TokenList from "../../components/token-list";
import SliderList from "../../components/slider-list";

import useStyles from "./style";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
  const classes = useStyles(useTheme());
  const loggedIn = true;
  const history = useHistory();
  const addToken = () => { history.push("/add-token"); };
  const [refresh, setRefresh] = useRecoilState(refreshCalled);

  const handleRefresh = () => {
    const updR = refresh + 1;
    setRefresh(updR);
  }
  React.useEffect(()=>{
    handleRefresh();
  },[])
  const wallet = useRecoilValue(currentWallet);
  const shortWalletAddress =  wallet.address.slice(0, 5) + "..." + wallet.address.substr(-4);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Clipboard
            component="button"
            button-href="#"
            data-clipboard-text={wallet.address}
            onClick={()=>setOpenSuccess(true)}
          >
            <Typography variant="h6" className={classes.title}>
              {shortWalletAddress}
            </Typography>
          </Clipboard>
        </Toolbar>
        <div className={classes.rightbtn}>
          <Toolbar className={classes.rightlink}>
            <NetworkSelector />
            <Options loggedIn={loggedIn} />
          </Toolbar>
        </div>
      </div>
      <React.Suspense fallback={<div className="slidebar"></div>}>
        <SliderList />
      </React.Suspense>

      <div className={classes.mywallet}>
        <div className="description">
          <h3>My Wallet</h3>
          <p onClick={addToken}>Add token</p>
        </div>
        <ScrollContainer className={classes.tokenlist} vertical={true}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <TokenList />
          </React.Suspense>
        </ScrollContainer>
      </div>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success">
            Address copied
          </Alert>
        </Snackbar>
      <img
        src="images/wave.png"
        className={classes.bottomimg}
        alt="bottom_image"
      />
    </div>
  );
}
