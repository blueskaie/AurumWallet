import React from "react";
import { useHistory } from "react-router-dom";
import { decryptKeyStore } from "../../utils/keystore";
import Header from "../../components/header";
import { networkProvider, currentWallet, allWallets } from "../../store/atoms";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  Box,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import useStyles from "./style";

export default function Signin() {
  const classes = useStyles(useTheme());
  const wallet = useRecoilValue(currentWallet);
  const [, setAllWallets] = useRecoilState(allWallets);
  const provider = useRecoilValue(networkProvider);

  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    if (wallet && wallet.password) {
      history.push("/home");
    }
  }, [wallet]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!wallet || !wallet.keystore) {
      setHelperText("No wallet found");
      setError(true);
    }

    try {
      decryptKeyStore(provider, wallet.keystore, pass);
      setAllWallets((wallets) => {
        const all = [];
        for (let i = 0; i < wallets.length; i++) {
          const wal = wallets[i];
          all.push({ ...wal, password: pass });
        }
        return all;
      });
    } catch (e) {
      console.error(e);
      setHelperText("Unable to unlock valid, please try again");
      setError(true);
    }

    return false;
  };

  return (
    <div className={classes.signin}>
      <Header loggedIn={false} />

      <Box className={classes.root}>
        <div className="auth-logo">
          <img src="images/logo.png" alt="AurumWallet" className="logo-image" />
        </div>

        <h1 className="auth-title">Welcome</h1>
        <p className="auth-subtitle">
          to the <b>AURUM</b> wallet
        </p>
        <div className="message error"></div>
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <FormControl className={classes.fieldPassword} error={error}>
            <TextField
              value={pass}
              onChange={(event) => {
                setPass(event.target.value);
              }}
              className={classes.fieldPassword}
              id="password"
              aria-describedby="password_helper"
              type="password"
              placeholder="Password"
            />
            <FormHelperText style={{marginLeft:30}}>{helperText}</FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.formButton}
            disableRipple
          >
            Sign In
          </Button>
          <p onClick={() => history.push('/create-wallet')} variant="contained" color="default" className={classes.walletbutton} style={{width:'78%'}}>Create New Wallet</p>
          <p onClick={() => history.push('/import-wallet')} variant="contained" color="default" className={classes.walletbutton} style={{width:"100%"}}>Import Wallet from Private Key</p>

        </form>
      </Box>
      <img
        src="images/wave.png"
        className={classes.bottomimg}
        alt="bottom_image"
      />
    </div>
  );
}
