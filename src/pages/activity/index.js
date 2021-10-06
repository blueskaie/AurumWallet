import React from 'react'

import Layout from "../../components/layout";
import {  Box } from '@material-ui/core';
import Transactions from '../../components/transactions';

import useStyles from "./style";

export default function Activity() {
  const classes = useStyles( );

  return (
    <Layout isShownWallet={false} isShownNetworkSelector={false}>
      <Box className={classes.root}>
        <Transactions/>
      </Box>
    </Layout>
  )
}