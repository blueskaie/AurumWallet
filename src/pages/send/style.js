import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formrow: {
    marginBottom: theme.spacing(2),
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
  submitWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
  },
}));

export default useStyles;
