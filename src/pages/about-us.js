import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout";
import {  Box } from '@material-ui/core';
import ARUCard from '../components/card';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.8em'
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: '#333333',
      borderRadius: 5,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      borderRadius: 5,
      width: 10,
      outline: '1px solid slategrey'
    }
  },
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    position: 'relative',
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'unset',
    fontSize: 33,
    fontWeight: 700,
    lineHeight: '31px',
    fontWeight: '100',
    letterSpacing: '1px'
  },
  subtitle: {
    position: 'relative',
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'unset',
    fontSize: 33,
    fontWeight: 700,
    lineHeight: '31px',
    fontWeight: '100',
    letterSpacing: '1px'
  },
  card: {
    padding: 20,
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    cursor: 'pointer',
  },
  content: {
    padding: 20,
    marginTop: 10,
    color: 'white',
    fontSize: 14,
    height: 370,
    '& div': {

    }
  }
}));

export default function AboutUs() {
  const classes = useStyles( );

  const [isClickButton, setClickButton] = useState(0);

  const onClickButton = (val) => {
    setClickButton(val);
  }

  return (
    <Layout isShownNetworkSelector = {false} isShownBackButton = {true} isShownWallet={false} >
      <Box className={classes.root}>
        { isClickButton == 0 && 
          <Box>
            <Box className={classes.title}>
              About
            </Box>
            <ARUCard className={classes.card} onClick={() => onClickButton(1)}>
              Privacy Policy
            </ARUCard>
            <ARUCard className={classes.card} onClick={() => onClickButton(2)}>
              Terms of Use
            </ARUCard>
            <ARUCard className={classes.card}>
              Visit Our Website
            </ARUCard>
          </Box>
        }
        { isClickButton == 1 && 
          <Box>
            <Box className={classes.subtitle}>Privacy Policy</Box>
            <ARUCard className={classes.content}>
              <Box style={{height: '100%', overflow: 'auto', paddingRight: 20}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </Box>
            </ARUCard>
          </Box>
        }
        { isClickButton == 2 && 
          <Box>
            <Box className={classes.subtitle}>Terms of Use</Box>
            <ARUCard className={classes.content}>
              <Box style={{height: '100%', overflow: 'auto', paddingRight: 20}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </Box>
            </ARUCard>
          </Box>
        }
      </Box>
    </Layout>
  )
}