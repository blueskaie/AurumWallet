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
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <img src="images/aurum.png" alt="AurumWallet" className="logo-image" style={{width: '50px', height: '50px'}} />
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
      <div className={classes.portfolio}>
        <div style={{flex: '4', fontWeight: '300', padding: '10px'}}>
          <div style={{fontWeight: '700', fontSize: '25px'}}>Portfolio</div>
          <div>$826,181.55</div>
          <div style={{fontSize: '15px'}}>
            <FontAwesomeIcon icon={faCaretDown} style={{color: 'red'}} />
            {/* <FontAwesomeIcon icon={faCaretUp} style={{color: 'green'}} /> */}
            <span style={{color: 'red', marginTop: '10px'}}>$7,578.44/7.8%</span>
            <span style={{marginLeft: '10px', marginTop: '10px'}}>24h</span>
          </div>
        </div>
        <div style={{flex: '1', fontSize:'12px'}}>
          <select style={{fontWeight: '400', borderRadius: '5px'}}>
            <option value='USD'>USD</option>
          </select>
        </div>
      </div>
      {/* <React.Suspense fallback={<div className="slidebar"></div>}>
        <SliderList />
      </React.Suspense> */}

      <div className={classes.mywallet}>
        <div className="description">
          <h3>My Wallet</h3>
          <p onClick={addToken} style={{color: 'white'}}>Add token</p>
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
