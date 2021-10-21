import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: '#ffffff'
  },
  logo: {
    width: 150,
    margin: '0 auto',
    marginTop: 15
  },
  wallettitle: {
    margin: "20px 0",
    fontWeight: "200",
    fontSize: 33,
    lineHeight: 0.98,
  },
  alarmCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    marginTop: 0,
    "& p": {
      margin: '0 0 0 12px',
      color: '#ffffff',
      fontSize: 14,
      lineHeight: '18px'
    }
  },
  checkIcon: {
    width: 30,
    height: 30
  },
  submitPassword: {
    marginTop: 10
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullWidth: {
    marginBottom: theme.spacing(2),
    padding: "10px 45px",
    color: "black",
    fontSize: 14,
    borderRadius: 20,
    background: "white",
    width: "100%",
    margin: "auto",
  },
  phraseinput: {
    "& input": {
      padding: "12px 10px",
      color: "white",
      border: "1px solid #ffffff",
      marginBottom: 10,
      marginTop: 15,
      height: '70px',
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
  passwordinput: {
    "& input": {
      padding: "12px 10px",
      color: "white",
      border: "1px solid #ffffff",
      marginBottom: 10,
      // marginTop: 15,
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
    "& input": {
      padding: "12px 10px",
      color: "white",
      border: "1px solid #ffffff",
      marginBottom: 10,
      // marginTop: 15,
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
  helptext:{
    color:'white',
  },
  fieldPassword: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(2),
    padding: "10px 45px",
    background: '#ffffff',
    color: "#000000",
    fontSize: 14,
    borderRadius: 20,
    width: "80%",
    margin: "auto",
  },
  links: {
    width:'100%',
    display: 'block',
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
