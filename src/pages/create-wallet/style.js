import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: '#ffffff'
  },
  wallettitle: {
    margin: "30px 0",
    fontWeight: "200",
    fontSize: 33,
    lineHeight: 0.98,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  alarmfield: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '20px',
    "& img": {
      color: 'green',
    },
    "& span": {
      marginLeft: '15px',
      color: 'white',
      fontSize: '16px',
    }
  },
  passwordinput: {

    "& input": {
      textAlign: 'center',
      borderRadius: '5px',
      padding: "12px 10px",
      color: "white",
      border: "1px solid #ffffff",
      marginBottom: 10,
      marginTop: 15,
      background: "transparent",
      "&::placeholder": {
        color: "#ffffff",
      },
      "&:focus": {
        border: "1px solid #ffffff",
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
      border: "1px solid #ffffff",
      marginBottom: 10,
      marginTop: 15,
      background: "transparent",
      "&::placeholder": {
        color: "#ffffff",
      },
      "&:focus": {
        border: "1px solid #ffffff",
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
    width: "70%",
    margin: 'auto',
    marginTop: 30,
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
