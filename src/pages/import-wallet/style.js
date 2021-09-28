import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding:theme.spacing(2)
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
  repasswordinput:{
    height:140,
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
  helptext:{
    color:'white',
  },
  fieldPassword: {
    marginBottom: theme.spacing(2)
  },
  formButton: {
    marginBottom: theme.spacing(2),
    padding: "10px 45px",
    color: "#b9b9b9",
    fontSize: 14,
    borderRadius: 20,
    background: "linear-gradient(#565556,#080808)",
    width: "100%",
    margin: "auto",
  },
  links: {
    width:'100%',
    display: 'block',
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
