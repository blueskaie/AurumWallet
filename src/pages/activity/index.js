import React from 'react'

import {  Button, Container } from '@material-ui/core'
import BackButtonHeader from '../../components/back-button-header'
import Transactions from '../../components/transactions'

import useStyles from "./style";


export default function Activity() {
  const classes = useStyles( );

  return (
    <>
      <div className={classes.header}>
        <BackButtonHeader title="Activity" />
      </div>

      <Container className={classes.root}>
        <Transactions/>
      </Container>
    </>
  )
}