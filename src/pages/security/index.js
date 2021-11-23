import React from 'react';

import { Box } from '@material-ui/core'
import Layout from "../../components/layout";

import ARUCard from '../../components/card';
import useStyles from "./style";
import { useHistory } from 'react-router-dom';

export default function Security() {
  const classes = useStyles( );
  const history = useHistory();

  const clickButton = (type) => {
    if (type === 'recoveryphrase')
      history.push('/reveal')
    if (type === 'privatekey')
      history.push('/show-privatekey')
    if (type === 'password')
      history.push('/change-password')
  }

  return (
    <Layout isShownBackButton={true} isShownWallet={false} varient='secondary'>
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Wallet</Box>
          <Box>Security</Box>
        </h1>
        <ARUCard className={classes.card} onClick={() => clickButton('recoveryphrase')}>
          Reveal Recovery Phrase
        </ARUCard>
        <ARUCard className={classes.card} onClick={() => clickButton('privatekey')}>
          Show Private Key
        </ARUCard>
        <ARUCard className={classes.card} onClick={() => clickButton('password')}>
          Change Password
        </ARUCard>
      </Box>
    </Layout>
  )
}