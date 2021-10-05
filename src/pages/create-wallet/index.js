import React from 'react'

import { useHistory } from 'react-router-dom'

import {Button, Box, TextField, FormControl, FormHelperText} from '@material-ui/core';
import {Alert} from '@material-ui/lab'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';

import Clipboard from 'react-clipboard.js';
import { encryptKeyStore } from '../../utils/keystore';
import { allWallets, currentWallet, networkProvider,allTokens } from '../../store/atoms';
import ALL_TOKENS from '../../config/tokens';

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
    setWallet(provider.eth.accounts.create());
    setCurrentTokens(ALL_TOKENS);
  };
  
  const handleBackClick = () => {
    if(history.length) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  return (
    <>
      <div className={classes.root}>
        <img className={classes.logoImage} src="images/logo.png" alt="AurumWallet" onClick={handleBackClick}/>
        <h1 className={classes.wallettitle}>
          Create <br /> Wallet
        </h1>
        {!wallet && (
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
              />
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              disableRipple
            >
              OK
            </Button>
          </form>
        )}
        { wallet &&
          <Box className={classes.flexBox}>
            <Alert severity="error" className={classes.important}>
              SAVE YOUR PRIVATE KEY
            </Alert>

            <div className={classes.copyGroup}>
              <textarea type="text" rows="3" readOnly value={wallet.privateKey}></textarea>
              <Clipboard component="button" button-href="#" data-clipboard-text={wallet.privateKey}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="icon"><path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z"/></svg>
              </Clipboard>
            </div>

            <div className={classes.keyInfo}>
              <p><strong>Do not lose it!</strong> It can't be recovered if you lose it.</p>
              <p><strong>Do not share it!</strong> Your funds will be stolen if you use it on a malicious site.</p>
              <p><strong>Make a backup!</strong> Just in case your laptop is set on fire.</p>
            </div>
            <Button variant="contained" color="primary" onClick={copyConfirmed}>I've copied it somewhere safe</Button>
          </Box>
        }
        <div className={classes.footer}>
          <p className={classes.terms}>Terms of service</p>
        </div>
        <img src="images/wave.png" className={classes.bottomimg} />
      </div>
    </>
  );
}
