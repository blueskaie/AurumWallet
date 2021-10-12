import React from 'react'

import Layout from "../../components/layout";
import {  Box } from '@material-ui/core';
import Transactions from '../../components/transactions';

import useStyles from "./style";

export default function Activity() {
  const classes = useStyles( );

  return (
    <Layout isShownWallet={false} varient="secondary">
      <Box className={classes.root}>
        <Box className={classes.title}>
          Activity
        </Box>
        <Transactions height={400}/>
      </Box>
    </Layout>
  )
}