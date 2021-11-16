import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  myaccount: {
    marginTop: 10,
    marginBottom: 10,
    zIndex: 2,
    position: "relative",
    height:340,
  },
  description: {
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    "& h3": {
      fontFamily: 'system-ui',
      color: 'white',
      fontWeight: 300,
      fontSize: 'x-large',
      margin: 0 
    },
    "& p": {
      color: '#36bdf0',
      cursor: 'pointer'
    }
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  buttonAcnt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  accountlist:{
    height:400,
    overflowY:'scroll',
    userSelect:'none'
  },
  toggleButton: {
    padding: 0
  },
  eyeIcon: {
    marginLeft: 10,
    width: 25
  }
}));

export default useStyles;
