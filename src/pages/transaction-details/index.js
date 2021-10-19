import React from 'react';
import queryString from 'query-string';

import Layout from "../../components/layout";
import {  Box, Icon } from '@material-ui/core'

// import { makeStyles } from '@material-ui/core/styles';
import { currentNetwork, currentWallet, transactionDetails, allTokens } from '../../store/atoms';
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

function ActualDetails({hash, from, to, tokensMap, network}) {
  const classes = useStyles( );

  const wallet = useRecoilValue(currentWallet);
  const di = useRecoilValue(transactionDetails({hash, from, to}));
  const tokenValue = di.contractAddress && tokensMap[di.contractAddress.toUpperCase()] ? tokensMap[di.contractAddress.toUpperCase()] : DEFAULT_TOKEN;

  // const success = di.isError === "0" ? true : false;
  const type = di.contractAddress 
  ? (wallet.address.toUpperCase() === di.from.toUpperCase() ? 'Sent' : 'Received')
  : 'Contract Call';

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
          { precisionFormat(tokenValue.decimals)(di.value, 4) }
          {' '}
          {tokenValue.code}
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Date: </Box>
        <Box className={classes.value}>{ formatOnlyDateFromSeconds(di.timeStamp) }</Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Time: </Box>
        <Box className={classes.value}>{ formatOnlyTimeFromSeconds(di.timeStamp) }</Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Status: </Box>
        {/* <Box className={classes.value}>{ success ? 'Complete' : 'Failure' }</Box> */}
        <Box className={classes.value}>Complete</Box>
      </Box>
      <Box className={classes.row} style={{marginBottom: 0}}>
        <Box className={classes.label}>{ type === 'Received' ? 'From' : 'To' }: </Box>
        <Box className={classes.value}>{ type === 'Received' ? compressAddress(di.from) : compressAddress(di.to) }</Box>
      </Box>
    </ARUCard>
    <ARUCard className={classes.detail}>
      <Box className={classes.row}>
        <Box className={classes.label}>Network Fee: </Box>
        <Box className={classes.label}>{parseFloat(di.gasUsed) * parseFloat(di.gasPrice) / 1000000000000000000} BNB </Box>
        {/* <Box className={classes.label}>~$2.40</Box> */}
      </Box>
      <Box className={classes.row}>
        <Box className={classes.label}>Nonce</Box>
        <Box className={classes.label}>{di.nonce}</Box>
      </Box>
    </ARUCard>
    <ARUButton href={`${network.explore}/tx/${di.hash}`} target="_blank" variant="contained">View on bscscan</ARUButton>
  </>)
}

export default function TransactionDetail({match, location}) {
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
    <Layout isShownBackButton={true} isShownWallet={false} varient="secondary">
      <Box className={classes.root}>
        <Box className={classes.title}>
          Transaction
        </Box>
        <React.Suspense fallback={<Box>Loading...</Box>}>
          <ActualDetails hash={hash} from={from} to={to} tokensMap={all_tokens_map} network={network}/>
        </React.Suspense>
      </Box>
    </Layout>
  )
}