import React from "react";

import { useHistory } from "react-router-dom";
import { useTheme, Box, Icon, IconButton } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";

import Layout from "../../components/layout";
import AccountList from "./account-list";

import useStyles from "./style";

export default function Accounts() {
  const classes = useStyles(useTheme());
  const history = useHistory();
  const [showAccountInfo, setToggleAccountInfo] = React.useState(true);

  const addToken = () => { history.push("/add-token"); };

  const clicked = (showAccountInfo) => () => {
    setToggleAccountInfo(showAccountInfo)
  }
  return (
    <Layout isShownWallet = {false} varient = 'secondary'>
      <Box className={classes.root}>
        <Box className={classes.myaccount}>
          <Box className={classes.title}>
            <Box className={classes.description}>
              <h3>Accounts</h3>
              <IconButton
                className={classes.toggleButton}
                onClick={clicked(!showAccountInfo)}
              >
                <Icon className={classes.eyeIcon}>
                {
                  showAccountInfo 
                    ?<img src="images/hide.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
                    :<img src="images/show.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
                }
                </Icon>
              </IconButton>
            </Box>
            <p onClick={addToken} style={{color: 'white', cursor: 'pointer'}}>Create Account</p>
            </Box>
          <ScrollContainer className={classes.accountlist} vertical={true}>
            <React.Suspense fallback={<Box>Loading...</Box>}>
              <AccountList showAccountInfo={showAccountInfo}/>
            </React.Suspense>
          </ScrollContainer>
        </Box>
      </Box>
    </Layout>
  );
}
