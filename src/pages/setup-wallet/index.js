import React from 'react'

import Layout from "../../components/layout";
import ARUButton from '../../components/buttons';
import useStyles from "./style";
import { useHistory } from 'react-router-dom';
import {Box} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function SetupWallet() {
  const classes = useStyles(useTheme());
  const history = useHistory();

  return (
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false} varient="secondary">
      <Box className={classes.root}>
        <Box className={classes.title}>
          Wallet
        </Box>
        <Box className={classes.title}>
          Setup
        </Box>
      </Box>
      <Box className={classes.groupbutton}>
        <ARUButton
          varient="secondary"
          event='create-wallet'
          padding='30px'
        >Create a New Wallet</ARUButton>
        <ARUButton
          varient="secondary"
          event='import-wallet'
          padding='30px'
        >Import using Secret Recovery Phrase</ARUButton>
      </Box>
    </Layout>
  )
}