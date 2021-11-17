import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // textAlign: 'center',
    marginTop: -30
  },
  logo: {
    width: 150,
    margin: '0 auto',
    marginTop: 15
  },
  logoTitle: {
    color: 'white',
    fontWeight: 400,
    fontSize: 33,
    userSelect: 'none',
    lineHeight: 0.98,
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
    borderRadius: 12,
    background: "white",
    width: "100%",
    margin: "auto",
  },
  phraseinput: {
    marginBottom: 4,
  },
  passwordinput: {
    marginBottom: 12,
  },
  repasswordinput:{
    marginBottom: 12
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
    borderRadius: 12,
    width: "80%",
    margin: "auto",
  },
  links: {
    width:'100%',
    display: 'block',
    marginTop: theme.spacing(2)
  },
  alarmCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    // marginTop: 8,
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
}));

export default useStyles;
