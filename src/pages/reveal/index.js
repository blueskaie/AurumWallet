import React from 'react';

import { Box, FormControl, FormHelperText, Icon, Snackbar } from '@material-ui/core'
import Layout from "../../components/layout";

import { useRecoilValue } from 'recoil';
import { currentWallet } from '../../store/atoms';

import {Alert} from '@material-ui/lab';
import Clipboard from 'react-clipboard.js';
import { ARUBaseInput } from '../../components/fields';
import ARUButton from '../../components/buttons';
import ARUCard from '../../components/card';
import useStyles from "./style";

export default function Reveal() {
  const classes = useStyles( );

  const [passValid, setPassValid] = React.useState(false);
  const [error, setError] = React.useState();
  const [pass, setPass] = React.useState('');
  const [helperText, setHelperText] = React.useState('');

  const wallet = useRecoilValue(currentWallet);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

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

  return (
    <Layout isShownWallet={false}>
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Reveal</Box>
          <Box>Recovery Phrase</Box>
        </h1>
        {
          !passValid 
          ? <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
            <ARUCard className={classes.card}>
              <Icon className={classes.warningIcon}>
                <img src="images/warning.svg" alt="AurumWallet" className="warning-image" style={{height: '100%'}} />
              </Icon>
              <Box className={classes.warningMessage}>
                DO NOT SHARE this phrase with anyone! These words can be used to steal funds from ALL OF YOUR ACCOUNTS.
              </Box>
            </ARUCard>
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="password" value={pass} onChange={e => setPass(e.target.value)}
                type="password" placeholder="Password"/>
              <FormHelperText>
                {helperText}
              </FormHelperText>
            </FormControl>
            <ARUButton className={classes.formButton} type='submit'>REVEAL</ARUButton>
          </form>
          : <Box className={classes.secretPhraseSection}>
            <ARUCard className={classes.card}>
              <Icon className={classes.warningIcon}>
                <img src="images/warning.svg" alt="AurumWallet" className="warning-image" style={{height: '100%'}} />
              </Icon>
              <Box className={classes.warningMessage}>
                DO NOT SHARE this phrase with anyone! These words can be used to steal funds from ALL OF YOUR ACCOUNTS.
              </Box>
            </ARUCard>
            <Box className={classes.secretPhrase}>
              {wallet.mnemonic}
            </Box>
            <Clipboard
              component="button"
              className={classes.clipboardButton}
              button-href="#"
              data-clipboard-text={wallet.mnemonic}
              onClick={()=>setOpenSuccess(true)}
            >
              COPY TO CLIPBOARD
            </Clipboard>
            <ARUButton className={classes.formButton} type='submit'>CANCEL</ARUButton>
          </Box>
        }
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Secret Phrase Copied!
        </Alert>
      </Snackbar>
    </Layout>
  )
}