import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white",
    padding: 30,
    "&::before":{
      display:'none',
    },
    "&::after":{
      display:'none',
    }
  },
  logoImage: {
    width: 30,
    height: 30,
    cursor: 'pointer'
  },
  wallettitle: {
    margin: "40px 20px 40px 20px",
    fontWeight: "200",
    fontSize: 33,
    lineHeight: 0.98,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0 33px",
    marginTop: 50
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
    padding: "8px 0px",
    color: "#000000",
    fontSize: 14,
    borderRadius: 20,
    background: "#ffffff",
    width: 130,
    margin: 'auto',
    marginTop: 30,
  },

  footer: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,-50%)",
    bottom: 10,
  },
  bottomimg: {
    position: "absolute",
    bottom: -70,
    left: 0,
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
