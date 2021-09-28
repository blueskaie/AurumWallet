import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(154deg, #191535 13%,#181a1f, #2b3039)",
    color: "white",
    padding: 30,
    "&::before":{
      display:'none',
    },
    "&::after":{
      display:'none',
    }
  },
  wallettitle: {
    margin: "60px 20px 40px 20px",
    fontWeight: "200",
    fontSize: 33,
    lineHeight: 0.98,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0 33px",
    marginTop:65
  },
  passwordinput: {

    "& input": {
      padding: "12px 10px",
      color: "white",
      border: "1px solid #9c9c9c",
      marginBottom: 10,
      marginTop: 15,
      background: "transparent",
      "&::placeholder": {
        color: "#9c9c9c",
      },
      "&:focus": {
        border: "1px solid #9c9c9c",
      },
      "&::before":{
        display:'none',
      }
    },
  },
  repasswordinput:{
    height:92,
    "& input": {
      padding: "12px 10px",
      color: "white",
      border: "1px solid #9c9c9c",
      marginBottom: 10,
      marginTop: 15,
      background: "transparent",
      "&::placeholder": {
        color: "#9c9c9c",
      },
      "&:focus": {
        border: "1px solid #9c9c9c",
      },
      "&::before":{
        display:'none',
      }
    },
  },
  submit: {
    padding: "8px 8px",
    background: "linear-gradient(#484f5e, #1a1d22)",
    width: "50%",
    margin: "30px auto",
    color: "white",
    borderRadius: "30px",
    border: "none",
  },

  footer: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,-50%)",
    bottom: 10,
  },
  bottomimg: {
    position: "absolute",
    bottom: "-100px",
    left: "0px",
    width: 415,
    maxWidth: "inherit",
    zIndex: 1,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  important: {
    marginBottom: theme.spacing(2)
  },
  keyInfo: {
    textAlign: 'left'
  },
  copyGroup: {
    display: 'flex',
    '& textarea': {
      width: '100%',
      border: '1px solid #ccc',
      borderRight: 'none',
      background: '#fafafa',
      borderRadius: '2px 0 0 2px',
      '&:focus': {
        outline: 'none',
        background: '#f3f3f3'
      }
    },
    '& button': {
      cursor: 'pointer',
      width: '50px',
      background: '#f1f1f1',
      border: '1px solid #ccc',
      borderLeft: 'none',
      borderRadius: '0 2px 2px 0',
      '& svg': {
        width: '15px'
      }
    }
  },
}));

export default useStyles;
