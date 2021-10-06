import React from "react";

import { useHistory } from "react-router-dom";
import { useTheme, Box } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";

import Layout from "../../components/layout";
import TokenList from "../../components/token-list";
import StatisticInfo from "../../components/statistic-info";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import SliderList from "../../components/slider-list";

import useStyles from "./style";

export default function Home() {
  const classes = useStyles(useTheme());
  const history = useHistory();
  const addToken = () => { history.push("/add-token"); };

  return (
    <Layout>
      <Box className={classes.root}>
        {/* <React.Suspense fallback={<Box className="slidebar"></Box>}>
          <SliderList />
        </React.Suspense> */}
        <React.Suspense fallback={<Box className="slidebar"></Box>}>
          <StatisticInfo/>
        </React.Suspense>

        <Box className={classes.mywallet}>
          <Box className={classes.description}>
            <h3>My Wallet</h3>
            <p onClick={addToken} style={{color: 'white'}}>Add token</p>
          </Box>
          <ScrollContainer className={classes.tokenlist} vertical={true}>
            <React.Suspense fallback={<Box>Loading...</Box>}>
              <TokenList />
            </React.Suspense>
          </ScrollContainer>
        </Box>
      </Box>
    </Layout>
  );
}
