import React from 'react';

import { Box } from '@material-ui/core'
import Layout from "../../components/layout";

import ARUCard from '../../components/card';
import useStyles from "./style";
import { useHistory } from 'react-router-dom';

export default function Settings() {
  const classes = useStyles( );
  const history = useHistory();

  const clickButton = (type) => {
    if (type === 'security')
      history.push('/security')
    else if (type === 'about-wallet')
      history.push('/about-us')
  }

  return (
    <Layout isShownWallet={false} >
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Settings</Box>
        </h1>
        <ARUCard className={classes.disabled}>
          General
        </ARUCard>
        <ARUCard className={classes.disabled}>
          Network
        </ARUCard>
        <ARUCard className={classes.card} onClick={() => clickButton('security')}>
          Wallet Security
        </ARUCard>
        <ARUCard className={classes.card} onClick={() => clickButton('about-wallet')}>
          About Aurum Wallet
        </ARUCard>
      </Box>
    </Layout>
  )
}