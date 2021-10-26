import React from 'react'

import { useHistory } from 'react-router-dom'
import { ethers } from 'ethers';
import {Button, Box, Icon, FormControl, FormHelperText} from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import Layout from "../../components/layout";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Clipboard from 'react-clipboard.js';
import { encryptKeyStore } from '../../utils/keystore';
import { allWallets, currentWallet, networkProvider,allTokens } from '../../store/atoms';
import ALL_TOKENS from '../../config/tokens';
import ARUButton from '../../components/buttons';
import ARUCard from '../../components/card';
import { ARUBaseInput } from '../../components/fields';
import ARUMnemonic from './mnemonic';

import useStyles from "./style";

const helpermatchString = "Password doesn't match.";
const helperErrorString =
  "Invalid Password, should be atleast 8 characters long";

export default function CreateWallet() {
  const classes = useStyles(useTheme());
  const [, setWalletAtom] = useRecoilState(allWallets)
  const provider = useRecoilValue(networkProvider);
  const cWallet = useRecoilValue(currentWallet);
  const [currentTokens, setCurrentTokens] = useRecoilState(allTokens);

  const [pass, setPass] = React.useState("");
  const [repass, setRepass] = React.useState("");
  const [mnemonic, setMnemonic] = React.useState(null);
  const [confirmMnemonic, setConfirmMnemonic] = React.useState(null);
  const [showSecretPharse, setToggleSecretPharse] = React.useState(false);
  const [step, setStep] = React.useState(1);
  // step = 1: password confirmation
  // step = 2: menmonic confirmation
  // step = 3: create wallet

  const [passwordError, setPasswordError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const [wallet, setWallet] = React.useState(null);

  const history = useHistory();

  // React.useEffect(()=>{

  //   console.log("wallet",wallet);
  // },[wallet])

  React.useEffect(() => {
    if (cWallet && cWallet.password) {
      history.push("/home");
    }
  }, [cWallet]); //eslint-disable-line react-hooks/exhaustive-deps

  const goToWallet = (event) => {
    event.preventDefault();
    const keystore = encryptKeyStore(provider,  wallet.privateKey, pass);

    setWalletAtom((current) => {
      // const all = [...current];
      // for(let i = 0; i < all.length; i++) {
      //   let si = {...all[i], current: false};
      //   all[i] = si;
      // }
      const all = [];
      all.push({
        address: wallet.address,
        mnemonic: wallet.mnemonic,
        password: pass,
        keystore: keystore,
        current: true
      })
      return all;
    });

    // history.push('/');

    return false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pass || pass.length < 8) {
      setHelperText(helperErrorString);
      setPasswordError(true);
      return false;
    } else {
      if (pass !== repass) {
        setHelperText(helpermatchString);
        setPasswordError(true);
        return false;
      } else {
        setHelperText("");
        setPasswordError(false);
      }
    }

    const randomBytes = ethers.utils.randomBytes(16);
    const mnemonic =  ethers.utils.HDNode.entropyToMnemonic(randomBytes);
    setMnemonic(mnemonic);
    setStep(2);
  };

  const handleCreateWallet = async (event) => {
    event.preventDefault();
    if (mnemonic===confirmMnemonic) {
      let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
      setWallet(mnemonicWallet);
      setCurrentTokens(ALL_TOKENS);
      setStep(4);
    } else {
      console.log('not matched');
    }
  }
  
  const handleBackClick = () => {
    if(history.length) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  return (
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false} varient="secondary">
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          {step == 1 && 'Create Password'}
          {step == 2 && 'Secure Wallet'}
          {step == 3 && 'Confirm Recovery Phrase'}
        </h1>
        {step == 1 && (
          <form
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <FormControl
              className={classes.passwordinput}
              error={passwordError}
            >
              <ARUBaseInput
                id="password" 
                value={pass}
                onChange={e => setPass(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </FormControl>
            <FormControl
              className={classes.repasswordinput}
              error={passwordError}
            >
              <ARUBaseInput
                id="re_password" 
                value={repass}
                onChange={e => setRepass(e.target.value)}
                type="password"
                placeholder="Re Password"
              />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <ARUCard className={classes.alarmCard}>
              <Icon className={classes.checkIcon}>
                <img src="images/checked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>
              <p>I understand that Aurum cannot recover this password.</p>
            </ARUCard>
            <ARUButton className={classes.submitPassword} type='submit'>CREATE PASSWORD</ARUButton>
          </form>
        )}
        { step == 2 &&
          <Box className={classes.flexBox}>
            <ARUCard className={classes.alarmCard}>
              <Icon className={classes.checkIcon}>
                <img src="images/warning.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>
              <p>
                This is your Secret Recovery Pharse. Write it down and keep it in a safe place.
                You'll be asked to re-enter this phrase in the next step - in the same order.
              </p>
            </ARUCard>
            <ARUCard className={classes.secretPharse}>
              <Box style={{color: showSecretPharse?'white':'transparent'}}>
              { mnemonic }
              </Box>
            </ARUCard>
            <ARUButton className={classes.hideSecretPharseBtn} mode='outline' onClick={()=>{setToggleSecretPharse(!showSecretPharse)}}>
              <strong> {showSecretPharse ? 'Hide' : 'Show'}</strong> <span style={{marginLeft: 5}}>my Secret Recovery Pharse</span>
            </ARUButton>
            <ARUButton className={classes.wroteDownBtn} mode='filled' onClick={()=>setStep(3)}>
              I WROTE DOWN MY PHRASE
            </ARUButton>
              {/* <Box className={classes.copyGroup}>
                <textarea type="text" rows="3" readOnly value={mnemonic}></textarea>
                <Clipboard component="button" button-href="#" data-clipboard-text={mnemonic}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="icon"><path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z"/></svg>
                </Clipboard>
              </Box> */}
          </Box>
        }
        {
          step == 3 &&
          <Box className={classes.flexBox}>
            <Box className={classes.confirmSecretPharse}>{confirmMnemonic}</Box>
            <ARUCard className={classes.confirmPharseDescription}>
              Select each word in the same order that you previously wrote down
            </ARUCard>
            <ARUMnemonic mnemonic={mnemonic} onChange={(val)=>setConfirmMnemonic(val)}/>
            <ARUButton className={classes.createWalletBtn} mode='filled' onClick={handleCreateWallet} disabled={mnemonic!==confirmMnemonic}>
              CREATE WALLET
            </ARUButton>
          </Box>
        }
        {
          step == 4 && 
          <Box className={classes.flexBox}>
            <Alert severity="success" className={classes.congulatelations}>
              CONGULATELATIONS
            </Alert>
            <ARUButton onClick={goToWallet}>My Wallet</ARUButton>
          </Box>
        }
      </Box>
    </Layout>
  );
}
