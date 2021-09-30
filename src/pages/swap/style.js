import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background:'#111111',
    textAlign: "center",
    width: 375,
    "&>.makeStyles-root-53": {
      marginLeft: '20px',
    },
    "&>.makeStyles-swaptitle-28": {
      paddingLeft: '20px'
    }
  },
  header: {
    marginTop: 20
  },
  swaptitle:{
    position: 'relative',
    margin:'10px 20px 20px 20px',
    textAlign: 'left',
    '& div':{
      color:'white',
      fontFamily: 'unset',
      marginTop:0,
        fontSize: 33,
        fontWeight: 700,
        lineHeight: '31px',
        fontWeight: '100',
        letterSpacing: '1px'
    }
  },
  swaptab: {
    display:'flex',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  swaptabItem: {
    color:'white',
    background: 'transparent',
    outline:'none',
    border:'none',
  },
  bottomimg: {
    position: "absolute",
    bottom: 0,
    left: "-30px",
    width: 447,
    maxWidth: "inherit",
    zIndex: 1,
  },
  submitWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  comfirmModal: {
    borderRadius: 10,
    textAlign: 'center',
    color: 'white'
  },
  swapcontent: {
    width: '80%',
    margin: 'auto',
    position: 'relative',
    zIndex: 3,
  },
  swaptoken : {
    position: 'relative',
    zIndex: 2,
    background: '#222222',
    borderRadius: 10,
    boxShadow: '0px 10px 5px #000000a0',
    padding: 20
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
    background: '#222222',
    padding: 20
  },
  settingForm: {
    background: '#222222',
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
    color:  'white'
  },
  amountSection: {
    width: 150,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-end',
    justifyContent: 'center',
    justifyContent: 'space-evenly',
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
    background: '#333333',
    padding: '20px 20px 10px 20px',
    boxShadow: '0px 10px 5px #000000c2',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  termofservice: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    width: '100%',
    color: 'white'
  },
}));

export default useStyles;
