import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  swap: {
    background:'#111111',
    textAlign: "center",
    height: 750,
    width: 375,
    padding: "20px 0px",
  },
  swaptitle:{
    position: 'relative',
    margin:'50px 20px 40px 20px',
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
    bottom: "-185px",
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
    background: '#222222',
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
    margin: '10px 0',
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
