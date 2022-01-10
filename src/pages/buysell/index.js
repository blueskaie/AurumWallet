import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useStyles from "./style";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const Reveal = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.tokeninfo}>
        <img src="images/bnbblank.png" alt="tokenimg" className={classes.tokenimg} />
        <h1 className={classes.tokenprice}>
          552,05 <b>BNB</b>
        </h1>
      </div>
      <div className={classes.tabs}>
        <div className={classes.tabheader}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabcontainer}
            classes={
               {root: classes.tabroot,
               indicator: classes.indicator}
            }
            centered
          >
            <Tab label="Lorem" {...a11yProps(0)} classes={{root:classes.tab}} />
            <Tab label="Top 10" {...a11yProps(1)} classes={{root:classes.tab}}  />
            <Tab label="Dolor" {...a11yProps(2)} classes={{root:classes.tab}} />
            <Tab label="Ipsum" {...a11yProps(3)} classes={{root:classes.tab}} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <img src="images/finalchart.png" alt="token_price" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item 4
        </TabPanel>
      </div>
      <div className={classes.confirm}>
        <button className={`${classes.confirmbtn} ${classes.buy}`}>BUY</button>
        <button className={`${classes.confirmbtn} ${classes.sell}`}>
          SELL
        </button>
      </div>
    </div>
  );
};

export default Reveal;
