import React from 'react'

import Layout from "../../components/layout";

import {FormControl, TextField, FormHelperText, LinearProgress, Button, Box, Snackbar} from '@material-ui/core';

import { useRecoilValue } from 'recoil';

import { networkProvider, currentWallet, currentNetwork } from '../../store/atoms'
import { decryptKeyStore } from '../../utils/keystore'

import MuiAlert from '@material-ui/lab/Alert';

import { DEFAULT_TOKEN } from '../../config/tokens';
import TokenMenuItems from '../../components/token-menu-list';

import { doTransfer } from '../../utils/token-utils';
import useStyles from "./style";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Send() {
  const classes = useStyles( );

  const wallet = useRecoilValue( currentWallet );
  const provider = useRecoilValue( networkProvider );

  const network = useRecoilValue( currentNetwork );

  const [errors, setErrors] = React.useState({});
  const [vals, setVals] = React.useState({address: '', token: DEFAULT_TOKEN});
  const [helper, setHelper] = React.useState({address: ''})

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [formSubmitting, setFormSubmitting] = React.useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(formSubmitting) {
      return false;
    }
    const {address, amount, token} = vals;

    let hasErrors = false;
    const er = {};
    const msg = {};
    if(!address) {
      er.address = true;
      msg.address = 'Address is required';
      hasErrors = true;
    } else if(!provider.utils.isAddress(address)) {
      er.address = true;
      msg.address = 'Invalid address';
      hasErrors = true;
    }

    if(!amount) {
      hasErrors = true;
      er.amount = true;
      msg.amount = 'Add amount to send';
    } else {
      const amountRaw = amount * Math.pow(10, token.decimals);
      if(amountRaw > token.balance) {
        hasErrors = true;
        er.amount = true;
        msg.amount = 'Insufficient balance';
      }
    }

    if(hasErrors) {
      setErrors(er)
      setHelper(msg)
    } else {
      try {
        setFormSubmitting(true)

        const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)

        if(!unlocked) {
          // show message
          return false;
        }

        const result = await doTransfer(network, token, unlocked.privateKey, amount, address);

        setFormSubmitting(false);
        if (result.status) {
          setOpenSuccess(true);
          setVals(val => {return {...val, address: '', amount: ''}});
        } else {
          setOpenError(true);
        }
      } catch(e) {
        setFormSubmitting(false)
        console.error(e)
      }
    }

    return false;
  }

  return (
    <Layout isShownWallet={false} isShownNetworkSelector={false}>
      <Box className={classes.root}>
        <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>

          <FormControl  error={errors.address} className={classes.formrow}>
            <TextField id="address" value={vals.address} onChange={(e) =>
              setVals(val => { return {...val, address:e.target.value}; })
            }
              aria-describedby="address_helper" type="text" placeholder="Receipient Address"
              InputProps={{ disableUnderline: true }}/>
            <FormHelperText id="address_helper">
              {helper.address}
            </FormHelperText>
          </FormControl>

          <FormControl error={errors.token} className={classes.formrow}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <TokenMenuItems value={vals.token} setValue={setVals} />
            </React.Suspense>
          </FormControl>

          <FormControl error={errors.amount} className={classes.formrow}>
            <TextField id="amount" value={vals.amount} onChange={(e) =>
              setVals(val => { return {...val, amount:e.target.value}; })
            }
              aria-describedby="amount_helper" type="number" placeholder="Amount"
              InputProps={{ disableUnderline: true }}/>
            <FormHelperText id="amount_helper">
              {helper.amount}
            </FormHelperText>
          </FormControl>

          <div className={classes.submitWrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={formSubmitting} style={{background: 'white', color: 'black', borderRadius: '15px'}}>Send</Button>
            {formSubmitting && <LinearProgress />}
          </div>

        </form>

        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success">
            Payment sent
          </Alert>
        </Snackbar>

        <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
          <Alert onClose={() => setOpenError(false)} severity="error">
            Payment failed
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  )
}