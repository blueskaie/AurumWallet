import React, { useMemo, useState } from 'react'

import Layout from "../../components/layout";
import OneToken from "../../components/onetoken";
import {FormControl, Dialog, FormHelperText, LinearProgress, Button, Box, Snackbar, IconButton, Icon} from '@material-ui/core';
import { ARUBaseInput } from '../../components/fields';
import ARUNumberInput from '../../components/number';
import ARUButton from '../../components/buttons';
import { useRecoilValue, useRecoilState } from 'recoil';
import { networkProvider, currentWallet, currentNetwork, tokenList, allTransactions } from '../../store/atoms'
import { decryptKeyStore } from '../../utils/keystore';
import MuiAlert from '@material-ui/lab/Alert';

import { DEFAULT_TOKEN } from '../../config/tokens';

import { doTransfer } from '../../services/token-utils';
import useStyles from "./style";
import ARUCard from '../../components/card';
import Grid from '@material-ui/core/Grid';
import * as LatomicNumber from '../../utils/big.number';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SendToken(props) {
  const classes = useStyles();
  const { code } = props.match.params;
  const wallet = useRecoilValue( currentWallet );
  const provider = useRecoilValue( networkProvider );
  const network = useRecoilValue( currentNetwork );
  const list = useRecoilValue(tokenList);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [vals, setVals] = useState({address: ''});
  const [helper, setHelper] = useState({address: ''})
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [openGasEditDialog, setOpenGasEditDialog] = React.useState(false);
  const [gasOptions, setGasOptions] = React.useState({limit: 243540, price: '10'});
  const [, setTransactionAtom] = useRecoilState(allTransactions);
  
  const token = useMemo(()=>{
    if (list && code) {
      const t  = list.find(item=>item.code === code);
      return t;
    } else {
      return DEFAULT_TOKEN;
    }
  }, [list, code]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(formSubmitting) {
      return false;
    }
    const {address, amount} = vals;

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
      setStep(2);
    }

    return false;
  }

  const handleSendToken  = async (e) => {
    e.preventDefault();
    const {address, amount} = vals;

    try {
      setFormSubmitting(true)

      const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)

      if(!unlocked) {
        // show message
        return false;
      }

      const result = await doTransfer(network, token, unlocked.privateKey, amount, address);
      const gasPrice = await provider.eth.getGasPrice();

      setFormSubmitting(false);
      if (result.status) {
        setOpenSuccess(true);
        setVals(val => {return {...val, address: '', amount: ''}});

        setTransactionAtom((items) => {
          const all = [...items];
          let timeStamp = (new Date()).getTime() / 1000;
          all.unshift({
            ...result,
            type: 'send',
            token: token,
            gasPrice: gasPrice,
            value: parseFloat(amount) * Math.pow(10, token.decimals),
            timeStamp: timeStamp,
          });
          return all;
        });
      } else {
        setOpenError(true);
      }
    } catch(e) {
      setFormSubmitting(false)
      console.error(e)
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVals(val => { return {...val, address: text}; })
    } catch (e) {
    }
  }

  const onMaxAmount = () => {
    let amount = token?parseFloat(LatomicNumber.toDecimal(token.balance,token.decimals)):0;
    if (token.code === "BNB") {
      amount -= 0.01;
    }
    setVals(val => { return {...val, amount}; })
  }

  const handleGasSubmit = async (e) => {
    e.preventDefault();
    // setCurrentGas(gasOptions);
    // setOpenGasEditDialog(false);
  }

  return (
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false}>
      <Box className={classes.root}>
        <Box className={classes.title}>
          Send {token && token.title}
        </Box>
        {step === 1 && <Box style={{marginTop: 45}}>
          <OneToken {...token}/>
          <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>

            <FormControl  error={errors.address} className={classes.formrow}>
              <ARUBaseInput
                id="address"
                value={vals.address}
                onChange={(e) => setVals(val => { return {...val, address:e.target.value}; })}
                type="text" 
                placeholder="Recipient Address"
                aria-describedby="address_helper"
              />
              <Button className={classes.inputBtn} onClick={pasteFromClipboard}>Paste</Button>
              <FormHelperText id="address_helper">
                {helper.address}
              </FormHelperText>
            </FormControl>

            {/* <FormControl error={errors.token} className={classes.formrow}>
              <React.Suspense fallback={<Box>Loading...</Box>}>
                <TokenMenuItems value={vals.token} setValue={setVals} />
              </React.Suspense>
            </FormControl> */}

            <FormControl error={errors.amount} className={classes.formrow}>
              <ARUBaseInput
                id="amount"
                value={vals.amount}
                onChange={(e) => setVals(val => { return {...val, amount:e.target.value}; })}
                type="number"
                placeholder="Amount"
                aria-describedby="amount_helper"
              />
              <Button className={classes.inputBtn} onClick={onMaxAmount}>MAX</Button>
              <FormHelperText id="amount_helper">
                {helper.amount}
              </FormHelperText>
            </FormControl>

            <Box className={classes.submitWrapper}>
              <ARUButton mode="filled" type="submit" disabled={formSubmitting}>SEND</ARUButton>
            </Box>
          </form>
        </Box>}
        {step === 2 && <Box style={{marginTop: 45}}>
          <ARUCard className={classes.card}>
            <IconButton
              className={classes.settingBtn}
              onClick={()=>setOpenGasEditDialog(true)}
            >
              <Icon className={classes.settingIcon}>
                <img src="images/settings.svg" alt="AurumWallet" style={{height: '100%'}} />
              </Icon>
            </IconButton>
            <Grid container spacing={1} style={{marginBottom: 16}}>
              <Grid item xs={5} className={classes.label}>Amount: </Grid>
              <Grid item xs={7} className={classes.value}>{vals.amount} {token.code}</Grid>
            </Grid>
            <Grid container spacing={1} style={{marginBottom: 16}}>
              <Grid item xs={5} className={classes.label}>From: </Grid>
              <Grid item xs={7} className={classes.value}>{(wallet && wallet.address) ? wallet.address.slice(0,6) + "..." + wallet.address.substr(-4) : ""}</Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={5} className={classes.label}>To: </Grid>
              <Grid item xs={7} className={classes.value}>{vals.address ? vals.address.slice(0,6) + "..." + vals.address.slice(-4) : ""}</Grid>
            </Grid>
          </ARUCard>
          <ARUCard className={classes.card}>
            <Grid container spacing={1} style={{marginBottom: 16}}>
              <Grid item xs={4} className={classes.label}>Network Fee: </Grid>
              <Grid item xs={5} className={classes.value}>0.005622 BNB</Grid>
              <Grid item xs={3} className={classes.value}>~$0.24</Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4} className={classes.label}>Max Total: </Grid>
              <Grid item xs={5} className={classes.value}></Grid>
              <Grid item xs={3} className={classes.value}>$0.24</Grid>
            </Grid>
          </ARUCard>
          <Grid container spacing={1}>
            <Grid item xs={6}><ARUButton variant="contained" mode="filled" style={{width: '100%'}} onClick={handleSendToken}>Confirm</ARUButton></Grid>
            <Grid item xs={6}><ARUButton variant="contained" mode="filled" style={{width: '100%', background: '#1d1d1d', color: '#ffffff'}} onClick={()=>setStep(1)}>Cancel</ARUButton></Grid>
            <Grid item xs={12}>{formSubmitting && <LinearProgress />}</Grid>
          </Grid>
        </Box>}
        <Dialog
          classes={{paper: classes.editGasModal}}
          onClose={()=>setOpenGasEditDialog(false)} 
          aria-labelledby="gas-fee-edit-modal" 
          open={openGasEditDialog}
        >
          <IconButton onClick={()=>setOpenGasEditDialog(false)} style={{padding: 0, position: 'absolute', right: 20, top: 20}}>
            <Icon className={classes.icon}>
              <img src="images/close.svg" alt="AurumWallet" style={{height: '100%'}} />
            </Icon>
          </IconButton>
          <Box style={{fontSize: 14, textAlign: 'center', marginBottom: 15, color: '#ffffff'}}>Edit Gas Fee</Box>
          <Box style={{fontSize: 20, textAlign: 'center', marginBottom: 15, color: '#ffffff'}}>~ 0.0007622 BNB</Box>
          <form method="post" autoComplete="off" onSubmit={handleGasSubmit} className={classes.gasForm}>
   
            <FormControl  error={errors.gasLimit} style={{width: 'calc(100% - 25px)', marginBottom: 8}}>
              <ARUNumberInput
                label="Gas Limit"
                value={gasOptions.limit}
                onChange={(v) => setGasOptions(val => { return {...val, limit:v}; })}
              />
              <FormHelperText id="gas_limit_helper">
                {helper.gas_limit}
              </FormHelperText>
            </FormControl>

            <FormControl error={errors.gasPrice} style={{width: 'calc(100% - 25px)', marginBottom: 8}}>
              <ARUNumberInput
                label="Gas Price"
                value={gasOptions.price}
                onChange={(v) => setGasOptions(val => { return {...val, price:v}; })}
              />
              <FormHelperText id="gas_price_helper">
                {helper.gas_price}
              </FormHelperText>
            </FormControl>

            <div className={classes.submitWrapper}>
              <ARUButton variant="contained" mode="filled" type="submit">SAVE</ARUButton>
            </div>
          </form>
        </Dialog>
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