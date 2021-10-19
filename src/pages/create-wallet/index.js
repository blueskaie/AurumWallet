import React from 'react'

import { useHistory } from 'react-router-dom'
import { ethers } from 'ethers';
import {Button, Box, TextField, FormControl, FormHelperText} from '@material-ui/core';
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

  const copyConfirmed = (event) => {
    event.preventDefault();
    const keystore = encryptKeyStore(provider,  wallet.privateKey, pass);

    setWalletAtom((current) => {
      const all = [...current];
      for(let i = 0; i < all.length; i++) {
        let si = {...all[i], current: false};
        all[i] = si;
      }
      all.push({
        address: wallet.address,
        password: pass,
        keystore: keystore,
        current: true
      })
      return all;
    });

    history.push('/');

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
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    setWallet(mnemonicWallet);
    setCurrentTokens(ALL_TOKENS);
    setStep(3);
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
          Create <br /> Password
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
              <TextField
                id="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                aria-describedby="password_helper"
                type="password"
                placeholder="Password"
                InputProps={{ disableUnderline: true }}
                className={classes.passwordinput}
              />
            </FormControl>
            <FormControl
              className={classes.repasswordinput}
              error={passwordError}
            >
              <TextField
                id="re_password"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
                aria-describedby="password_helper"
                type="password"
                placeholder="Re Password"
                InputProps={{ disableUnderline: true }}
                className={classes.passwordinput}
              />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <ARUCard className={classes.alarmfield}>
              {/* <img src="images/check.svg" alt="" /> */}
              <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', width: '25px', height: '25px'}} />
              <span>I understand that Aurum cannot recover this password.</span>
            </ARUCard>
            {/* <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              disableRipple
            >
              OK
            </Button> */}
            <ARUButton type='submit' margin='0px'>CREATE PASSWORD</ARUButton>
          </form>
        )}
        { step == 2 &&
          <Box className={classes.flexBox}>
              <Alert severity="error" className={classes.important}>
                SAVE YOUR SECRET PHARSES
              </Alert>

              <Box className={classes.copyGroup}>
                <textarea type="text" rows="3" readOnly value={mnemonic}></textarea>
                <Clipboard component="button" button-href="#" data-clipboard-text={mnemonic}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="icon"><path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z"/></svg>
                </Clipboard>
              </Box>

              <Button variant="contained" color="primary" onClick={handleCreateWallet} style={{marginTop: 30}}>Create Wallet</Button>
          </Box>
        }
        {
          step == 3 && 
          <Box>
            <Alert severity="success" className={classes.important}>
              CONGULATELATIONS
            </Alert>
            <Button variant="contained" color="primary" onClick={copyConfirmed} style={{marginTop: 30}}>Done</Button>
          </Box>
        }
      </Box>
    </Layout>
  );
}
