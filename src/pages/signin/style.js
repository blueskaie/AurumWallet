import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop:-20
  },
  signin: {
    // background: "linear-gradient(#2c313a,#17191e,#211f3e, #392861)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position:'relative',
    zIndex:3
  },
  fieldPassword: {
    marginBottom: theme.spacing(1),
    marginTop: 30,
    width: "80%",
    margin: "auto",
    height:91,
    "& input": {
      border: "1px solid white",
      borderRadius: 10,
      padding: '5px 10px',
      color: "white",
    },
    "& div::before": {
      display: "none",
    },
    "& div::after": {
      display: "none",
    },
    "& div:focus": {
      border: "1px solid white",
    },
  },
  formButton: {
    marginBottom: theme.spacing(2),
    padding: "10px 0px",
    color: "#b9b9b9",
    fontSize: 14,
    borderRadius: 20,
    background: "linear-gradient(#565556,#080808)",
    width: "42%",
    margin: "auto",
  },
  links: {
    width: "100%",
    display: "block",
    marginTop: theme.spacing(2),
  },
  rightbtn: {
    float: "right",
    position: "absolute",
    right: 18,
    width: 118,
    height: 46,
    top: 25,
    "& button": {
      justifyContent: "space-around",
      alignItems: "center",
      padding: 8,
      color: "white",
      border: "1px solid white!important",
      borderRadius: 20,
      width: "-webkit-fill-available",
      backgroundSize: "cover",
      backgroundColor: "transparent",
      display: "flex",
      "& span": {
        color: "white",
      },
    },
  },
  bottomimg: {
    userSelect:'none',
    position: "absolute",
    bottom: "-50px",
    left: "-30px",
    width: 447,
    maxWidth: "inherit",
    zIndex: 1,
  },
  forgetpwd:{
    position:'absolute',
    bottom:20,
    textAlign: 'center',
    width: 'calc(100% - 32px)',
    '& p':{
      color:'white',
    }
  },
  walletbutton:{
    color: 'white',
    textAlign: 'center',
    margin: '10px auto',
    fontSize: 15,
    cursor:'pointer',
    userSelect:'none',
  }
}));

export default useStyles;
