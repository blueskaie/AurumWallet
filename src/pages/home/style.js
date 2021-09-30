import { makeStyles } from "@material-ui/core/styles";
import { withThemeCreator } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    background: "#111111",
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
    color:'#777777',
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
    color:'#777777',
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
    bottom: "-150px",
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
      color: "#777777",
      backgroundSize: "cover",
      backgroundColor: "transparent",
      display: "flex",
      "& span": {
        color: "#777777",
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

  },
  portfolio:{
    color: 'white',
    border: '1px solid white',
    borderRadius: '10px',
    fontSize: '20px',
    margin: '20px 30px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row'
  }
  
}));

export default useStyles;
