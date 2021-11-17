import React from 'react';

import { Box, FormControl, FormHelperText, Icon, Snackbar } from '@material-ui/core'
import Layout from "../../components/layout";
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentWallet, allWallets, networkProvider } from '../../store/atoms';

import {Alert} from '@material-ui/lab';
import Clipboard from 'react-clipboard.js';
import { ARUBaseInput } from '../../components/fields';
import ARUButton from '../../components/buttons';
import ARUCard from '../../components/card';
import useStyles from "./style";

export default function ShowPrivatekey() {
  const classes = useStyles( );
  const history = useHistory();

  const [passValid, setPassValid] = React.useState(false);
  const [error, setError] = React.useState();
  const [pass, setPass] = React.useState('');
  const [helperText, setHelperText] = React.useState('');

  const wallet = useRecoilValue(currentWallet);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [privatekey, setPrivatekey] = React.useState('');
  const walletList = useRecoilValue(allWallets);
  const web3 = useRecoilValue(networkProvider);

  const handleSubmit = (event) => {
    event.preventDefault();
    for(let i = 0; i < walletList.length; i++) {
        if (walletList[i].current === true) {
          const account = web3.eth.accounts.decrypt(walletList[i].keystore, walletList[i].password);
          setPrivatekey(account.privateKey);
        }
    }

    if(wallet.password !== pass) {
      setError(true);
      setHelperText('Invalid password');
      setPassValid(false);
      return false;
    }

    setError(false);
    setHelperText('');
    setPassValid(true);    

    return false;
  }

  const cancel = (event) => {
    event.preventDefault();
    if(history.length) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  return (
    <Layout isShownWallet={false} isShownBackButton={true} varient='secondary'>
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Show</Box>
          <Box>Private Key</Box>
        </h1>
        <ARUCard className={classes.card}>
          <Icon className={classes.warningIcon}>
            <img src="images/warning.svg" alt="AurumWallet" className="warning-image" style={{height: '100%'}} />
          </Icon>
          <Box className={classes.warningMessage}>
            This is the private key for: <br/>
            <span style={{fontWeight: 'bold', fontSize: 16}}>{wallet.name ? wallet.name : 'Account '}</span>
            NEVER DISCLOSE your private key as it controls full access to your account.
          </Box>
        </ARUCard>
        {
          !passValid 
          ? <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="password" value={pass} onChange={e => setPass(e.target.value)}
                type="password" placeholder="Password"/>
              <FormHelperText>
                {helperText}
              </FormHelperText>
            </FormControl>
            <ARUButton className={classes.formButton} type='submit'>SHOW PRIVATE KEY</ARUButton>
          </form>
          : <Box className={classes.secretPhraseSection}>
            <ARUCard className={classes.privatekey}>
            {privatekey}
            </ARUCard>
            <Clipboard
              component="button"
              className={classes.clipboardButton}
              button-href="#"
              data-clipboard-text={privatekey}
              onClick={()=>setOpenSuccess(true)}
            >
              COPY TO CLIPBOARD
            </Clipboard>
            <ARUButton className={classes.formButton} onClick={cancel}>CANCEL</ARUButton>
          </Box>
        }
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Private key Copied!
        </Alert>
      </Snackbar>
    </Layout>
  )
}