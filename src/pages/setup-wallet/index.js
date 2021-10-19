import React from 'react'

import Layout from "../../components/layout";
import { ARUButton } from '../../components/buttons';
import CustomButton from '../../components/btn';
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
        <CustomButton
          bgcolor='transparent'
          color='white'
          caption='Create a New Wallet'
          event='create-wallet'
          padding='30px'
        />
        <CustomButton
          bgcolor='transparent'
          color='white'
          caption='Import using Secret Recovery Phrase'
          event='import-wallet'
          padding='30px'
        />
      </Box>
    </Layout>
  )
}