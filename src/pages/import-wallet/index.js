import React from 'react'

import { useHistory } from 'react-router-dom'
import Layout from "../../components/layout";
import {Button, Box, Icon, TextField, FormControl, FormHelperText } from '@material-ui/core';
import ARUButton from '../../components/buttons';
import { ARUBaseInput, ARUBaseTextArea } from '../../components/fields';
import ARUCard from '../../components/card';

import { useTheme } from '@material-ui/core/styles';


import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../../components/header';
import { encryptKeyStore } from '../../utils/keystore';
import { allWallets, networkProvider, currentWallet } from '../../store/atoms';
import { ethers } from 'ethers';

import useStyles from './style';


const helperTextString = '';
const helperErrorString = 'Invalid Password, should be atleast 8 characters long';
const helpermatchString = 'Invalid Password, should match confirm password';

export default function ImportWallet() {

  const classes = useStyles( useTheme() );

  const [, setWalletAtom] = useRecoilState(allWallets)

  const web3 = useRecoilValue(networkProvider)
  const cWallet = useRecoilValue(currentWallet)

  const [key, setKey] = React.useState('');

  const [pass, setPass] = React.useState('');
  const [repass, setRepass] = React.useState("");
  const [phrase, setPhrase] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [keyError, setKeyError] = React.useState(false);
  const [helperKeyText, setHelperKeyText] = React.useState(helperTextString)
  const [helperPwdText, setHelperPwdText] = React.useState(helperTextString)
  const [helperRepwdText, setHelperRepwdText] = React.useState(helperTextString);

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
      setHelperPwdText(helperErrorString)
      setPasswordError(true)
      hasError = true;
    } else {
      if (pass !== repass) {
        setHelperRepwdText(helpermatchString);
        setPasswordError(true);
        return false;
      } else {
        setHelperRepwdText("");
        setPasswordError(false);
      }
    }

    if(!key ) {
      setHelperKeyText('Invalid Secret Recovery Phrase!');
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
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false} varient="secondary">
      <Box className={classes.root}>
        <h1 className={classes.logoTitle}>
          Import<br/>From Seed
        </h1>
        <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.phraseinput} error={keyError}>
            <ARUBaseTextArea
              id="phrase" 
              value={phrase}
              onChange={e => setPhrase(e.target.value)}
              type="text"
              multiline="true"
              rows="3"
              placeholder="Enter your Secret Recovery Phrase"
              // value=""
            />
            <FormHelperText classes={{root:classes.helptext}}>
              {helperKeyText}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.passwordinput} error={keyError}>
            <ARUBaseInput
              id="password" 
              value={pass}
              onChange={e => setPass(e.target.value)}
              type="password"
              placeholder="New Password"
            />
            <FormHelperText classes={{root:classes.helptext}}>
              {helperPwdText}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.repasswordinput} error={passwordError}>
            <ARUBaseInput
              id="re_password" 
              value={repass}
              onChange={e => setRepass(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <FormHelperText classes={{root:classes.helptext}}>
              {helperRepwdText}
            </FormHelperText>
          </FormControl>
          <ARUCard className={classes.alarmCard}>
            <Icon className={classes.checkIcon}>
              <img src="images/checked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
            </Icon>
            <p>I understand that Aurum cannot recover this password.</p>
          </ARUCard>
          <ARUButton className={classes.submitPassword} type='submit'>IMPORT WALLET</ARUButton>
        </form>
      </Box>
    </Layout>
  )
}