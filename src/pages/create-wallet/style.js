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
  passwordinput: {
    marginTop: 12
  },
  repasswordinput:{
    marginTop: 12
  },
  alarmCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 15px',
    marginTop: 8,
    "& p": {
      color: '#ffffff',
      fontSize: 14,
      marginLeft: 12,
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
