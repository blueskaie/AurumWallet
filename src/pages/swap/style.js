import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  swap: {
    background:'linear-gradient(#0d1014,#1d2d5d,#111422,#2a2d36)',
    textAlign: "center",
    height: 559,
    width: 375,
    padding: "20px 0px",
  },
  swaptitle:{
    position: 'relative',
    margin:'0px 20px 40px 20px',
    textAlign: 'left',
    '& h1':{
      color:'white',
      fontFamily: 'unset',
      marginTop:0,
        fontSize: 33,
        lineHeight: '31px',
        fontWeight: '100',
        letterSpacing: '2px'
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
    bottom: "-8px",
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
  swapAmount: {
    fontSize: 22,
    fontWeight: 700
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
    background: '#27304c',
    padding: 20
  },
  settingForm: {
    background: '#27304c',
    padding: 40
  },
  slippageInput: {
    width: 130,
    height: 25,
    marginRight: 5,
    color: 'white',
    background: 'transparent'
  },
  formrow: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  swapOptions: {
    display: 'flex',
    justifyContent :'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  swapRouter: {
    background: '#232b40',
    outline:'none',
    height: 25,
    border:'1px solid white',
    borderRadius: 7,
    color: 'white',
    padding: '0 5px'
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
    margin: '10px 0',
    color: 'white',
    cursor: 'pointer'
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
    width: 135,
    height: 'calc(100% - 10px);'
  },
  balanceAmount: {
    marginLeft: 10,
    textAlign: 'left',
    color: 'white'
  },
  tokenAmount: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    width: 135
  }
}));

export default useStyles;
