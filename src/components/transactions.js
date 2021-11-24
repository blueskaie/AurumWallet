import React from 'react';

import { currentNetwork, currentWallet, networkTransactions, allTokens, allTransactions } from '../store/atoms'
import { useRecoilValue } from 'recoil';

import {ButtonBase, Box, Icon} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_TOKEN } from '../config/tokens'
import { precisionFormat, formatDateFromSeconds, compressAddress} from '../utils/format-utils';
import ARUCard from './card';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    padding: 12,
    marginTop: 10
  },
  list: {
    overflowY: 'auto',
    /* width */
    "&::-webkit-scrollbar": {
      width: 10
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      boxShadow: 'inset 0 0 5px gray',
      borderRadius: 6
    },
    
    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: '#ffffff',
      borderRadius: 6
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover" : {
      background: '#bbbbbb' 
    }
  },
  listItem: {
    width:'100%',
    height:'100%',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottom: '1px solid #555',
    display:'flex'
  },
  icon: {
    justifyContent: 'center',
    fontWeight: 'bold',
    width: 28,
  },
  contentArea: {
    width:'calc(100% - 28px)',
    paddingLeft: 15,
    paddingRight: 15
  },
  label: {
    fontSize: '1rem',
    textAlign: 'left',
    width: '40%',
    color: '#fff'
  },
  amount: {
    fontSize: '1rem',
    textAlign: 'right',
    paddingLeft: 15,
    width: '60%'
  },
  extra: {
    width: 'calc(100% - 28px)',
    fontSize: '.75rem',
    textAlign: 'left',
    marginTop: '.3rem',
    color: '#999'
  },
  infoIcon: {
    width: 28,
    height: 28,
  }
}));


export function AllTransactions({token, height}) {

  const classes = useStyles( );

  const wallet = useRecoilValue(currentWallet);
  const network = useRecoilValue(currentNetwork);
  const transactions = useRecoilValue(networkTransactions(0));
  const allTrans = useRecoilValue(allTransactions);

  const allTokensData = useRecoilValue(allTokens);

  const history = useHistory();

  const ALL_TOKENS_MAP = React.useMemo(() => {
    let mp = {};
    allTokensData.forEach((item) => {
      let {contract} = item;
      if(contract && contract[network.id]) {
        mp[contract[network.id].toUpperCase()] = item;
      }
    });
    return mp;
  }, [network, allTokensData])

  const renderRow = (props) => {
    const { di, index, style } = props;

    const tokenValue = di.contractAddress && ALL_TOKENS_MAP[di.contractAddress.toUpperCase()] ? ALL_TOKENS_MAP[di.contractAddress.toUpperCase()] : DEFAULT_TOKEN;
    const type = di.contractAddress 
      ? (wallet.address.toUpperCase() === di.from.toUpperCase() ? 'Sent' : 'Received')
      : 'Contract Call';

    const image = type === 'Sent' ? 'transfer_out.svg' : (type === 'Received' ? 'transfer_in.svg' : 'contract_call.svg');

    return (
        <Box style={style} key={index} >
          <ButtonBase className={classes.listItem} onClick={()=>history.push(`/transaction/${di.hash}?from=${di.from}&to=${di.to}`)}>
            <Box className={classes.icon}>
              <Icon className={classes.infoIcon}>
                  <img src={`images/${image}`} alt="AurumWallet" className={type} style={{height: '100%'}} />
              </Icon>
            </Box>
            <Box className={classes.contentArea}>
              <Box style={{display: 'flex'}}>
                <Box className={classes.label}>{type}</Box>
                <Box className={classes.amount} style={{color: type === 'Sent' ? 'red' : (type === 'Received' ? 'green' : 'white')}}>
                  {type !== 'Contract Call' && (type === 'Sent' ? ' - ' : ' + ')}
                  { precisionFormat(tokenValue.decimals)(di.value, 4) }
                  {' '}
                  {tokenValue.code}
                </Box>
              </Box>
              <Box style={{display: 'flex'}}>
                <Box className={classes.extra}>
                  <Box style={{color: 'white', marginBottom: 5}}>
                  {type === 'Received'
                    ? <span>To: {compressAddress(di.to)}</span>
                    : <span>From: {compressAddress(di.from)}</span> 
                  }
                  </Box>
                  <Box>{ formatDateFromSeconds(di.timeStamp) }</Box>
                </Box>           
                <Icon className={classes.infoIcon}>
                  <img src="images/details.svg" alt="AurumWallet" className="detail-image" style={{height: '100%'}} />
                </Icon>
              </Box>
            </Box>
          </ButtonBase>
        </Box>
    );
  }
  
  const filteredTransactions = !token
  ? transactions 
  : transactions.filter((di)=>{
    return token.code === 'BNB' 
      ? di.contractAddress === '' 
      : di.contractAddress === token.contract
  });

  return (
    <ARUCard className={classes.root}>
      {(filteredTransactions && filteredTransactions.length) ?
      <Box className={classes.list} style={{height: `${height ? height : (window.innerHeight-100)}px`}}>  
        {filteredTransactions.map((di, index)=>{
          return renderRow({di, index})
        })}
      </Box>
      : <span className="nothing-msg">No transactions found</span> }
    </ARUCard>
  )
}

export default function Transactions(props) {
  return (
    <React.Suspense fallback={<Box className="loading">Loading Transactions..</Box>}>
      <AllTransactions {...props}/>
    </React.Suspense>
  )
}