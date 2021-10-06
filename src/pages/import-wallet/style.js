import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: -60
  },
  logo: {
    width: 150,
    margin: '0 auto',
    marginTop: 15
  },
  logoTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 0,
    userSelect: 'none'
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
  passwordinput: {
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
  repasswordinput:{
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
