import React from 'react'

import { useHistory } from 'react-router-dom'
import Layout from "../../components/layout";
import {Button, Box, TextField, FormControl, FormHelperText } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';


import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../../components/header';
import { encryptKeyStore } from '../../utils/keystore';
import { allWallets, networkProvider, currentWallet } from '../../store/atoms';

import useStyles from './style';


const helperTextString = 'This password encrypts your private key. Make sure to remember this password as you will need it to unlock your wallet.';
const helperErrorString = 'Invalid Password, should be atleast 8 characters long';


export default function ImportWallet() {

  const classes = useStyles( useTheme() );

  const [, setWalletAtom] = useRecoilState(allWallets)

  const web3 = useRecoilValue(networkProvider)
  const cWallet = useRecoilValue(currentWallet)

  const [key, setKey] = React.useState('');

  const [pass, setPass] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [keyError, setKeyError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(helperTextString)

  const [helperKeyText, setHelperKeyText] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    if(cWallet && cWallet.password) {
      history.push('/home');
    }
  }, [cWallet]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    if(!pass || pass.length < 8) {
      setHelperText(helperErrorString)
      setPasswordError(true)
      hasError = true;
    } else {
      setHelperText(helperTextString)
      setPasswordError(false);
    }

    if(!key ) {
      setHelperKeyText('Key invalid');
      setKeyError(true)
      hasError = true;
    } else {
      setHelperKeyText('')
      setKeyError(false)
    }

    if(!hasError) {
      try {
        const account = web3.eth.accounts.privateKeyToAccount(key);
        const keystore = encryptKeyStore(web3, key, pass);

        setWalletAtom((item) => {
          let all = [...item];
          for(let i = 0; i < all.length; i++) {
            let si = {...all[i], current: false};
            all[i] = si;
          }
          const wal = {
            address: account.address,
            password: pass,
            keystore: keystore,
            current: true
          };
          all.push(wal);
          return all;
        });

      } catch(error) {
        console.error(error)
        setHelperKeyText(error.message);
        setKeyError(true)
      }
    }
    return false;
  }

  return (
    <Layout isShownHeader={false}>
      <Box className={classes.root}>
        <div className={classes.logo}>
          <img src="images/logo.png" alt="AurumWallet" className="wallet-image"/>
        </div>

        <h1 className={classes.logoTitle}>AurumWallet</h1>

        <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.passwordinput} error={keyError}>
            <TextField id="key" value={key} onChange={e => setKey(e.target.value)}
              aria-describedby="password_helper" type="text" placeholder="Private Key" InputProps={{ disableUnderline: true }}/>
            <FormHelperText classes={{root:classes.helptext}}>
              {helperKeyText}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.repasswordinput} error={passwordError}>
            <TextField id="password" value={pass} onChange={e => setPass(e.target.value)}
              aria-describedby="password_helper" type="password" placeholder="New Password(min 8 chars)" InputProps={{ disableUnderline: true }}/>
            <FormHelperText classes={{root:classes.helptext}}>
              {helperText}
            </FormHelperText>
          </FormControl>
          <Button variant="contained" type="submit" className={classes.button}>Import private key</Button>
        </form>
        <Button onClick={() => { history.push('/'); }} variant="contained" className={classes.button}>Cancel</Button>

      </Box>
    </Layout>
  )
}