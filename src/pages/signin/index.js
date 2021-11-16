import React from "react";
import { useHistory } from "react-router-dom";
import { decryptKeyStore } from "../../utils/keystore";
import Layout from "../../components/layout";
import { networkProvider, currentWallet, allWallets } from "../../store/atoms";
import { ARUBaseInput } from '../../components/fields';
import ARUButton from '../../components/buttons';

import { useRecoilState, useRecoilValue } from "recoil";
import {
  Box,
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
      setHelperText("Invalid password");
      setError(true);
    }

    return false;
  };

  return (
    <Layout isShownHeader={false}>
      <Box className={classes.root}>
        <Box className="auth-logo">
          <img src="images/logo.png" alt="AurumWallet" className="logo-image" />
        </Box>

        <h1 className="auth-title">Welcome</h1>
        <p className="auth-subtitle">
          to the <b>AURUM</b> wallet
        </p>
        <Box className="message error"></Box>
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <FormControl className={classes.formARU} error={error}>
            <ARUBaseInput id="main" value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
          <ARUButton className={classes.formARU} mode="outline" type={'submit'}>SIGN IN</ARUButton>
          <ARUButton className={classes.formARU} mode="outline" onClick={()=>history.push('/setup-wallet')}>WALLET SETUP</ARUButton>
          <ARUButton className={classes.formARU} mode="outline" onClick={()=>history.push('/about-us')}>ABOUT</ARUButton>
        </form>
      </Box>
    </Layout>
  );
}
