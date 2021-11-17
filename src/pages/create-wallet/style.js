import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: '#ffffff'
  },
  wallettitle: {
    margin: "20px 0",
    fontWeight: 400,
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
    padding: 15,
    marginTop: 8,
    "& p": {
      margin: '0 0 0 12px',
      color: '#ffffff',
      fontSize: 14,
      lineHeight: '18px'
    }
  },
  circleIcon: {
    width: 26,
    height: 18,
    borderRadius: 12,
    margin: 3,
    border: '3px solid white',
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
  secretPharse: {
    border: '1px solid red',
    marginTop: 12,
    color: '#ffffff',
    lineHeight: '20px',
    padding: 12,
    fontSize: 14
  },
  hideSecretPharseBtn: {
    marginTop: 12,
    border: '1px solid red'
  },
  wroteDownBtn: {
    marginTop: 12
  },
  confirmSecretPharse: {
    border: '1px solid white',
    borderRadius: 12,
    padding: '10px 20px',
    lineHeight: '18px',
    fontSize: 14,
    height: 55
  },
  confirmPharseDescription: {
    marginTop: 10,
    padding: '10px 20px',
    fontSize: 14,
    color: 'gray',
    lineHeight: '18px'
  },
  createWalletBtn: {
    marginTop: 12
  },
  congulatelations: {
    marginBottom: 12
  }
  // copyGroup: {
  //   display: 'flex',
  //   '& textarea': {
  //     width: '100%',
  //     border: '1px solid #ccc',
  //     borderRight: 'none',
  //     background: '#fafafa',
  //     borderRadius: '12px 0 0 12px',
  //     '&:focus': {
  //       outline: 'none',
  //       background: '#f3f3f3'
  //     }
  //   },
  //   '& button': {
  //     cursor: 'pointer',
  //     width: '50px',
  //     background: '#f1f1f1',
  //     border: '1px solid #ccc',
  //     borderLeft: 'none',
  //     borderRadius: '0 12px 12px 0',
  //     '& svg': {
  //       width: '15px'
  //     }
  //   }
  // },
}));

export default useStyles;
