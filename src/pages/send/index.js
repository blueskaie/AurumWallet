import React, { useState } from 'react'

import Layout from "../../components/layout";
import { Box } from '@material-ui/core';
import { ARUBaseInput } from '../../components/fields';
import useStyles from "./style";

import TokenList from './components/token-list';

export default function Send() {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');

  return (
    <Layout isShownWallet={false} isShownNetworkSelector={false}>
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
        <React.Suspense fallback={<Box className="slidebar"></Box>}>
          <TokenList keyword={keyword}/>
        </React.Suspense>
      </Box>
    </Layout>
  )
}