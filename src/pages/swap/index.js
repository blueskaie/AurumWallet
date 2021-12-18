import React, {useState, useEffect, useMemo} from "react";

import { faCaretDown, faCaretUp, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useRecoilState } from 'recoil';

import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Switch, FormControl, FormHelperText, LinearProgress, Dialog, CircularProgress, Snackbar, Slider } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './style';

import Layout from "../../components/layout";
import TokenSelect from './token-select';

import * as LatomicNumber from '../../utils/big.number'
import { decryptKeyStore } from '../../utils/keystore'
import { getAmountsOut, getAmountsIn, getGasInfo, doSwap } from '../../utils/swap-utils';
import { approve } from '../../utils/token-utils';

import { networkProvider, refreshCalled, currentWallet, currentNetwork, currentGasOptions, currentSlippageTolerance, allTransactions  } from '../../store/atoms'

import { DEFAULT_TOKEN } from "../../config/tokens";
import {tokenLogos} from "../../config/token-info";
import Jazzicon from 'react-jazzicon';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  mark: {
    width: 1,
    height: 10,
    marginTop: -4,
    backgroundColor: '#ffffff'
  },
  markLabel: {
    color: "#ffffff",
    fontSize: 12
  },
  thumb: {
    background: 'white',
    width: 28,
    height: 12,
    borderRadius: 6,
    marginLeft: -15,
    marginTop: -5,
    "&.Mui-disabled": {
      width: 28,
      height: 12,
      marginLeft: -15,
      marginTop: -5
    }
  },
  rail: {
    background: '#aaaaaa',
    height: 1
  },
  track: {
    background: '#ffffff',
    height: 1
  },
})(Slider);

const Swap = () => {
  const classes = useStyles();
  const network = useRecoilValue( currentNetwork );
  const provider = useRecoilValue( networkProvider );
  const wallet = useRecoilValue(currentWallet);
  const shortWalletAddress = wallet.address.slice(0, 5) + "..." + wallet.address.substr(-4);

  const [currentGas, setCurrentGas] = useRecoilState(currentGasOptions);
  const [slippageTolerance, setSlippageTolerance] = useRecoilState(currentSlippageTolerance);

  const [fromSelect, setFromSelect] = useState(false);
  const [toSelect, setToSelect] = useState(false);
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [swapAmount, setSwapAmount] = useState(0);
  const [expectedAmount, setExpectedAmount] = useState(0);

  const [swapRouter, setSwapRouter] = React.useState('pancakeswap');
  // if true, it means exact input to output, if false, it means input to exact output 
  const [swapDirection, setSwapDirection] = React.useState(true);   
  const [gasOptions, setGasOptions] = React.useState(currentGas);
  const [formSubmitting, setFormSubmitting] = React.useState(false);
  const [isSwapping, setSwapping] = React.useState(false);
  const [helper, setHelper] = React.useState({})
  const [errors, setErrors] = React.useState({});
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openSwapConfirmDialog, setOpenSwapConfirmDialog] = React.useState(false);
  const [openGasEditDialog, setOpenGasEditDialog] = React.useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);
  const [, setTransactionAtom] = useRecoilState(allTransactions);
  const [refresh, setRefresh] = useRecoilState(refreshCalled);

  const availableSlipageToleranceArray = [
    {value: 0.1, label: '0.1%'},
    {value: 0.5, label: '0.5%'},
    {value: 1, label: '1%'},
    {value: 1.5, label: '1.5%'}
  ];

  const onFromChange = async (token) => {
    setFromSelect(false);
    setFromToken(token);
    setSwapAmount(0);
  }

  const onToChange = (token) => {
    setToSelect(false);
    setToToken(token);
  }

  const onSwapAmount = (e) => {
    setSwapDirection(true);
    setSwapAmount(parseFloat(e.target.value));
  }

  const onExpectedAmount = (e) => {
    setSwapDirection(false);
    setExpectedAmount(parseFloat(e.target.value));
  }

  const approveToken = async () => {
    try {
      setFormSubmitting(true);
      const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)
      const result = await approve(network, swapRouter, fromToken, unlocked.privateKey);
      const gasPrice = await provider.eth.getGasPrice();
      if (result.status) {
        setFormSubmitting(false);
        setOpenSuccess(true);
        setTransactionAtom((items) => {
          const all = [...items];
          let timeStamp = (new Date()).getTime() / 1000;
          all.unshift({
            ...result,
            type: 'approve',
            gasPrice: gasPrice,
            timeStamp: timeStamp,
          })
          return all;
        });
        setRefresh(refresh + 1);
      }
    } catch (error) {
      setFormSubmitting(false);
      setOpenError(true);
    }
  }

  const handleSwapConfirmSubmit = async (e) => {
    e.preventDefault();
    setSwapping(true);
    const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)
    try {
      const result = await doSwap(network, swapRouter, fromToken, toToken, swapAmount, expectedAmount, swapDirection, unlocked.privateKey, gasOptions);
      const gasPrice = await provider.eth.getGasPrice();
      if (result.status) {
        setSwapping(false);
        setOpenSwapConfirmDialog(false);
        setOpenSuccess(true);

        setTransactionAtom((items) => {
          const all = [...items];
          let timeStamp = (new Date()).getTime() / 1000;
          all.unshift({
            ...result,
            type: 'swap',
            gasPrice: gasPrice,
            timeStamp: timeStamp,
          })
          return all;
        });
        setRefresh(refresh + 1);
      }
    } catch (e) {
      console.log('herererere===>', e);
      setSwapping(false);
      setOpenSwapConfirmDialog(false);
      setOpenError(true);
    }
  }

  const handleGasSubmit = async (e) => {
    e.preventDefault();
    setCurrentGas(gasOptions);
    setOpenGasEditDialog(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitting) return false;
    let hasErrors = false;

    const er = {};
    const msg = {};
    if(!fromToken) {
      er.fromToken = true;
      msg.fromToken = 'Select the proper token';
      hasErrors = true;
    } else if (swapAmount <= 0) {
      er.fromToken = true;
      msg.fromToken = 'Amount must be greater than 0';
      hasErrors = true;
    }

    if (!toToken) {
      er.toToken = true;
      msg.toToken = 'Select the proper token';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(er)
      setHelper(msg)
    } else {
      try {
        setOpenSwapConfirmDialog(true);
      } catch (e) {
        setOpenError(true);
      }
    }
  }

  // const onMaxAmount = () => {
  //   if (fromToken) {
  //     let swapAmount = fromToken?parseFloat(LatomicNumber.toDecimal(fromToken.balance,fromToken.decimals)):0;
  //     if (fromToken.code === "BNB") {
  //       setSwapAmount(swapAmount>0.01 ? (swapAmount-0.01) : 0);
  //     } else {
  //       setSwapAmount(swapAmount);
  //     }
  //   }
  // };

  const filpToken = (e) => {
    e.preventDefault();
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setSwapDirection(true);
    setSwapAmount(parseFloat(expectedAmount));
  }

  const isAllowed = useMemo(()=>{
    return !fromToken || fromToken.code === DEFAULT_TOKEN.code || LatomicNumber.toDecimal(fromToken.allowance,fromToken.decimals) > 0
  }, [fromToken])

  const minimumReceivedAmount = useMemo(()=>{
    if (slippageTolerance && slippageTolerance.allowedSlippage > 0 && expectedAmount>0) {
      return (100-slippageTolerance.allowedSlippage)/100 * expectedAmount;
    } else {
      return 0;
    }
  }, [slippageTolerance, expectedAmount]);

  const liquidityProviderFee = useMemo(()=>{
    const percent = swapRouter == 'pancakeswap' ? 0.25 : 0.2;
    return swapAmount * percent / 100;
  }, [swapRouter, swapAmount]);

  useEffect(async () => {
    let predictedAmount = 0;
    const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)
      
    if (swapDirection) {
      if (swapRouter && fromToken && toToken && swapAmount > 0) {
        const res = await getAmountsOut(network, swapRouter, fromToken, toToken, swapAmount, unlocked.privateKey)
        if (res && res.length > 0) {
          predictedAmount = LatomicNumber.toDecimal(res[res.length - 1], toToken.decimals);
          predictedAmount = parseFloat(predictedAmount).toFixed(6);
        }  
        setExpectedAmount(predictedAmount);
      }
    } else {
      if (swapRouter && fromToken && toToken && expectedAmount > 0) {
        const res = await getAmountsIn(network, swapRouter, fromToken, toToken, expectedAmount, unlocked.privateKey)
        if (res && res.length > 0) {
          predictedAmount = LatomicNumber.toDecimal(res[0], fromToken.decimals);
          predictedAmount = parseFloat(predictedAmount).toFixed(6);
        }  
        setSwapAmount(parseFloat(predictedAmount));
      }
    }
  }, [fromToken, toToken, swapAmount, expectedAmount, swapRouter, swapDirection]);

  useEffect(async () => {
    const isAllowed = !fromToken || fromToken.code === DEFAULT_TOKEN.code || LatomicNumber.toDecimal(fromToken.allowance,fromToken.decimals) > 0;
    if (isAllowed && fromToken && toToken && swapAmount && expectedAmount) {
      setErrors({});
      setHelper({});
      const unlocked = decryptKeyStore(provider, wallet.keystore, wallet.password)
      let result = await getGasInfo(network, swapRouter, fromToken, toToken, swapAmount, expectedAmount, swapDirection, unlocked.privateKey);
      result = {
        ...result,
        price: LatomicNumber.toDecimal(result.price, 9)
      }
      setCurrentGas(result);
    }

  }, [fromToken, toToken, swapAmount, expectedAmount, swapDirection]);

  useEffect(() => {
    setGasOptions(currentGas);
  }, [currentGas]);

  return (
    <Layout isShownWallet={false}>
        <Box className={classes.root}>
          <Box className={classes.swaptitle}>
            Swap Tokens
          </Box>
          {/* main_Box */}
          <Box className={classes.swapcontent}>
            <form method="post" autoComplete="off" onSubmit={handleSubmit}>
              <Box className={classes.swaptoken}>
                <Box className={classes.swapOptions} style={{paddingRight: '7px'}}>
                  <select className={classes.swapRouter} onChange={(e)=>setSwapRouter(e.target.value)} value={swapRouter}>
                    <option value="pancakeswap">Pancakeswap</option>
                    <option value="apeswap">Apeswap</option>
                  </select>
                  <Box className={classes.setting} onClick={()=>setOpenSettingsDialog(true)}>
                    <FontAwesomeIcon icon={faCog} style={{width: 15, height: 15, color:'white'}}/>
                  </Box>
                </Box>
                <Box >
                  <FormControl error={errors.fromToken} style={{width: '100%'}}>
                    {!fromSelect && <Box className={classes.swapform}>
                      <Box className={classes.fromtokeninfoleft}>
                        <Box>From</Box>
                        <Box><input type="number" className={classes.fromtokenamount} placeholder="0.0" value={swapAmount} onChange={onSwapAmount}/></Box>
                      </Box>
                      <Box className={classes.amountSection}>
                        <Box className={classes.balanceAmount}>Balance: {fromToken ? parseFloat(LatomicNumber.toDecimal(fromToken.balance, fromToken.decimals)).toFixed(6) : ''}</Box>
                        <Box className={classes.fromtokeninfo} onClick={()=>{setFromSelect(true); setToSelect(false);}}>
                          <Box className={classes.tokenImg}>
                            { fromToken 
                            ? fromToken.image
                              ? <img src={fromToken.image.large} alt={fromToken.code} width={20} style={{borderRadius: '50%'}} />
                              : (fromToken && tokenLogos[fromToken.code.toUpperCase()] 
                                  ? <img src={tokenLogos[fromToken.code.toUpperCase()]} alt={fromToken.code} width={20} style={{borderRadius: '50%'}} />
                                  : <Jazzicon diameter={20} seed={fromToken.contract[network.id]} />)
                            : <Box style={{width: 20, height: 20}}></Box>
                            }
                          </Box>
                          <Box style={{color:'white', marginLeft: '5px'}}>{fromToken?fromToken.code:'From'}</Box>
                          <FontAwesomeIcon icon={faCaretDown} style={{color:'white', marginLeft: '5px'}}/>
                        </Box>
                      </Box>
                    </Box>}
                    <TokenSelect onChange={onFromChange} isShown={fromSelect} exceptToken={toToken}/>
                    <FormHelperText id="address_helper">
                      {helper.fromToken}
                    </FormHelperText>
                  </FormControl>
                  <Box className={classes.filpButton} onClick={filpToken}>
                    <FontAwesomeIcon icon={faCaretDown} style={{color:'white', marginLeft: '5px'}}/>
                    <FontAwesomeIcon icon={faCaretUp} style={{color:'white', marginLeft: '5px'}}/>
                  </Box>
                  <FormControl error={errors.toToken} style={{width: '100%'}}>
                    {!toSelect && <Box className={classes.swapform}>
                      <Box className={classes.fromtokeninfoleft}>
                        <Box>To</Box>
                        <Box><input type="number" className={classes.fromtokenamount} placeholder="0.0" value={expectedAmount} onChange={onExpectedAmount}/></Box>
                      </Box>
                      <Box className={classes.amountSection}>
                        <Box className={classes.balanceAmount}>Balance: {toToken?parseFloat(LatomicNumber.toDecimal(toToken.balance,toToken.decimals)).toFixed(6) : ''}</Box>
                        <Box className={classes.fromtokeninfo} onClick={()=>{setToSelect(true); setFromSelect(false);}}>
                          <Box className={classes.tokenImg}>
                            { toToken 
                            ? toToken.image
                              ? <img src={toToken.image.large} alt={toToken.code} width={20} style={{borderRadius: '50%'}} />
                              : (toToken && tokenLogos[toToken.code.toUpperCase()] 
                                  ? <img src={tokenLogos[toToken.code.toUpperCase()]} alt={toToken.code} width={20} style={{borderRadius: '50%'}} />
                                  : <Jazzicon diameter={20} seed={toToken.contract[network.id]} />)
                            : <Box style={{width: 20, height: 20}}></Box>
                            }
                          </Box>
                          <Box style={{color:'white', marginLeft: '5px'}}>{toToken?toToken.code:'To'}</Box>
                          <FontAwesomeIcon icon={faCaretDown} style={{color:'white', marginLeft: '5px'}}/>
                        </Box>
                      </Box>
                    </Box>}
                    <TokenSelect onChange={onToChange} isShown={toSelect} exceptToken={fromToken}/>
                    <FormHelperText id="address_helper">
                      {helper.toToken}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box style={{marginTop: 10, marginBottom: 10, textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} id='real_slider' className={classes.Boxslider}>
                  <Box style={{color: 'white', marginRight: '20px'}}>0%</Box>
                  <IOSSlider
                    aria-labelledby="input-slider"
                    step={25}
                    valueLabelDisplay="off"
                    marks
                    min={0}
                    max={100}
                    color='secondary'
                    onChange={(e, value)=>{
                      let swval = fromToken ? parseFloat(LatomicNumber.toDecimal(fromToken.balance, fromToken.decimals)) * value / 100 : 0
                      swval = parseFloat(swval.toFixed(6));
                      setSwapDirection(true);
                      setSwapAmount(swval);
                    }}
                  />
                  <Box style={{color: 'white', marginLeft: '20px'}}>100%</Box>
                </Box>
                <Box className={classes.submitWrapper}>
                  {!isAllowed && <Button variant="contained" color="secondary" style={{background: 'white', color: 'black', borderRadius: '6px'}} disabled={formSubmitting} onClick={approveToken}>Approve</Button> }
                  {isAllowed && <Button variant="contained" color="secondary" style={{background: 'white', color: 'black', borderRadius: '6px'}} disabled={formSubmitting} type="submit">Swap</Button> }
                  {formSubmitting && <LinearProgress />}
                </Box>
              </Box>
            </form>
              
            <Box className={classes.swapinfo}>
                <Box className={classes.swapsubinfo}>
                  <p>Minimum received</p>
                  {/* <p>Price Impact</p> */}
                  <p>Liquidity provider fee</p>
                </Box>
                <Box className={classes.swapsubinfo}>
                  <p style={{color: toToken ? '#00d70a' : '#ffffff'}}>{toToken ? `${minimumReceivedAmount.toFixed(4)} ${toToken.code}` : 0}</p>
                  {/* <p style={{color: '#00d70a'}}>{'<0.01%'}</p> */}
                  <p style={{color: fromToken ? '#00d70a' : '#ffffff'}}>{fromToken ? `${liquidityProviderFee.toFixed(4)} ${fromToken.code}` : 0}</p>
                </Box>
            </Box>
          </Box>
                  
          <Dialog
            classes={{paper: classes.comfirmModal}}
            onClose={()=>setOpenSwapConfirmDialog(false)} 
            aria-labelledby="gas-fee-edit-modal" 
            open={openSwapConfirmDialog}
          >
            <form method="post" autoComplete="off" onSubmit={handleSwapConfirmSubmit} className={classes.gasForm}>
              <Box className={classes.swapAmount}>{parseFloat(swapAmount.toFixed(4))} {fromToken ? fromToken.code : ''}</Box>
              <Box className={classes.accountInfo}>
                <Jazzicon diameter={32} seed={fromToken && fromToken.contract[network.id]} />
                <Box style={{marginLeft: 10, textAlign: 'left'}}>
                  <Box style={{fontSize: 14, fontWeight: 500}}>Account ({shortWalletAddress})</Box>
                  <Box style={{marginTop: 5}}>Balance: {fromToken ? parseFloat(LatomicNumber.toDecimal(fromToken.balance, fromToken.decimals)).toFixed(5) : ''} {fromToken && fromToken.code}</Box>
                </Box>
              </Box>
              <Box className={classes.amountInfo}>
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Box> Estimated gas fee</Box>
                  <Box>{parseFloat(gasOptions.limit) * parseFloat(gasOptions.price) / 1000000000} BNB</Box>
                </Box>
                <hr/>
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Box> Total</Box>
                  {fromToken && <Box>
                    {fromToken.code == 'BNB'
                    ? `${(parseFloat(swapAmount)+parseFloat(gasOptions.limit) * parseFloat(gasOptions.price) / 1000000000).toFixed(4)} BNB`
                    : `${parseFloat(swapAmount).toFixed(4)} ${fromToken.code} + ${(parseFloat(gasOptions.limit) * parseFloat(gasOptions.price) / 1000000000).toFixed(4)} BNB`}
                  </Box>}
                </Box>
              </Box>
              <Box onClick={()=>setOpenGasEditDialog(true)} style={{margin: 10, textAlign: 'right', cursor: 'pointer'}}> Edit Gas </Box>

              <Box className={classes.submitWrapper}>
                <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button variant="contained" color="primary" style={{width: '48%'}} onClick={()=>setOpenSwapConfirmDialog(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" style={{width: '48%'}} type="submit" disabled={isSwapping}>Confirm {isSwapping && <CircularProgress size={15} style={{color: 'white', marginLeft: 10}}/>}</Button>
                </Box>
              </Box>

            </form>
          </Dialog>
          <Dialog
            classes={{paper: classes.editGasModal}}
            onClose={()=>setOpenGasEditDialog(false)} 
            aria-labelledby="gas-fee-edit-modal" 
            open={openGasEditDialog}
          >
            <form method="post" autoComplete="off" onSubmit={handleGasSubmit} className={classes.gasForm}>

              <FormControl  error={errors.gasLimit} className={classes.formrow}>
                <label className={classes.label}>Gas Limit</label>
                <input 
                  className={classes.textField}
                  value={gasOptions.limit} 
                  onChange={(e) => setGasOptions(val => { return {...val, limit:e.target.value}; })}
                  type="number" placeholder="Gas Limit"
                />
                <FormHelperText id="gas_limit_helper">
                  {helper.gas_limit}
                </FormHelperText>
              </FormControl>

              <FormControl error={errors.gasPrice} className={classes.formrow}>
                <label className={classes.label}>Gas Price</label>
                <input
                  className={classes.textField}
                  value={gasOptions.price}
                  onChange={(e) => setGasOptions(val => { return {...val, price:e.target.value}; })}   
                  type="number" placeholder="Gas Price (GWEI)"           
                />
                <FormHelperText id="gas_price_helper">
                  {helper.gas_price}
                </FormHelperText>
              </FormControl>

              <Box className={classes.submitWrapper}>
                <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button variant="contained" color="primary" style={{width: '48%'}} onClick={()=>setOpenGasEditDialog(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" style={{width: '48%'}} type="submit">Save</Button>
                </Box>
              </Box>

            </form>
          </Dialog>
          <Dialog
            classes={{paper: classes.settingsModal}}
            onClose={()=>setOpenSettingsDialog(false)} 
            aria-labelledby="settings-modal" 
            open={openSettingsDialog}
          >
            <form method="post" autoComplete="off" className={classes.settingForm}>
              <label className={classes.label}>Slippage tolerance</label>
              <Box style={{textAlign: 'center'}} id='dlg_slider'>
                <IOSSlider
                  value={slippageTolerance.allowedSlippage}
                  onChange={(e, value)=>setSlippageTolerance({
                    ...slippageTolerance,
                    allowedSlippage: parseFloat(value)
                  })}
                  aria-labelledby="input-slider"
                  step={null}
                  valueLabelDisplay="off"
                  marks={availableSlipageToleranceArray}
                  min={0.1}
                  max={1.5}
                  disabled={slippageTolerance.auto}
                />
                <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <input
                    className={classes.slippageInput}
                    type="number"
                    value={slippageTolerance.allowedSlippage}
                    onChange={(e)=>setSlippageTolerance({
                      ...slippageTolerance,
                      allowedSlippage: parseFloat(e.target.value)
                    })}
                    disabled={slippageTolerance.auto}
                  />
                  <Switch
                    label="Auto"
                    checked={slippageTolerance.auto}
                    onChange={(e)=>setSlippageTolerance({
                      ...slippageTolerance,
                      auto: e.target.checked
                    })}
                  />
                  <span style={{color: 'white'}}>Auto</span>
                </Box>
              </Box>
            </form>
          </Dialog>
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
            <Alert onClose={() => setOpenSuccess(false)} severity="success">
              Success
            </Alert>
          </Snackbar>

          <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
            <Alert onClose={() => setOpenError(false)} severity="error">
              Failed
            </Alert>
          </Snackbar>
        </Box>
    </Layout>
  );
};

export default Swap;
