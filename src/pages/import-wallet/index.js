import React from 'react'
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom'
import Layout from "../../components/layout";
import {Box, Icon, FormControl, FormHelperText } from '@material-ui/core';
import ARUButton from '../../components/buttons';
import { ARUBaseInput } from '../../components/fields';
import ARUCard from '../../components/card';

import { useTheme } from '@material-ui/core/styles';


import { useRecoilState, useRecoilValue } from 'recoil';
import { encryptKeyStore } from '../../utils/keystore';
import { allWallets, networkProvider, currentWallet } from '../../store/atoms';


import useStyles from './style';


const helperTextString = '';
const helperErrorString = 'Invalid Password, should be atleast 8 characters long';
const helpermatchString = 'Invalid Password, should match confirm password';
const helperCheckingString = "Please check If understand.";

export default function ImportWallet() {

  const classes = useStyles( useTheme() );

  const [, setWalletAtom] = useRecoilState(allWallets);

  const provider = useRecoilValue(networkProvider);
  const cWallet = useRecoilValue(currentWallet);

  const [pass, setPass] = React.useState('');
  const [repass, setRepass] = React.useState("");
  const [mnemonic, setMnemonic] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [mnemonicError, setMnemonicError] = React.useState(false);
  const [helperMnemonicText, setHelperMnemonicText] = React.useState(helperTextString)
  const [helperPwdText, setHelperPwdText] = React.useState(helperTextString)
  const [helperRepwdText, setHelperRepwdText] = React.useState(helperTextString);
  const [helperText, setHelperText] = React.useState("");
  const [checking, setChecking] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if(cWallet && cWallet.password) {
      history.push('/home');
    }
  }, [cWallet]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!checking) {
      setHelperText(helperCheckingString);
      setPasswordError(true);
      return false;
    }

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

    if(!mnemonic ) {
      setHelperMnemonicText('Invalid Secret Recovery Phrase!');
      setMnemonicError(true)
      hasError = true;
    } else {
      setHelperMnemonicText('')
      setMnemonicError(false)
    }

    if(!hasError) {
      try {
        // get account from private key
        // const account = provider.eth.accounts.privateKeyToAccount(key);
        // const keystore = encryptKeyStore(provider, key, pass);

        // get account from mnemonic
        const account = ethers.Wallet.fromMnemonic(mnemonic);
        const keystore = encryptKeyStore(provider, account.privateKey, pass);

        setWalletAtom((item) => {
          // let all = [...item];
          // for(let i = 0; i < all.length; i++) {
          //   let si = {...all[i], current: false};
          //   all[i] = si;
          // }
          const all = [];
          const wal = {
            address: account.address,
            mnemonic: account.mnemonic,
            password: pass,
            keystore: keystore,
            current: true
          };
          all.push(wal);
          return all;
        });

      } catch(error) {
        setHelperMnemonicText(error.message);
        setMnemonicError(true)
      }
    }
    return false;
  }

  return (
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false}>
      <Box className={classes.root}>
        <h1 className={classes.logoTitle}>
          Import<br/>From Seed
        </h1>
        <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.phraseinput} error={mnemonicError}>
            <ARUBaseInput
              id="mnemonic" 
              value={mnemonic}
              onChange={e => setMnemonic(e.target.value)}
              type="text"
              multiline="true"
              rows="3"
              placeholder="Enter your Secret Recovery Phrase"
            />
            <FormHelperText classes={{root:classes.helptext}}>
              {helperMnemonicText}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.passwordinput} error={passwordError}>
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
          <ARUCard className={classes.alarmCard} onClick={() => setChecking(!checking)}>
            {!checking && <Icon className={classes.checkIcon}>
                <img src="images/unchecked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>}
            {checking && <Icon className={classes.checkIcon}>
              <img src="images/checked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
            </Icon>}
            <p>I understand that Aurum cannot recover this password.</p>
          </ARUCard>
          <FormControl error={passwordError}>
            <FormHelperText classes={{root:classes.helptext}}>
              {!checking && helperText}
            </FormHelperText>
          </FormControl>
          <ARUButton className={classes.submitPassword} type='submit'>IMPORT WALLET</ARUButton>
        </form>
      </Box>
    </Layout>
  )
}