
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    display:'flex',
    flexDirection: 'column',
    marginTop:30,
  },
  title: {
    position: 'relative',
    marginTop: -20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'Montserrat',
    fontSize: 33,
    fontWeight: 400,
    lineHeight: '31px',
    letterSpacing: '1px'
  },
  formWrap: {
    marginTop: 30
  },
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  formControl: {
    marginBottom: '10px',
  },
  formButton: {
    marginBottom: '10px'
  },
  fullWidth: {
    width: '100%'
  },
  privateKey: {
    marginTop: 12,
    color: '#ffffff',
    lineHeight: '20px',
    width: '100%',
    minHeight: 60,
    fontSize: 14,
    '& textarea': {
      border: '1px solid red',
      width: '100%',
      '&:focus': {
        boxShadow: `red 0 0 0 1px`,
        borderColor: 'red',
      },
    }
  },
  alarmCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    marginTop: 8,
    "& p": {
      margin: '0 0 0 12px',
      color: '#ffffff',
      fontSize: 14,
      lineHeight: '18px'
    }
  },
  buttonImport: {
    width: '100%',
    marginTop: 10,
  },
  helptext:{
    fontSize: 14,
    color:'red',
  },
}));

export default useStyles;