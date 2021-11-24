import React from 'react';
import queryString from 'query-string';

import Layout from "../../components/layout";
import {  Box, Icon } from '@material-ui/core'

// import { makeStyles } from '@material-ui/core/styles';
import { currentNetwork, currentWallet, transactionDetails, allTokens, allTransactions } from '../../store/atoms';
import { useRecoilValue } from 'recoil';

import { DEFAULT_TOKEN } from '../../config/tokens'
// import { Avatar } from '@material-ui/core';
import { precisionFormat, compressAddress, formatOnlyDateFromSeconds, formatOnlyTimeFromSeconds } from '../../utils/format-utils';
// import { Check } from '@material-ui/icons';

// import { FileCopyOutlined } from '@material-ui/icons';

// import Clipboard from 'react-clipboard.js';
import useStyles from './style';
import ARUCard from '../../components/card';
import ARUButton from '../../components/buttons';

function ActualDetailsLocal({hash, from, to, tokensMap, network}) {
  const classes = useStyles( );

  const wallet = useRecoilValue(currentWallet);
  const allTrans = useRecoilValue(allTransactions);
  const get_di = () => {
    for (let i = 0; i < allTrans.length; i++) {
      if (hash === allTrans[i].transactionHash && from === allTrans[i].from && to === allTrans[i].to) {
        return allTrans[i];
      }
    }
    return null;
  }
  const di = get_di();
  const tokenValue = di && di.token ? di.token : DEFAULT_TOKEN;
  const type = di && di.type == 'send' ? 'Sent' : 'Contract Call'; 
  const image = type === 'Sent' ? 'transfer_out.svg' : (type === 'Received' ? 'transfer_in.svg' : 'contract_call.svg');

  return (<>
    <ARUCard className={classes.detail}>
      <Box className={classes.row}>
        <Box className={classes.icon}>
        {
          <Icon className={classes.infoIcon}>
            <img src={`images/${image}`} alt="AurumWallet" className={type} style={{height: '100%'}} />
          </Icon>
        }
        </Box>
        <Box className={classes.amount} style={{color: type === 'Sent' ? 'red' : (type === 'Received' ? 'green' : 'white')}}>
          {type !== 'Contract Call' && (type === 'Sent' ? ' - ' : ' + ')}
          { precisionFormat(tokenValue.decimals)(di && di.value ? di.value : 0, 4) }
          {' '}
          {tokenValue.code}
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Date: </Box>
        <Box className={classes.value}>{ di && di.timeStamp && formatOnlyDateFromSeconds(di.timeStamp) }</Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Time: </Box>
        <Box className={classes.value}>{ di && di.timeStamp && formatOnlyTimeFromSeconds(di.timeStamp) }</Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Status: </Box>
        <Box className={classes.value}>Complete</Box>
      </Box>
      <Box className={classes.row} style={{marginBottom: 0}}>
        <Box className={classes.label}> To: </Box>
        <Box className={classes.value}>{ di && di.to && compressAddress(di.to) }</Box>
      </Box>
    </ARUCard>
    <ARUCard className={classes.detail}>
      <Box className={classes.row}>
        <Box className={classes.label}>Network Fee: </Box>
        <Box className={classes.label}>{di && di.gasUsed && di.gasPrice ? parseFloat(di.gasUsed) * parseFloat(di.gasPrice) / 1000000000000000000 : 0} {tokenValue && tokenValue.code} </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Nonce</Box>
        <Box className={classes.label}>{di && di.nonce}</Box>
      </Box>
    </ARUCard>
    <ARUButton target="_blank" variant="contained" mode="filled" onClick={()=>window.open(`${network.explore}/tx/${hash}`)}>View on bscscan</ARUButton>
  </>)
}

export default function TransactionDetailLocal({match, location}) {
  const classes = useStyles( );
  const {hash} = match.params;
  const queries = queryString.parse(location.search);
  const {from, to} = queries;

  const network = useRecoilValue(currentNetwork);
  
  const allTokensData = useRecoilValue(allTokens);

  const all_tokens_map = React.useMemo(() => {
    let mp = {};
    allTokensData.forEach((item) => {
      let {contract} = item;
      if(contract && contract[network.id]) {
        mp[contract[network.id].toUpperCase()] = item;
      }
    });
    return mp;
  }, [network, allTokensData])

  return (
    <Layout isShownBackButton={true} isShownWallet={false}>
      <Box className={classes.root}>
        <Box className={classes.title}>
          Transaction
        </Box>
        <React.Suspense fallback={<Box>Loading...</Box>}>
          <ActualDetailsLocal hash={hash} from={from} to={to} tokensMap={all_tokens_map} network={network}/>
        </React.Suspense>
      </Box>
    </Layout>
  )
}