import React, { useMemo, useState } from 'react'

import Layout from "../../components/layout";
import OneToken from "./components/onetoken";
import { Box } from '@material-ui/core';
import { ARUBaseInput } from '../../components/fields';
import { useRecoilValue } from 'recoil';
import { tokenList } from '../../store/atoms'
import useStyles from "./style";
import { useHistory } from "react-router-dom";

export default function Send() {
  const classes = useStyles();
  const history = useHistory();
  const list = useRecoilValue(tokenList);
  const [keyword, setKeyword] = useState('');
  
  const filteredList = useMemo(()=>{
    if (keyword) {
      return list.filter(item=>item.code && item.code.toUpperCase().includes(keyword.toUpperCase()))
    } else {
      return list
    }
  }, [keyword, list]);

  const goToSendToken = (token) => {
    if (token && token.code) {
      history.push(`/send-token/${token.code}`);
    }
  }

  return (
    <Layout isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false} varient="secondary">
      <Box className={classes.root}>
        <Box className={classes.title}>
          Send Tokens
        </Box>
        <ARUBaseInput
          id="keyword"
          className={classes.searchInput}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Search tokens..."
        />
        <Box className={classes.tokenList}>
        { filteredList.map(token=><OneToken key={token.code} token={token} onClick={()=>goToSendToken(token)}/>) }
        </Box>
      </Box>
    </Layout>
  )
}