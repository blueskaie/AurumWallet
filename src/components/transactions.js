import React from 'react';

import { currentNetwork, currentWallet, networkTransactions, allTokens } from '../store/atoms'
import { useRecoilValue } from 'recoil';

import {ButtonBase} from '@material-ui/core';

import { FixedSizeList } from 'react-window';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_TOKEN } from '../config/tokens'
import { precisionFormat, formatDateFromSeconds, compressAddress} from '../utils/format-utils';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    width:'100%',
    height:'100%',
    paddingTop: 7,
    paddingBottom: 7,
    borderBottom: '1px solid #e1e1e1'
  },
  list: {
    overflowY: 'auto'
  },
  listItem: {
    width:'100%',
    display:'flex'
  },
  icon: {
    justifyContent: 'center',
    fontWeight: 'bold',
    width: '10%',
  },
  moneyGone: {
    color: 'red'
  },
  moneyAdd: {
    color: 'green'
  },
  contentArea: {
    width:'90%',
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
    color: '#fff',
    padding: '0 15px',
    width: '60%'
  },
  stamp: {
    width: '40%',
    fontSize: '.75rem',
    textAlign: 'left',
    marginTop: '.3rem',
    color: '#999'
  },
  address: {
    width: '60%',
    marginTop: '.3rem',
    fontSize: '.75rem',
    textAlign: 'right',
    padding:'0 15px',
    display: 'flex',
    flexDirection: 'column',
    color: '#999'
  }
}));


export function AllTransactions({token, height}) {

  const classes = useStyles( );

  const wallet = useRecoilValue(currentWallet);
  const network = useRecoilValue(currentNetwork);
  const transactions = useRecoilValue(networkTransactions(0));

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
    
    const isSend = wallet.address.toUpperCase() === di.from.toUpperCase();

    const tokenValue = di.contractAddress && ALL_TOKENS_MAP[di.contractAddress.toUpperCase()] ? ALL_TOKENS_MAP[di.contractAddress.toUpperCase()] : DEFAULT_TOKEN;

    return (
        <div style={style} key={index} >
          <ButtonBase className={classes.root}>
            <div className={classes.listItem}>
              <div className={classes.icon}>
                {isSend ? <ArrowUpward className={classes.moneyGone} /> : <ArrowDownward className={classes.moneyAdd} />}
              </div>
            <div className={classes.contentArea}>
              <div style={{display: 'flex'}}>
                <div className={classes.label}>{isSend ? 'Sent' : 'Received'}</div>
                <div className={classes.amount}>{ precisionFormat(tokenValue.decimals)(di.value, 4) } {tokenValue.code}</div>
              </div>
              <div style={{display: 'flex'}}>
                <div className={classes.stamp}>{ formatDateFromSeconds(di.timeStamp) }</div>
                <div className={classes.address}>
                  <span>From: {compressAddress(di.from)}</span>
                  <span>To: {compressAddress(di.to)}</span>
                </div>
              </div>
            </div>
            </div>
          </ButtonBase>
        </div>
    );
  }
  
  const filteredTransactions = !token
  ? transactions 
  : transactions.filter((di)=>{
    return token.code == 'BNB' 
      ? di.contractAddress === '' 
      : di.contractAddress === token.contract
  });

  return (
    <>
      {(filteredTransactions && filteredTransactions.length) ?
      <div className={classes.list} style={{height: `${height ? height : (window.innerHeight-100)}px`}}>  
        {filteredTransactions.map((di, index)=>{
          return renderRow({di, index})
        })}
      </div>
      : <span className="nothing-msg">No transactions found</span> }
    </>
  )
}

export default function Transactions(props) {
  return (
    <React.Suspense fallback={<div className="loading">Loading Transactions..</div>}>
      <AllTransactions {...props}/>
    </React.Suspense>
  )
}