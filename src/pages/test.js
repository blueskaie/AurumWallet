import React from 'react'

import {  Container, Typography, Box } from '@material-ui/core'
import BackButtonHeader from '../components/back-button-header'

import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout'
import Header from '../components/header'
import { useRecoilValue } from 'recoil';
import { currentWallet } from '../store/atoms';

import Clipboard from 'react-clipboard.js';

import QRCode from "react-qr-code";


const useStyles = makeStyles((theme) => ({
  root: {
    padding:theme.spacing(2),
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  bottomSpace: {
    marginBottom: theme.spacing(2)
  },
  copyGroup: {
    display: 'flex',
    '& textarea': {
      width: '100%',
      border: '1px solid #ccc',
      borderRight: 'none',
      background: '#fafafa',
      borderRadius: '2px 0 0 2px',
      '&:focus': {
        outline: 'none',
        background: '#f3f3f3'
      }
    },
    '& button': {
      cursor: 'pointer',
      width: '50px',
      background: '#f1f1f1',
      border: '1px solid #ccc',
      borderLeft: 'none',
      borderRadius: '0 2px 2px 0',
      '& svg': {
        width: '15px'
      }
    }
  }

}));

export default function Receive() {
  const classes = useStyles( );

  const wallet = useRecoilValue(currentWallet);

  return (
    <Layout>
      Test
    </Layout>
  )
}