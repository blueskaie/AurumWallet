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
  }

  return (
    <Layout isShownWallet={false} varient='secondary'>
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Settings</Box>
        </h1>
        <ARUCard className={classes.card}>
          General
        </ARUCard>
        <ARUCard className={classes.card}>
          Network
        </ARUCard>
        <ARUCard className={classes.card} onClick={() => clickButton('security')}>
          Wallet Security
        </ARUCard>
        <ARUCard className={classes.card}>
          About Aurum Wallet
        </ARUCard>
      </Box>
    </Layout>
  )
}