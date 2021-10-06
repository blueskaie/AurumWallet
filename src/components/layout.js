import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme, Toolbar, Snackbar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Clipboard from "react-clipboard.js";
import { useRecoilValue , useRecoilState} from "recoil";
import { currentWallet, refreshCalled } from "../store/atoms";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MuiAlert from '@material-ui/lab/Alert';
import NetworkSelector from "./network-selector";
import MenuOptions from "./menu-options";
// import SliderList from "../../components/slider-list";

const useStyles = makeStyles((theme)=>({
  root: {
    paddingLeft: 30,
    paddingRight: 30,
    background: "#161616",
  },
  topmenu: {
    position: 'fixed',
    width: 'calc(100% - 60px)',
    zIndex: 10,
    background: '#161616'
  },
  toolbar: {
    padding: 0,
    color:'#ffffff',
    background:'transparent',
    height:46,
    minHeight:46,

    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
  },
  clipboard: {
    textAlign: 'right',
    '& button':{
      background:'transparent',
      border:'none',
    }
  },
  title:{
    cursor:'pointer',
    color:'#ffffff',
    flexGrow: 1,
    fontSize: '1rem',
  },
  content: {
    marginTop: 110,
    position: 'relative',
    zIndex: 1,
  },
  bottomimg: {
    position: "absolute",
    bottom: 0,
    left: -30,
    width: 447,
    maxWidth: "inherit",
    userSelect:'none'
  },
  termofservice: {
    position: 'absolute',
    bottom: 35,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    width: 'calc(100% - 60px)',
    "& p" : {
      background: '#161616',
      margin: 0,
      padding: 5,
      fontSize: 10,
    }
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Layout({isShownHeader=true, isShownWallet = true, isShownNetworkSelector = true, children}) {
  const classes = useStyles(useTheme());
  const loggedIn = true;
  // const [refresh, setRefresh] = useRecoilState(refreshCalled);

  // const handleRefresh = () => {
  //   const updR = refresh + 1;
  //   setRefresh(updR);
  // }

  // React.useEffect(()=>{
  //   handleRefresh();
  // },[])
  
  const wallet = useRecoilValue(currentWallet);
  const shortWalletAddress =  wallet 
    ? wallet.address.slice(0, 6) + "..." + wallet.address.substr(-4)
    : "";
  const [openSuccess, setOpenSuccess] = React.useState(false);

  return (
    <Box className={classes.root}>
      {isShownHeader && <Box className={classes.topmenu}>
        <Box>
          <Toolbar className={classes.toolbar}>
              <MenuOptions loggedIn={loggedIn} />
              {isShownNetworkSelector && <NetworkSelector />}
          </Toolbar>
          {isShownWallet && <Box className={classes.clipboard}>
            <Clipboard
              component="button"
              button-href="#"
              data-clipboard-text={wallet && wallet.address}
              onClick={()=>setOpenSuccess(true)}
            >
              <Typography variant="h6" className={classes.title}>
                {shortWalletAddress}
              </Typography>
            </Clipboard>
          </Box>}
        </Box>
      </Box>}
      <Box className={classes.content}>
        {children}
      </Box>
      <img
        src="images/wave.png"
        className={classes.bottomimg}
        alt="bottom_image"
      />
      <div className={classes.termofservice}>
        <p>Terms of service</p>
      </div>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Address copied
        </Alert>
      </Snackbar>
    </Box>
  );
}
