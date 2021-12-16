import React,{useEffect} from 'react'
import { getCoingeckoInfoByAddress } from '../../utils/coingeco-utils';
import { getTokenInfoByAddress } from '../../utils/token-utils';
import Layout from "../../components/layout";

import {  Button, Box, FormControl, FormHelperText, Snackbar } from '@material-ui/core'
import { ARUBaseInput } from '../../components/fields';
import MuiAlert from '@material-ui/lab/Alert';

import { useSetRecoilState,useRecoilValue} from 'recoil';
import { allTokens,currentNetwork } from '../../store/atoms';
import useStyles from './style';
import {useHistory} from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddCustomToken() {
  const classes = useStyles( );
  const history = useHistory();

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

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContract(text);
    } catch (e) {
    }
  }
  
  const handleSubmit = async (event) => {
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

    let {id, image} = await getCoingeckoInfoByAddress(main);

    let tokenInfo = {title, code, decimals, coinId: id, image};
    tokenInfo.contract = {
      "1": main,
      "2": test
    };

    setAllTokens((tokens) => {
      const index = tokens.findIndex(token=>token.contract === tokenInfo.contract[network.id]);
      const newTokens = [...tokens];
      if (index > -1) {
        tokenInfo.contract = {...tokens[index].contract, [network.id]: tokenInfo.contract[network.id]};
        newTokens.splice(index, 1, tokenInfo);
      } else {
        newTokens.push(tokenInfo);
      }
      return [...newTokens];
    });

    setOpenSuccess(true);

    history.push('/');
  }

  return (
    <Layout isShownNetworkSelector={false} isShownWallet={false} isShownBackButton={true}>
      <Box className={classes.root}>
        <Box className={classes.title}>
          Add Token
        </Box>
        <Box className={classes.formWrap}>
          <form method="post" onSubmit={handleSubmit} className={classes.form} >

            <FormControl error={helpers.contract} className={classes.formControl}>
              <ARUBaseInput id="main" value={contract} onChange={e => setContract(e.target.value)}
                type="text" placeholder="Token Contract Address"/>
              <Button style={{backgroundColor: '#161616', color: '#ffffff', position: 'absolute', right: 5, top: 2}} onClick={pasteFromClipboard}>Paste</Button>
              <FormHelperText >{helpers.contract}</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
              <ARUBaseInput id="title" value={vals.title}
                type="text" placeholder="Token Name" inputProps={{ readOnly: true, }} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <ARUBaseInput id="code" value={vals.code}
                type="text" placeholder="Token Symbol" inputProps={{ readOnly: true, }} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <ARUBaseInput id="decimals" value={vals.decimals}
                type="text" placeholder="Decimals" inputProps={{ readOnly: true, }} />
            </FormControl>
            <Button variant="contained" type="submit" style={{background: 'white', color: 'black', borderRadius: 6}}>ADD TOKEN</Button>
          </form>
        </Box>

        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success">
            Token added successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  )
}