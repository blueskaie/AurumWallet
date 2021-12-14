import React from 'react'

import Layout from "../../components/layout";
import { useTheme, Box } from '@material-ui/core';
import ARUCard from '../../components/card';
import useStyles from "./style";
import {useHistory} from "react-router-dom";

export default function AboutUs() {
  const classes = useStyles(useTheme());
  const history = useHistory();

  return (
    <Layout isShownNetworkSelector = {false} isShownBackButton = {true} isShownWallet={false} >
      <Box className={classes.root}>
        <Box>
          <Box className={classes.title}>
            About
          </Box>
          <Box className={classes.links}>
            <ARUCard className={classes.card} onClick={() => history.push('/privacy-policy')}>
              Privacy Policy
            </ARUCard>
            <ARUCard className={classes.card} onClick={() => history.push('/terms-of-use')}>
              Terms of Use
            </ARUCard>
            <ARUCard className={classes.card} onClick={() => {window.open("https://aurumofficial.net/", "_blank")}}>
              Visit Our Website
            </ARUCard>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}