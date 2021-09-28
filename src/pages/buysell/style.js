import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(#0d0f11,#2b2f38)",
    color: "white",
    padding: 30,
  },
  tabs: {
    height: "300px",
  },
  confirm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmbtn: {
    border: "none",
    padding: "10px 25px",
    fontSize: "14px",
  },
  buy: {
    color: "black",
    background: "#01e18a",
    marginRight: 10,
  },
  sell: {
    background: "#e10140",
    color: "white",
  },
  tokeninfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  tokenprice: {
    fontWeight: "300",
    margin: "20px auto",
  },
  tokenimg: {
    width: 80,
  },
  tabheader:{
    background:'transparent'
  },
  tabcontainer: {
    background: "transparent",
    minHeight:0,
  },
  tabroot:{
    borderBottom: '1px solid #e8e8e8',
  },
  indicator:{
    background:'#01e18a',
    display:'flex',
    justifyContent:'center',
    "& > span":{
      maxWidth:40,
      width:'100%',
      backgroundColor:'green'
    }
  },
  tab:{
    width:20,
    height:26,
    minHeight:0,
    '& span':{
      textTransform:'capitalize'
    }
  }
}));

export default useStyles;