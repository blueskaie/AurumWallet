import React,{useEffect} from 'react'
import { getTokenInfoByAddress } from '../../utils/token-utils';
import BackButtonHeader from '../../components/back-button-header'
import {  Button, Container, TextField, FormControl, FormHelperText, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

import { useSetRecoilState,useRecoilValue} from 'recoil';
import { allTokens,currentNetwork } from '../../store/atoms';
import useStyles from './style';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddCustomToken() {
  const classes = useStyles( );

  const network = useRecoilValue( currentNetwork );
  const [contract, setContract] = React.useState('');
  const [vals, setVals] = React.useState({title: '', code: '', decimals: '', main: '', test: ''});
  const [helpers, setHelpers] = React.useState({contract:''});
  const [error, setError] = React.useState({contract:false});

  const setAllTokens = useSetRecoilState(allTokens);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  useEffect(()=>{
    const getTokenInfo = async ()=>{

      const tokenInfo = await getTokenInfoByAddress(network,contract)
      let main='',test='';
      if(tokenInfo)
      {
        if(network.id == 1)
          main = contract
        else
          test = contract
        setVals({...vals,...{title: tokenInfo.name,decimals:tokenInfo.decimals,code:tokenInfo.symbol,main,test}})
      }
    }
    getTokenInfo();
  },[contract])

  const handleSubmit = (event) => {
    event.preventDefault();

    const {main, test, title, code, decimals} = vals;
    if(!main && !test) {
      setHelpers(hs => {
        return {...hs,
          contract:'Contract address is incorrect'
        }
      });

      setError(hs => {
        return {...hs, contract:false}
      });
      return;
    }

    let tokenInfo = {title, code, decimals};
    tokenInfo.contract = {
      "1": main,
      "2": test
    };

    setAllTokens((tokens) => {
      return [...tokens, tokenInfo];
    });

    setOpenSuccess(true);

  }

  return (
    <>
      <div className={classes.header}>
      <BackButtonHeader title="Add Token" />

      </div>
      <Container className={classes.root}>
        <div className={classes.formWrap}>
          <form method="post" onSubmit={handleSubmit} className={classes.form} >

            <FormControl error={helpers.contract} className={classes.formControl}>
              <TextField id="main" value={contract} onChange={e => setContract(e.target.value)}
                type="text" label="Token Contract Address" className={classes.textfield}/>
              <FormHelperText >{helpers.contract}</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField id="title" value={vals.title}
                type="text" label="Token Name"  inputProps={{ readOnly: true, }} className={classes.textfield}/>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField id="code" value={vals.code}
                type="text" label="Token Symbol" inputProps={{ readOnly: true, }} className={classes.textfield}/>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField id="decimals" value={vals.decimals}   type="text" label="Decimals"
                inputProps={{ readOnly: true, }} className={classes.textfield}/>
            </FormControl>

            {/* <FormControl error={error.main} className={classes.formControl}>
              <TextField id="main" value={vals.main} onChange={e => setVals((vals) => { return {...vals, main:e.target.value}})}
              type="text" label="Contract Mainnet address" className={classes.textfield}/>
              <FormHelperText>{helpers.main}</FormHelperText>
            </FormControl> */}

            {/* <FormControl error={error.test} className={classes.formControl}>
              <TextField id="test" value={vals.test} onChange={e => setVals((vals) => { return {...vals, test:e.target.value}})}
              type="text" label="Contract Testnet address" className={classes.textfield}/>
              <FormHelperText>{helpers.test}</FormHelperText>
            </FormControl> */}

            <Button variant="contained" color="primary" type="submit">Save</Button>
          </form>
        </div>

        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success">
            Token added successfully!
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}