import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MenuOptions from './menu-options';
import NetworkSelector from './network-selector'

import { AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    color:'white',
    background:'transparent',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600',
    color: '#424242',
    textDecoration: 'none',
    '& img': {
      marginRight: '5px'
    }
  }
});

export default function Header({loggedIn, children}) {
  const classes = useStyles();

  const eleVal = loggedIn ? 1 : 0;

  return (
    <AppBar className={classes.root} color="default" position="static" elevation={eleVal}>
      <Toolbar className={classes.root}>
        { loggedIn && <Link href="/home" to="/home" className={classes.logo}>
          <img src="images/moopay-small.png" alt="AurumWallet" />
          <span>AURUMWALLET</span>
        </Link> }
        <NetworkSelector />
        { loggedIn && <MenuOptions loggedIn={loggedIn} /> }
      </Toolbar>
      {children}
    </AppBar>
  )
}