import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: -40
  },
  loader: {
    position: 'absolute',
    top: 130,
    left: 130,
  },
  mywallet: {
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
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 5,
    paddingBottom: 5,
    "& h3": {
      fontFamily: 'Montserrat',
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
  tokenlist:{
    height:292,
    overflowY:'scroll',
    userSelect:'none'
  },
  clipboard: {
    textAlign: 'right',
    '& button':{
      background:'transparent',
      border:'none',
    }
  },
  title:{
    cursor:'pointer',
    color:'#5e5e5e',
    flexGrow: 1,
    fontSize: '1rem',
  },
}));

export default useStyles;
