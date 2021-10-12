import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
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
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formrow: {
    marginBottom: 10,
    "& input": {
      paddingRight: 50,
    },
  },
  card: {
    padding: 24,
    marginBottom: 8
  },
  label: {
    color: '#ffffff',
    fontSize: 14
  },
  value: {
    color: '#ffffff',
    fontSize: 14
  },
  submitWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingBtn: {
    position: 'absolute',
    right: 10,
    top: 65,
    padding: 0
  },
  settingIcon: {
    width: 20
  },
  inputBtn: {
    backgroundColor: '#161616', 
    color: '#ffffff', 
    position: 'absolute', 
    right: 5, 
    top: 2
  },
  editGasModal: {
    background: '#1e1d1d',
    boxShadow: '0px 3px 3px #000000c2',
    borderRadius: 8,
    padding: 20
  }
}));

export default useStyles;
