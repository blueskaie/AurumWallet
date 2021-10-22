import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  swaptitle:{
    position: 'relative',
    marginTop: -20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'unset',
    fontSize: 33,
    fontWeight: 100,
    lineHeight: '31px',
    letterSpacing: '1px'
  },
  swapcontent: {
    width: '100%',
    marginTop: 20,
    position: 'relative',
    zIndex: 3,
  },
  swaptoken : {
    position: 'relative',
    zIndex: 2,
    background: '#1e1d1d',
    borderRadius: 10,
    boxShadow: '0px 5px 5px #000000a0',
    padding: 15
  },
  swapform: {
    border:'1px solid white',
    borderRadius: 13,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '0 20px',
    height:  56
  },
  swapAmount: {
    fontSize: 22,
    fontWeight: 700
  },
  fromtokeninfoleft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    textAlign: 'left',
    overflow:'hidden',
    justifyContent:  'space-evenly',
    color: 'white',
    height: '100%'
  },
  fromtokeninfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    overflow:'hidden',
    justifyContent:  'flex-end',
    "& P": {
      color:'white',
      margin:3
    }
  },
  fromtokenamount: {
    width:  '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color:  'white',
    margin:  0,
    fontSize: 12
  },
  submitWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  comfirmModal: {
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    width: '100%'
  },
  accountInfo: {
    marginTop: 15,
    display: 'flex',
    border: '1px solid white',
    borderRadius: 5,
    padding: 12
  },
  amountInfo: {
    marginTop: 15,
    border: '1px solid white',
    borderRadius: 5,
    padding: 12
  },
  editGasModal: {
    borderRadius: 10,
  },
  settingsModal: {
    width: '100%',
    borderRadius: 10
  },
  gasForm: {
    background: '#1e1d1d',
    padding: 20
  },
  settingForm: {
    background: '#1e1d1d',
    padding: 40
  },
  slippageInput: {
    width: 110,
    height: 25,
    marginRight: 5,
    color: 'white',
    background: 'transparent',
    border: '1px solid #aaaaaa',
    borderRadius: 5,
    padding: '0 10px',
  },
  formrow: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  swapOptions: {
    display: 'flex',
    justifyContent :'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  swapRouter: {
    background: 'transparent',
    outline:'none',
    height: 25,
    border:'none',
    color: 'white',
    padding: '0 5px',
    fontWeight: '600'
  },
  maxBtn: {
    margin: 0,
    marginLeft: 10,
    color: '#36bdf0',
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: 11,
    cursor: 'pointer'
  },
  editGas: {
    margin: '10px 0',
    color: 'white',
    cursor: 'pointer'
  },
  setting: {
    margin: '0px 0',
    color: 'white',
    cursor: 'pointer',
    width: '15px'
  },
  label: {
    color: 'white',
    marginBottom: 5
  },
  textField: {
    color: 'white',
    border: '1px solid white',
    borderRadius: 5,
    padding: 5,
    height: 30,
    background: 'transparent',
    outline: 'none',
  },
  amountSection: {
    width: 150,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 'calc(100% - 10px);'
  },
  balanceAmount: {
    textAlign: 'left',
    color: 'white'
  },
  tokenAmount: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    width: 135
  },
  swapinfo: {
    zIndex: 1,
    position:'relative',
    borderRadius: '0px 0px 10px 10px',
    marginTop: -10,
    background: '#222121',
    padding: '25px 35px 10px 35px',
    boxShadow: '0px 5px 5px #000000c2',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10
  },
  swapsubinfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    "& p" : {
      margin: '3px 0',
      color: 'white'
    }
  },
}));

export default useStyles;
