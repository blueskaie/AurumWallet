import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: -50
  },

  form: {
    display: "flex",
    flexDirection: "column",
    position:'relative',
    zIndex:3
  },
  formARU: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  fieldPassword: {
    padding: '3px 10px',
    marginBottom: theme.spacing(1),
    marginTop: 50,
    width: "90%",
    margin: "auto",
    marginBottom: '5px',
    // height:91,
    "& input": {
      border: "1px solid white",
      borderRadius: 5,
      padding: '10px 20px',
      color: "white",
      textAlign: 'center'
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
    padding: "8px 0px",
    fontSize: 14,
    width: "70%",
    margin: "auto",
  },
  walletbutton:{
    color: 'white',
    textAlign: 'center',
    margin: '5px auto',
    fontSize: 15,
    cursor:'pointer',
    userSelect:'none',
  }
}));

export default useStyles;
