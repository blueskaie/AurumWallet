import React from 'react'

import Layout from "../../components/layout";
import {  Box } from '@material-ui/core';
import TransactionsLocal from '../../components/transactions-local';

import useStyles from "./style";

export default function Activity() {
  const classes = useStyles( );

  return (
    <Layout isShownWallet={false} >
      <Box className={classes.root}>
        <Box className={classes.title}>
          Activity
        </Box>
        <Box className={classes.transactions}>
          <TransactionsLocal height={400}/>
        </Box>
      </Box>
    </Layout>
  )
}