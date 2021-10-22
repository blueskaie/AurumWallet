import React from 'react';

import { Box, Container, Typography, FormControl, TextField, FormHelperText, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { decryptKeyStore } from '../../utils/keystore';
import Layout from "../../components/layout";

import { useRecoilValue } from 'recoil';
import { currentWallet, networkProvider } from '../../store/atoms';

import {Alert} from '@material-ui/lab';
import Clipboard from 'react-clipboard.js';
import { useHistory } from 'react-router-dom';
import { ARUBaseInput } from '../../components/fields';
import ARUButton from '../../components/buttons';
import ARUCard from '../../components/card';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useStyles from "./style";

export default function ExportKey() {
  const classes = useStyles( );

  const [passValid, setPassValid] = React.useState(false);
  const [error, setError] = React.useState();
  const [pass, setPass] = React.useState('');
  const [repass, setRepass] = React.useState('');
  const [helperText, setHelperText] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState('');

  const wallet = useRecoilValue(currentWallet);
  const provider = useRecoilValue(networkProvider);

  const history = useHistory();

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
    
    try {
      const {privateKey} = decryptKeyStore(provider, wallet.keystore, wallet.password)
      setPrivateKey(privateKey);
      setPassValid(true);
      
      return false;
    } catch(e) {
      console.error(e);
      setPassValid(false);
      setHelperText('Unable to decrypt keystore');
      setError(true);
    }
    

    return false;
  }

  const copyConfirmed = (event) => {
    event.preventDefault();
  
    // history.push('/');

    return false;
  }

  return (
    <>
    {
    !passValid && 
      <Layout isShownWallet={false} varient='secondary'>
        <Box className={classes.root}>
          <h1 className={classes.wallettitle}>
            <Box>Reveal</Box>
            <Box>Recovery Phrase</Box>
          </h1>
          <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
            <ARUCard className={classes.card}>
              <Box style={{color: 'red'}}>
                <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: '10px', width: '32px', height: '32px'}} />
              </Box>
              <Box style={{color: 'white', fontSize: '16px', fontWeight: 'normal'}}>
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
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="repassword" value={repass} onChange={e => setRepass(e.target.value)}
                type="password" placeholder="Confirm Password"/>
              <FormHelperText>
                {helperText}
              </FormHelperText>
            </FormControl>
            <ARUButton className={classes.formButton} type='submit'>REVEAL</ARUButton>
          </form>
        </Box>
      </Layout>
    }

    {
    passValid && 
      <Layout isShownBackButton={true} isShownWallet={false} varient='secondary'>
        <Box className={classes.root}>
          <h1 className={classes.wallettitle}>
            <Box>Reveal</Box>
            <Box>Recovery Phrase</Box>
          </h1>
          <Box className={classes.flexBox}>
            <ARUCard className={classes.card}>
              <Box style={{color: 'red'}}>
                <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: '10px', width: '32px', height: '32px'}} />
              </Box>
              <Box style={{color: 'white', fontSize: '16px', fontWeight: 'normal'}}>
                DO NOT SHARE this phrase with anyone! These words can be used to steal funds from ALL OF YOUR ACCOUNTS.
              </Box>
            </ARUCard>
            <ARUButton className={classes.copyButton} mode='trans' onClick={copyConfirmed} type='submit'>COPY TO CLIPBOARD</ARUButton>
            <ARUButton className={classes.formButton} type='submit'>CANCEL</ARUButton>
            {/* <Button variant="contained" color="primary" onClick={copyConfirmed} style={{background: 'white', color: 'black', borderRadius: '15px'}}>I've copied it somewhere safe</Button> */}
          </Box>
        </Box>
      </Layout>
    }
  </>
  )
}