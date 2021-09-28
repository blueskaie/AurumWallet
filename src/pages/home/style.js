import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    background: "linear-gradient(#100f1c,#261f73,#16191e, #2d3036)",
  },
  toolbar: {
    flexGrow: 1,
    minHeight: 46,
    '& button':{
      background:'transparent',
      border:'none',
    }
  },
  title:{
    cursor:'pointer',
    color:'white',
    flexGrow: 1,
    fontSize: '1rem',
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
  },
  rightlink: {
    color:'white',
    background:'transparent',
    height:46,
    minHeight:46
  },
  cont: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  list: {
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  freeToken: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  mywallet: {
    margin: "10px 34px",
    zIndex: 2,
    position: "relative",
    height:352,
    
  },
  bottomimg: {
    position: "absolute",
    bottom: "0px",
    left: "-30px",
    width: 447,
    maxWidth: "inherit",
    zIndex: 1,
    userSelect:'none'
  },
  rightbtn: {
    float: "right",
    flexShrink:0,
    right: 72,
    width: 207,
    height: 46,
    top: 25,
    "& button": {
      justifyContent: "space-around",
      alignItems: "center",
      color: "white",
      backgroundSize: "cover",
      backgroundColor: "transparent",
      display: "flex",
      "& span": {
        color: "white",
      },
    },
  },
  tokenlist:{
    height:292,
    overflowY:'scroll',
    "&::-webkit-scrollbar":{
      //display:'none'
    },
    userSelect:'none'

  }
  
}));

export default useStyles;
