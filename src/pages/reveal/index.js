import * as React from "react";
// get our fontawesome imports
import Layout from "../../components/layout";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import useStyles from "./style";

const Reveal = () => {
  const classes = useStyles();
  const history = useHistory();
  const goWallet = ()=>{
    console.log('goto Create');
    history.push('/createwallet');
  }
  
  return (
    <Layout isShownWallet={false} isShownNetworkSelector={false}>
      <Box className={classes.root}>
        <Box className={classes.lock}>
          <Box className={classes.lockimage}>
            <img src="images/lock.png"/>
          </Box>
          <span className={classes.reveal} onClick={goWallet}>
            Reveal seedphrase
          </span>
        </Box>
        <Box className={classes.footer}>
          <p className={classes.terms}>Terms of service</p>
        </Box>
        <img src="images/wave.png" className={classes.bottomimg}/>
      </Box>
    </Layout>
  );
};

export default Reveal;
